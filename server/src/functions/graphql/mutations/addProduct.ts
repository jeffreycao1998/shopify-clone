import { ImageType, ContextType } from '../../../types';
import db from '../../../db/models';

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

  const newImages = dataUrls.map(dataUrl => {
    return {
      dataUrl,
      //@ts-ignore
      productId: product.id
    };
  });

  await db.Image.bulkCreate([...newImages]);
  
  //@ts-ignore
  return { name: product.name };
};

export default addProduct;