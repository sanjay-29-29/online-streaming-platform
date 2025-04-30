import dotenv from "dotenv";
import connectToDataBase from "./config/mongoose.config";
import app from "./app";

const result = dotenv.config();

setTimeout(()=>{
    if(result.error){
        console.log(result.error);
        throw result.error;
    }
    console.log("Environment Varaible are successfully loaded")
},1000);

connectToDataBase();


const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`)
});