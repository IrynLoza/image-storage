## Description

Repository for adding, searching and downloading images to/from local storage with `Node.js` fs module or `AWS SDK` s3 bucket with public and private access.


## Instalation:
```
npm install
```
For AWS S3 bucket need create `.env` in root folder of project

```
SECRET_ID={SECRET}
SECRET_KEY={KEY}
BUCKET_NAME={NAME}
```
Bucket need to be created before use.
Please use `credentials` sent in application form otherwise you need get own.

## Start server
```
npm start
```
Server run on `localhost:3000`

## Test
```
npm test
```


## Technologies:
Node.js, Express.js, 
## External API:
AWS s3
## Test tools:
Mocha ? 
## Code best practice:
ESlint

## Features and endpoints
The project has three main features:

### Upload image/images
When we call endpoint, we can choose one or multiple images for uploading to the local or cloud repository with private or public access. 
**Endpoint**:
`POST` ```/images/{userId}/upload?type={type}&storage={storage}```

**Parametrs**:
`userId`(*required*): represent user `access control`. (suppose check user permissions while requests)

**Query-parametrs**: 
`type`(*required*): represented by string ‘private’ or ‘public’ and refers to image access
`storage`(*required*)*: represented by string ‘s3’ or ‘local’ referring to uploading images to cloud or local storage

### Search image/images
When we call endpoint, we can search one or multiple images by image name, access type or storage type. We have an access to public and cloud stored images links, we can download these images.
For s3 images could be accessed by link if they are `public` otherwise use `download` API

**Endpoint**:
`GET` ```/images/{userId}/search?type={type}&storage={storage}&name={name}```

**Parametrs**:
`userId`(*required*): represent user `access control`. (suppose check user permissions while requests)

**Query-parametrs**: 
`type`(*required*): represented by string ‘private’ or ‘public’ and refers to image access
`storage`(*required*): represented by string ‘s3’ or ‘local’ referring to uploading images to cloud or local storage
`name`(*optional*): represented by string, refers to image's name

### Download image/images
When we call endpoint, we can download one image by `name`, access type or storage type (for cloud storage with private access and both access for local storage).

**Endpoint**:
`GET` ```/images/{userId}/download?type={type}&storage={storage}&name={name}```

**Parametrs**:
`userId`(*required*): represent user `access control` (suppose check user permissions while requests)

**Query-parametrs**: 
`type`(*required*): represented by string ‘private’ or ‘public’ and refers to image access
`storage`(*required*): represented by string ‘s3’ or ‘local’ referring to uploading images to cloud or local storage
`name`(*required*): represented by string, refers to image's name
