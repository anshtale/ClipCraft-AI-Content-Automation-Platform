import { serve } from "inngest/next";

import { inngest } from "@/inngest/client";
import { generateVideoData, helloWorld } from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    generateVideoData
  ],
});
