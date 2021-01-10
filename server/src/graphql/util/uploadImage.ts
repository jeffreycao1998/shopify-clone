import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const ID = 'AKIAIP45U57T4DNHYZIQ';
const SECRET = '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';

const BUCKET_NAME = 'shopifyclone-assets';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const uploadImage = async (dataUri) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: uuidv4(),
    Body: dataUri
  };

  const imageData = await s3.upload(params).promise();
  return imageData.Location;
};

export default uploadImage;