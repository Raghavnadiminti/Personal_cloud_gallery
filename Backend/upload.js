// src/upload.js
// import { PutObjectCommand,GetObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { s3 } from "./aws.js";
const { PutObjectCommand,GetObjectCommand,DeleteObjectCommand }=require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { s3 }=require('./config.js')
const BUCKET = process.env.AWS_BUCKET_NAME;
async function generateUploadUrl(filename, contentType) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3, command, {
    expiresIn: 300, 
  });

  return url;
}

async function generateReadUrl(key) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(s3, command, {
    expiresIn: 600, // 10 minutes
  });

  return url;
}

async function Delete(key){
   


  
      const command = new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key
      });
  
      await s3.send(command);
  
    
}

module.exports={generateUploadUrl,generateReadUrl,Delete}