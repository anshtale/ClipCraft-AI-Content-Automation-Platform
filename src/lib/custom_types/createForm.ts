import { z } from "zod";

export const createVideoSchema = z.object({
    title: z.string().min(5, "Project title is required").max(100, "Project title must be 100 characters or less"),
    topic: z.string().min(5, "Video topic is required").max(100, "Video topic must be 500 characters or less"),
    videoStyle: z.string().min(5,"Video Style is Required")

})

export interface Script {
    content: string;
}
  
export interface Response {
    scripts: Script[];
}
  

export type CreateVideoForm = z.infer<typeof createVideoSchema>