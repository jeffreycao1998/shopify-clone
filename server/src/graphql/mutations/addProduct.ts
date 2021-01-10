import { ImageType, ContextType } from '../../types';
import db from '../../db/models';
import { uploadImage } from '../util';
require('dotenv').config();
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
    const imageLocation = await uploadImage(dataUrl);
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

const product = {
  name: 'sdfsdf',
  description: 'sdfsdfsdf',
  images: [
    {
      id: 1209389012,
      dataUrl: 'https://i.imgur.com/IMBQqCK.jpg',
      name: 'asdasd',
      size: 5321234
    },
    {
      id: 123123,
      dataUrl: 'https://i.imgur.com/VyuoCz4.jpg',
      name: 'asasdasd',
      size: 123123
    }
  ],
  price: 5000,
}

addProduct(null, { product }, { user: { id: 1 }, _extensionStack: null })
.then(data => console.log(data))
.catch(err => console.log(err));

export default addProduct;