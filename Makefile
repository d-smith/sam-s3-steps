package:
	cd src && npm install && npm pack && cd ..

deploy: package
	sam package --template-file template.yml --output-template-file packaged.yml --s3-bucket sampack-97068
	sam deploy --template-file ./packaged.yml --stack-name sams3steps --capabilities CAPABILITY_IAM
