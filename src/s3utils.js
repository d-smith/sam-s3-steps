class S3DataPreconditionError extends Error {
    constructor(...args) {
        super(...args)
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}


const readInputDataJSON = async (S3, bucketName, key, predicate) => {
    let params = {
        Bucket: bucketName,
        Key: key
    };

    let s3response = await S3.getObject(params).promise();
    console.log(s3response);

    inputJSON = JSON.parse(s3response['Body'].toString());
    if (predicate(inputJSON)) {
        return inputJSON;
    }

    console.log(`consistency predicate failed`);

    throw new S3DataPreconditionError(`Unable to satisfy consistency predicate`);
}

const writeBodyObj = async (S3, bucketName, key, body) => {
    let putParams = {
        Body: JSON.stringify(body),
        Key: key,
        Bucket: bucketName
    };

    let s3response = await S3.putObject(putParams).promise();
    console.log(s3response);
    return s3response;
}

module.exports = {
    readInputDataJSON,
    writeBodyObj
};