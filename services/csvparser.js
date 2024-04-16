const csvParser = require("csv-parser");


const parseCsv = (stream) => {
    return new Promise((resolve, reject) => {
        const results = [];
        stream
            .pipe(csvParser())
            .on('data', (data) => {
                results.push(data);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

module.exports = parseCsv;