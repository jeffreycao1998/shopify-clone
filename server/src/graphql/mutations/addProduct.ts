import { ImageType, ContextType } from '../../types';
import db from '../../db/models';
import { uploadImageToS3 } from '../util';

type Args = {
  product: {
    name: string
    description: string
    images: Array<ImageType>
    price: number
  }
}

const addProduct = async (_obj: {}, args: Args, context: ContextType) => {
  const { name, description, images, price } = args.product;
  const userId = context.user.id;
  
  const product = await db.Product.build({
    name,
    description,
    price,
    userId,
  });
  await product.save();
  
  const dataUrls = images.map(image => image.dataUrl);

  const newImages = dataUrls.map(async dataUrl => {
    const imageLocation = await uploadImageToS3(dataUrl);
    return {
      dataUrl: imageLocation,
      //@ts-ignore
      productId: product.id
    };
  });

  await Promise.all(newImages)
  .then(async images => await db.Image.bulkCreate([...images]))
  .catch(err => { throw new Error(err.message)});

  //@ts-ignore
  return { name: product.name };
};

export default addProduct;