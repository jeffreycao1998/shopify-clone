import { createProduct, addImagesToProduct } from '../../db/helpers';
import { ImageType, ContextType } from '../../types';

type Args = {
  product: {
    name: string
    description: string
    images: Array<ImageType>
    price: number
  }
}

const addProduct = async (obj: {}, args: Args, context: ContextType) => {
  const { name, description, images, price } = args.product;
  const userId = context.user.id;

  const product = await createProduct(name, description, price, userId);

  images.forEach( async (image: ImageType) => {
    await addImagesToProduct(image.dataUrl, product.id);
  });
  
  return { name: product.name };
};

export default addProduct;