const {
  ListObjectsV2Command,
  GetObjectCommand
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const {s3} = require("./config");
const dotenv = require('dotenv') 
dotenv.config();
const BUCKET = process.env.AWS_BUCKET_NAME;

async function listImages() {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET,
   
  });

  const data = await s3.send(command);
    
  if (!data.Contents) return [];

  const images = await Promise.all(
    data.Contents.map(async (obj) => {
      const getCmd = new GetObjectCommand({
        Bucket: BUCKET,
        Key: obj.Key
      });

      const url = await getSignedUrl(s3, getCmd, {
        expiresIn: 300
      });

      return {
        key: obj.Key,
        url
      };
    })
  );
//  console.log("func",images)
  return images;
}

module.exports = { listImages };
