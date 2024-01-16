const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
// MongoDB Atlas connection string
const dbURI =
  "mongodb+srv://Awais21pwbcs0837:AwaisNoor37@cluster0.5x4xdtm.mongodb.net/";

// Connect to MongoDB
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Import the routes file
const authRoutes = require("./routes/routes");
const authAdminRoutes = require("./routes/adminRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/admin", authAdminRoutes);
app.use("/user", checkoutRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
