import { Image } from '../../types';
import { createProduct, addImagesToProduct } from '../../db/helpers';

const addProduct = async (obj: any, args: any, context: any, info: any) => {
  const { title, description, images, price } = args.product;
  const userId = context.user.id;

  const product = (await createProduct(title, description, price, userId)).rows[0];

  images.forEach( async (image: Image) => {
    await addImagesToProduct(image.url, product.id);
  });
  
  return { name: product.name };
};

export default addProduct;