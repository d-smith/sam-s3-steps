
const aws = require('aws-sdk');
const stepFunctions = new aws.StepFunctions();

const startProcess = async (processInput) => {

    var params = {
        stateMachineArn: process.env.STEP_FN_ARN,
        input: processInput
    }

    console.log(`start process execution - stateMachineArn ${process.env.STEP_FUNCTION_ARN}`);
    let result = await stepFunctions.startExecution(params).promise();
    return result;
}


exports.handler = async (event, context) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const processInput = {
        Bucket: bucket,
        Key: key
    };
    
    
    console.log(`start state machine ${process.env.STEP_FN_ARN} with input ${JSON.stringify(processInput)}`);
    let result = await startProcess(JSON.stringify(processInput));
    console.log(result);
    
};

