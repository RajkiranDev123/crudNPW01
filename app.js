import express from "express";
import dotenv from "dotenv";
import { user } from "./usermodel.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./.env" });

const app = express();
app.use(cookieParser());
app.use(cors({origin:process.env.CORS_ORIGIN,credentials:true}));
app.use(express.json({limit:"16kb"})); // converts req body(blob format : unreadable stream) to json.
app.use(express.urlencoded({extended:true,limit: "16kb"}));//extended:true (supports nested objects)

app.get("/", (req, res) => {
  res.send("hey there");
});

//Create
app.get("/create", async (req, res) => {
 let createdUser= await user.create({
    name: "4",
    email: "4",
    username: "4",
  });

  console.log("createdUser",createdUser)
});

//Read
app.get("/read", async (req, res) => {
  //   let users = await user.find();
  // findOne ==> {} or null and find ==> [{}] or []
//   let users = await user.find({ username: "4" });
let users = await user.find();


  console.log("get users :", users);
  res.status(200).json({success:true,statusCode:200,data:users})
});

//Update
app.get("/update", async (req, res) => {
  let updatedUser = await user.findOneAndUpdate(
    { username: "raje" },
    { name: "raj" },
    { new: true }
  );
  console.log("updatedUser : ", updatedUser);
});

//D
app.get("/delete", async (req, res) => {
  let deletedUser = await user.findOneAndDelete({ username: "2" });

  console.log("deletedUser : ", deletedUser);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
