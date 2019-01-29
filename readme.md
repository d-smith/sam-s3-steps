# sam-s3-steps

Process an object dropped into an s3 bucket, with the processing performed in a step function state machine to allow specifying a retry policy for exception handling.

## deploy

```console
make
```

## try it

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
