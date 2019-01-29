
let aws = require('aws-sdk');
let s3 = new aws.S3();

exports.handler = async (event, context) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: bucket,
        Key: key
    };
    
    let result = await s3.getObject(params).promise();
    console.log(result);
};

