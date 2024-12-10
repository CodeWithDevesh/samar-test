const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const registrationRoutes = require("./routers/registration");
const adminRoutes = require('./routers/admin')

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;
const cors_origin = process.env.CORS;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.use(
  cors({
    origin: cors_origin,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/register", registrationRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Server Working!!!");
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
