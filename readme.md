# sam-s3-steps

Process an object dropped into an s3 bucket, with the processing performed in a step function state machine to allow specifying a retry policy for exception handling.

## overview

This sample contains a lambda function (Initiate) that receives data via an HTTP post, and writes the input data to an S3 bucket (source bucket).

When an object is created in the source bucket, and event is generated that triggers another lambda (Start). The start lambda instantiates a state machine, passing the source bucket and key as inputs to the state machine.

The state machine consists of a single task lambda (DataMunger), which takes the input bucket and key, reads the object data, munges the data, and writes it to a destination bucket.

The data munger task lambda includes a random failure generator. This is to illustrate how the retry configuration for the task works. Play around with the retry parameters in the state machine definition and the failure change set in the data munger function for fun and profit.

## deploy

Note that you will have to create then reference your own s3 bucket in the Makefile.

```console
make deploy
```

## try it

To figure out the API endpoint, first list your APIs:

```console
aws apigateway get-rest-apis
```

Then, get the deets for your particular API:

```console
aws apigateway get-stages --rest-api-id asrqll225d
Now use the info to form the endpoint - https://{api id}.execute-api.{region}.amazonaws.com/{stage}/initiate, e.g. https://asrqll225d.execute-api.us-east-1.amazonaws.com/Stage/initiate
```

View the logs

```console
sam logs --name Initiate --stack-name sams3steps
sam logs --name Start --stack-name sams3steps
sam logs --name DataMunger --stack-name sams3steps
```


## Notes

This example uses a convenience/default Api Gateway set up - this would not be good enough for a real application.