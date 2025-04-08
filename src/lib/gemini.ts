import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash'
})

const SCRIPT_PROMPT = `Write a two different script/story for 30 seconds video on Topic : {topic},
-Do not add Scene Description,
-Do not add anything in Braces, just return the plain story in text
-Give me response in JSON format and strictly follow the schema
-Just give plain story text only
-{
scripts:[
{
content:""
},
],
}`

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
  };

export const generateScript = async(topic:string)=>{
    const prompt = SCRIPT_PROMPT.replace('{topic}',topic);

    try{
        const response = await model.generateContent(prompt);
        const scripts = response.response.text();
        const jsonMatch =  scripts.match(/{[\s\S]*}/);
        const jsonString = jsonMatch ? jsonMatch[0] : scripts;
        
        return jsonString;
    }catch(e){
        return ""
    }
}

export const generateImagePrompts = model.startChat({
    generationConfig,
    history: [
        {
          role: "user",
          parts: [
            {text: "Generate Image prompt of {style} with all details for each scene for 30 seconds video : script : Once upon a time, there was a little bunny named Pip. Pip loved carrots more than anything. One day, he hopped into a giant carrot patch. He ate and ate until his tummy was round! But then, he got stuck! A friendly fox helped him out, and they shared the rest of the carrots.\n\n- Do not give camera angle image prompt\n-Follow the following schema and return JSON data (Max 4-5 Images)- [\n    {   imagePrompt:'',\n        sceneContent: '<ScriptContent>'    \n    }\n]"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"imagePrompt\": \"A cute, fluffy white bunny named Pip with big, curious eyes, sitting in a field of lush green grass, happily munching on a small, bright orange carrot.  Style:  Painterly, whimsical, Studio Ghibli inspired.  Focus on Pip's adorable expression and the vibrant colors of the carrot and grass. Lighting: soft, warm sunlight.\",\n    \"sceneContent\": \"Pip, the little bunny, is happily eating a carrot in a field.\"\n  },\n  {\n    \"imagePrompt\": \"Pip, the bunny, surrounded by enormous, vibrant orange carrots, some almost as big as he is.  He looks happily surprised but slightly overwhelmed. The carrots are overflowing, a massive patch extending to the horizon. Style:  Slightly surreal, whimsical,  focus on scale and vibrant color.  Lighting: bright, sunny day.\",\n    \"sceneContent\": \"Pip hops into a giant carrot patch and starts eating.\"\n  },\n  {\n    \"imagePrompt\": \"Pip, with a very round, full belly, is completely stuck amongst the giant carrots. He looks slightly worried but mostly amused.  The carrots are close up, showing their texture and color. Style:  Cartoonish,  emphasize Pip's round belly and the playful predicament. Lighting: bright, slightly comedic.\",\n    \"sceneContent\": \"Pip eats so many carrots he gets stuck.\"\n  },\n  {\n    \"imagePrompt\": \"A friendly, smiling fox with orange fur is gently helping Pip out from amongst the carrots.  Pip looks relieved and grateful.  Both are surrounded by the remaining carrots, creating a warm, friendly atmosphere.  Style:  Warm, friendly, slightly painterly, reminiscent of children's book illustrations. Lighting: soft, golden hour sunlight.\",\n    \"sceneContent\": \"A friendly fox helps Pip out, and they share the remaining carrots.\"\n  }\n]\n```\n"},
          ],
        },
    ],
})



