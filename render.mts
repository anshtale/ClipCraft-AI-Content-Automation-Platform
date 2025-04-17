import {getCompositionsOnLambda, getFunctions} from "@remotion/lambda"
import dotenv from 'dotenv'

dotenv.config()

const compositions = await getCompositionsOnLambda({
    functionName : 'caption-generator',
    inputProps:{},
    region:'us-east-1',
    serveUrl:'caption-generator'
})

console.log(compositions)