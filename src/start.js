
let aws = require('aws-sdk');
let s3 = new aws.S3();

exports.handler = async (event, context) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const processInput = {
        Bucket: bucket,
        Key: key
    };
    
    
    console.log(`start state machine ${process.env.STEP_FN_ARN} with input ${JSON.stringify(processInput)}`);
};

