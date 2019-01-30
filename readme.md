# sam-s3-steps

Process an object dropped into an s3 bucket, with the processing performed in a step function state machine to allow specifying a retry policy for exception handling.

## deploy

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

Determine the source bucket

```console
aws cloudformation describe-stacks --stack-name sams3steps
```

Drop a file

```console
aws s3 cp readme.md s3://sams3steps-sourcebucket-13sk6y00yk39t
```

View the logs

```console
sam logs --name Start --stack-name sams3steps
```


## Notes

This example uses a convenience/default Api Gateway set up - this would not be good enough for a real application.