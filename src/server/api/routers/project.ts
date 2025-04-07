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
  })
})