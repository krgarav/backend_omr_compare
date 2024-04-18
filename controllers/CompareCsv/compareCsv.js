const path = require("path");
const fs = require("fs");

// const csvParser = require("../../services/csvparser");
const csvParser = require("csv-parser");
const csvToJson = require("../../services/csvExtractor");
const XLSX = require('xlsx');
const compareCsv = async (req, res) => {

    // Access other form data parameters
    const firstInputFileName = req.body.firstInputFileName;
    const secondInputFileName = req.body.secondInputFileName;
    const primaryKey = req.body.primaryKey;
    const skippingKey = req.body.skippingKey;
    const imageColName = req.body.imageColName;
    const firstCSVFile = req.uploadedFiles.firstInputCsvFile
    const secondCSVFile = req.uploadedFiles.secondInputCsvFile
    const firstFilePath = path.join(__dirname, "../", "../", "multipleCsvCompare", firstInputFileName);
    const secondFilePath = path.join(__dirname, "../", "../", "multipleCsvCompare", secondInputFileName);

    const f1 = await csvToJson(firstFilePath)
    const f2 = await csvToJson(secondFilePath)

    const diff = [];
    for (let i = 0; i < f1.length; i++) {
        for (let j = 0; j < f2.length; j++) {
            if (f1[i][primaryKey] === f2[j][primaryKey] && f1[i][primaryKey] !== "       " && f2[i][primaryKey] !== "       ") {
                for (let [key, value] of Object.entries(f1[i])) {
                    if (value !== f2[j][key]) {
                        const val1 = value;
                        const val2 = f2[j][key];
                        const imgPathArr = f1[i][imageColName].split("\\");
                        const imgName = imgPathArr[imgPathArr.length - 1]

                        if (!skippingKey.includes(key)) {

                            const obj = {
                                "PRIMARY": primaryKey,
                                "COLUMN_NAME": key,
                                "FILE_1_DATA": val1,
                                "FILE_2_DATA": val2,
                                "IMAGE_NAME": imgName
                            }
                            diff.push(obj);
                        }
                    }
                }
            } else if (f1[i][primaryKey] === "       " && f2[i][primaryKey] !== "       " && i === j) {
                for (let [key, value] of Object.entries(f1[i])) {
                    if (value !== f2[j][key]) {
                        const val1 = value;
                        const val2 = f2[j][key];
                        const imgPathArr = f1[i][imageColName].split("\\");
                        const imgName = imgPathArr[imgPathArr.length - 1]

                        if (!skippingKey.includes(key)) {

                            const obj = {
                                "PRIMARY": primaryKey,
                                "COLUMN_NAME": key,
                                "FILE_1_DATA": val1,
                                "FILE_2_DATA": val2,
                                "IMAGE_NAME": imgName
                            }
                            diff.push(obj);
                        }
                    }
                }
            }
        }

    }
    // console.log(diff)



    // const csvData = csvParser(diff);

    // // Set the content type to CSV
    // res.set('Content-Type', 'text/csv');

    // // Set the content disposition header to trigger download
    // res.set('Content-Disposition', 'attachment; filename="data.csv"');

    // Send the CSV data as the response
    res.status(200).send(diff);
}

module.exports = compareCsv;

