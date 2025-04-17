import { createTRPCRouter } from "../trpc";
import { z } from "zod";

import {
  protectedProcedure,
} from "@/server/api/trpc";
import { generateScript } from "@/lib/gemini";
import { createVideoSchema } from "@/lib/custom_types/createForm";
import { inngest } from "@/inngest/client";
import { TRPCError } from "@trpc/server";
import { getRenderProgress, renderMediaOnLambda } from "@remotion/lambda/client"

export const projectRouter = createTRPCRouter({
  getScript: protectedProcedure.input(z.object({
    topic: z.string()
  })).mutation(async ({ ctx, input }) => {
    const response = await generateScript(input.topic);

    return response;

  }),

  generateVideoData: protectedProcedure.input(z.object({
    title: z.string(),
    topic: z.string(),
    script: z.string(),
    videoStyle: z.string(),
    voiceStyle: z.string(),
    caption: createVideoSchema.shape.captionStyle,
    videoId: z.string(),
  })).mutation(async ({ ctx, input }) => {

    const response = await inngest.send({
      key: "generate-video-data",
      name: 'generate-video-data',
      data: {
        ...input
      }
    });
    return response;
  }),

  createVideoData: protectedProcedure.input(z.object({
    title: z.string(),
    topic: z.string(),
    script: z.string(),
    videoStyle: z.string(),
    voiceStyle: z.string(),
    caption: z.any(),

    images: z.any(),
    audioUrl: z.string().optional(),
    captionJson: z.string().optional(),

  })).mutation(async ({ ctx, input }) => {
    const currentCredits = ctx.session.user.credits;

    if (currentCredits <= 0) {
      throw new TRPCError(
        {
          message: "Insufficient Credits",
          code: "FORBIDDEN"
        }
      )
    }

    const record = await ctx.db.videoData.create({
      data: {
        userId: ctx.session.user.id,
        caption: input.caption,
        title: input.title,
        topic: input.topic,
        script: input.script,
        videoStyle: input.videoStyle,
        voiceStyle: input.voiceStyle,
        images: input.images,
        audioUrl: input.audioUrl,
        captionJson: input.captionJson,
        createdBy: ctx.session.user.email
      }
    })

    await ctx.db.user.update({ where: { id: ctx.session.user.id }, data: { credits: { decrement: 1 } } })

    return record;
  }),

  getUserVideos: protectedProcedure.query(async ({ ctx, input }) => {
    return await ctx.db.videoData.findMany({
      where: {
        userId: ctx.session.user.id
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  }),

  getVideosById: protectedProcedure.input(z.object({
    ids: z.array(z.string()),
  })).query(async ({ ctx, input }) => {
    if (input.ids.length === 0) return [];
    return await ctx.db.videoData.findMany({
      where: {
        id: { in: input.ids },
        userId: ctx.session.user.id
      }
    })
  }),

  getVideoById: protectedProcedure.input(z.object({
    videoId: z.string()
  })).query(async ({ ctx, input }) => {
    const response = await ctx.db.videoData.findUnique({
      where: {
        userId: ctx.session.user.id,
        id: input.videoId
      }
    })

    if (response === null) {
      throw new TRPCError({ message: "No project found", code: "NOT_FOUND" })
    }

    return response;
  }),

  renderVideo: protectedProcedure.input(z.object({
    videoData: z.object({
      captionJson: z.any(),
      images: z.any(),
      audioUrl: z.string(),
    }),
    captionStyle: z.string()
  })).mutation(async ({ ctx, input }) => {
    // console.log("triggered");
    const functionName = process.env.REMOTION_RENDER_AWS_FUNCTION_NAME!;

    const inputProps = {
      videoData: input.videoData,
      captionStyle: input.captionStyle
    }

    const renderMedia = await renderMediaOnLambda({
      functionName,
      inputProps: inputProps,
      region: 'us-east-1',
      serveUrl: 'caption-generator',
      codec: 'h264',
      composition: 'renderer',
      framesPerLambda: 20,
      downloadBehavior:{
        type:"download",
        fileName:'output.mp4'
      }
    })
    return renderMedia;
  }),
  
  getRenderProgress: protectedProcedure.input(z.object({
    renderId:z.string(),
    bucketName:z.string(),
  })).query(async({ctx,input})=>{
    const renderProgress = await getRenderProgress({
      bucketName:input.bucketName,
      functionName: process.env.REMOTION_RENDER_AWS_FUNCTION_NAME!,
      region: 'us-east-1',
      renderId: input.renderId
    })
    
    if(renderProgress.fatalErrorEncountered){
      return {
        type:'error',
        message:renderProgress.errors[0]?.message,
      }
    }

    if(renderProgress.done){
      console.log(renderProgress.outputFile as string);
      return {
        type:'done',
        url:renderProgress.outputFile as string,
        size:renderProgress.outputSizeInBytes as number,
      }
    }

    return {
      type:'progress',
      progress: Math.max(0.03,renderProgress.overallProgress)
    }

  })

})