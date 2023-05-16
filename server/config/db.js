import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "skygoal",
    })
    .then((e) => {
      console.log(`Database connected with ${e.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
