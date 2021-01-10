import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const ID = 'AKIAJTOBM6NON3AJMZTQ';
const SECRET = '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';

const BUCKET_NAME = 'shopifyclone-assets';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const uploadImage = async (dataUri) => {
  const buffer = Buffer.from(dataUri.split(',')[1], 'base64');
  const params = {
    Bucket: BUCKET_NAME,
    Key: uuidv4(),
    Body: buffer
  };

  const imageData = await s3.upload(params).promise();
  return imageData.Location;
};

export default uploadImage;