import { createTRPCRouter } from "../trpc";
import { z } from "zod";

import {
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { generateScript } from "@/lib/gemini";
import { createVideoSchema } from "@/lib/custom_types/createForm";
import { inngest } from "@/inngest/client";

export const projectRouter = createTRPCRouter({
  getScript: protectedProcedure.input(z.object({
    topic: z.string()
  })).mutation(async ({ ctx, input }) => {
    const response = await generateScript(input.topic);

    return response;

  }),
  
  generateVideoData: protectedProcedure.input(createVideoSchema).mutation(async ({ ctx, input }) => {
    
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
    return await ctx.db.videoData.create({
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
  })
  
})