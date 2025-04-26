import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config();


connectDB()

//connection database 
// const connectDB =async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/ ${DB_NAME}`)
//         app.on("error", (error)=>{
//             console.log("ERROR", error)
//             throw error
//         })

//         app.listen(process.env.PORT, ()=>{
//            console.log(`App is listening on port ${process.env.PORT}`)
//         })

//     } catch (error) {
//         console.log("ERROR", error)
//         throw error
//     }
// };
