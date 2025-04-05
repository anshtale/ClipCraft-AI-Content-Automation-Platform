import { createTRPCRouter } from "../trpc";
import { z } from "zod";

import {
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { generateScript } from "@/lib/gemini";

export const projectRouter = createTRPCRouter({
    getScript: protectedProcedure.input(z.object({
      topic: z.string()
    })).mutation(async({ctx,input})=>{
      const response  = await generateScript(input.topic);

      return response;

    })
})