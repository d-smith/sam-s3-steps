const aws = require('aws-sdk');
const s3 = new aws.S3();
const s3utils = require('./s3utils');


exports.munge = async (event, context) => {
    console.log(`munge called with event ${JSON.stringify(event)}`);
    console.log(`source bucket is ${event.Bucket}, key ${event.Key}`);

    let data = await s3utils.readInputDataJSON(s3, event.Bucket, event.Key, (x)=> true);
    console.log(`input data is ${data}`);

    let munged = data.split("").reverse().join("");
    console.log(munged);

    let response = await s3utils.writeBodyObj(s3, process.env.DESTINATION_BUCKET, event.Key, munged);
    console.log(`bucket write response is ${response}`);
}