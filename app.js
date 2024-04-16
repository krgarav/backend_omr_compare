const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const templeteRoutes = require("./routes/templete");
const Templete = require("./models/TempleteModel/templete");
const MetaData = require("./models/TempleteModel/metadata");
const Files = require("./models/TempleteModel/files");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs");
const cors = require("cors")
const compareCsv = require("./routes/compareCsv");
const app = express();
app.use(cors())

// app.get("/view", async (req, res, next) => {
//   const sourceFilePath = path.join(
//     __dirname,
//     "extractedFiles",
//     "1712652641.221_DATA/HINDI/New HINDI 45Q 2024-03-27_17-21-15-34.tif"
//   );

//   try {
//     // Read the TIFF file
//     const image = await Jimp.read(sourceFilePath);
//     const bufferImage = await image.getBufferAsync(Jimp.MIME_JPEG);
//     const base64Image = bufferImage.toString('base64');

//     // Send the buffer image as a response
//     res.status(200).json({base64Image});
//     return

//     // Perform transformations if needed (e.g., resizing, applying filters)
//     // For example, resize the image to 500px width
//     // image.resize(500, Jimp.AUTO);

//     // Save the transformed image as a JPG file in the 'convertedImages' folder
//     // const targetFilePath = path.join(
//     //   __dirname,
//     //   "convertedImages",
//     //   "output.jpg"
//     // );
//     // console.log(targetFilePath)
//     // await image.writeAsync(targetFilePath);

//     // Send response if the image conversion and saving are successful
//     console.log(image)
//     res.status(200).json(image);
//   } catch (err) {
//     // Handle errors
//     console.error("Error converting image:", err);
//     res.status(500).send("Error converting image.");
//   }
// });

// app.use("/static", express.static(path.join(__dirname, "/extractedFiles")));

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(templeteRoutes);
app.use(compareCsv);

Templete.hasMany(MetaData);
MetaData.belongsTo(Templete);
Templete.hasMany(Files);
Files.belongsTo(Templete);

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("Server is connected");
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
// })
// .catch((err) => {
//   console.log(err);
// });
