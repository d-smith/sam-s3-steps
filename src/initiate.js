const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const stepFunctions = new AWS.StepFunctions();


const middy = require('middy');
const { httpErrorHandler } = require('middy/middlewares')
const txnid = require('./middleware/txnid');

const writeBodyObj = require('./s3utils').writeBodyObj;




const startCore = async (event, context) => {
    console.log(`create called with context ${JSON.stringify(context)}`);
    console.log(`input payload is ${JSON.stringify(event['body'])}`);

    try {
        console.log(`write to bucket ${process.env.BUCKET_NAME} with key ${context.txnId}`);
        await writeBodyObj(S3, process.env.BUCKET_NAME, context.txnId, event['body']);
    } catch (theError) {
        console.log(JSON.stringify(theError));
        return { statusCode: 500, body: 'Error capturing process input' };
    }

    
    let responseBody = {
        transactionId: context.txnId
    };

    return {statusCode: 200, body: JSON.stringify(responseBody)};
};


module.exports.start = middy(startCore)
    .use(txnid())
    .use(httpErrorHandler());