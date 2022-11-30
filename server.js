import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTES */
app.use("/user", userRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

//mongodb connection
//mongodb+srv://<username>:<password>@fisi.ivom7.mongodb.net/?retryWrites=true&w=majority
//mongoose.connect('mongodb://localhost:27017/test');
//use
// app.use(bodyParser.json())
// app.use('/user',userRouter)
// app.use(express.json());
// app.use(cors())
// //app.use(morgan('common'))
// app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies
// app.use(bodyParser.json({
//   type: ["application/x-www-form-urlencoded", "application/json"], // Support json encoded bodies
// }));
// app.use(express.urlencoded({ limit: "30mb", extended: true }));

// //mongidb connection
// mongoose.connect(
//     `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@fisi.ivom7.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology:true
//     }
//     ).then(()=>{
//         console.log("Database connected");
//     })
// app.listen(process.env.PORT,()=>{
//     console.log(`server is running on ${process.env.PORT}`)
// })
