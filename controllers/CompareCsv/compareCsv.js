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
    const firstCSVFile = req.uploadedFiles.firstInputCsvFile
    const secondCSVFile = req.uploadedFiles.secondInputCsvFile
    // console.log(req.uploadedFiles.firstInputCsvFile)
    // console.log(firstInputFileName, secondInputFileName, primaryKey, skippingKey)
    const firstFilePath = path.join(__dirname, "../", "../", "multipleCsvCompare", firstInputFileName);
    const secondFilePath = path.join(__dirname, "../", "../", "multipleCsvCompare", secondInputFileName);
    console.log(firstFilePath)


    const f1 = await csvToJson(firstFilePath)
    const f2 = await csvToJson(secondFilePath)
    // console.log(f1)
    const diff = [];
    for (let i = 0; i < f1.length; i++) {
        for (let j = 0; j < f2.length; j++) {
            if (f1[i][primaryKey] === f2[j][primaryKey]) {
                for (let [key, value] of Object.entries(f1[i])) {
                    if (value !== f2[j][key]) {
                        const val1 = value;
                        const val2 = f2[j][key];

                        const obj = {
                            "PRIMARY": primaryKey,
                            "COLUMN_NAME": key,
                            "FILE_1_DATA": val1,
                            "FILE_2_DATA": val2
                        }
                        diff.push(obj)
                    }
                }
            }
        }

    }
    console.log(diff)



    const csvData = parse(dataArray);

    // Set the content type to CSV
    res.set('Content-Type', 'text/csv');

    // Set the content disposition header to trigger download
    res.set('Content-Disposition', 'attachment; filename="data.csv"');

    // Send the CSV data as the response
    res.status(200).send(csvData);

    // const worksheet = XLSX.utils.json_to_sheet(diff);

    // // Convert the worksheet to a CSV string
    // const csvData = XLSX.utils.sheet_to_csv(worksheet);

    // // Set the content type to CSV
    // res.set('Content-Type', 'text/csv');

    // // Set the content disposition header to trigger download
    // res.set('Content-Disposition', 'attachment; filename="data.csv"');

    // // Send the CSV data as the response
    // res.status(200).send(csvData);
    // const f1Filter = f1.filter((item,index)=>{
    //     item[]
    // })
    // console.log(f1);



}

module.exports = compareCsv;

