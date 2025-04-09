import { createTRPCRouter } from "../trpc";
import { z } from "zod";

import {
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { generateScript } from "@/lib/gemini";
import { createVideoSchema } from "@/lib/custom_types/createForm";
import { inngest } from "@/inngest/client";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  getScript: protectedProcedure.input(z.object({
    topic: z.string()
  })).mutation(async ({ ctx, input }) => {
    const response = await generateScript(input.topic);

    return response;

  }),
  
  generateVideoData: protectedProcedure.input(z.object({
    title: z.string(),
    topic :z.string(),
    script :z.string(),
    videoStyle: z.string(),
    voiceStyle :z.string(),
    caption :createVideoSchema.shape.captionStyle,
    videoId: z.string(),
  })).mutation(async ({ ctx, input }) => {
    
    const response = await inngest.send({
      key:"generate-video-data",
      name: 'generate-video-data',
      data: {
        ...input
      }
    });

    return response;
  }),

  createVideoData: protectedProcedure.input(z.object({
    title: z.string(),
    topic :z.string(),
    script :z.string(),
    videoStyle: z.string(),
    voiceStyle :z.string(),
    caption :z.any(),

    images :z.any(),
    audioUrl: z.string().optional(),
    captionJson :z.string().optional(),

  })).mutation(async ({ctx,input})=>{
    const currentCredits = ctx.session.user.credits;

    if(currentCredits <= 0){
      throw new TRPCError(
        {
          message: "Insufficient Credits",
          code:"FORBIDDEN"
        }
      )
    }

    const record =  await ctx.db.videoData.create({
      data:{
        userId : ctx.session.user.id,
        caption : input.caption,
        title : input.title,
        topic : input.topic,
        script : input.script,
        videoStyle : input.videoStyle,
        voiceStyle : input.voiceStyle,
        images : input.images,
        audioUrl : input.audioUrl,
        captionJson : input.captionJson,
        createdBy : ctx.session.user.email
      }
    })

    await ctx.db.user.update({where:{id: ctx.session.user.id },data:{credits:{decrement:1}}})

    return record;
  }),

  getUserVideos : protectedProcedure.query(async({ctx,input})=>{
    return await ctx.db.videoData.findMany({
      where:{
        userId : ctx.session.user.id
      },
      orderBy:{
        createdAt : "desc"
      }
    })
  })

  
})