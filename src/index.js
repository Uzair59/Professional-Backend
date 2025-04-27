import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config();

connectDB()
  .then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log("Mongo db connection failed!!!!", error);
  });

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
