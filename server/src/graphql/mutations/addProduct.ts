import { Image } from '../../types';
import { createProduct, addImagesToProduct } from '../../db/helpers';

const addProduct = async (obj: any, args: any, context: any, info: any) => {
  const { title, description, images, price } = args.product;
  const userId = context.user.id;

  const productId = (await createProduct(title, description, price, userId)).rows[0].id;

  images.forEach( async (image: Image) => {
    await addImagesToProduct(image.url, productId);
  })
  
  return { success: true };
};

export default addProduct;