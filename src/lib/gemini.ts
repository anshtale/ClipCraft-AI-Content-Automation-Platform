import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash'
})

const SCRIPT_PROMPT = `Write a two different script for 30 seconds video on Topic : {topic},
<<<<<<< HEAD
-Do not add scene description
-Do not Add anything in Braces, just return the plain story in text
=======
>>>>>>> 4ef5c1a (added function to generate video script)
-Give me response in JSON format and follow the schema
-{
scripts:[
{
content:""
},
],
}`


<<<<<<< HEAD

//this can be called from mutation or server action
=======
>>>>>>> 4ef5c1a (added function to generate video script)
export const generateScript = async(topic:string)=>{
    const prompt = SCRIPT_PROMPT.replace('{topic}',topic);

    try{
        const response = await model.generateContent(prompt);
<<<<<<< HEAD
        return response.response.text();
=======
        return response.response.text;
>>>>>>> 4ef5c1a (added function to generate video script)
    }catch(e){
        return ""
    }
}



