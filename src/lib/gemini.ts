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



