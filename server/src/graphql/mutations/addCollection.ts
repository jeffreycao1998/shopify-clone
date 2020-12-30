import { createCollection } from '../../db/helpers';
import { ImageType, ContextType } from '../../types';

type Args = {
  collection: {
    name: string
    description: string
    image: ImageType
  }
};

const addCollection = async (obj: any, args: Args, context: ContextType) => {
  const { name, description, image } = args.collection;
  const userId = context.user.id;
  
  const collection = await createCollection(name, description, image.data_url, userId);
  return { name: collection.name };
};

export default addCollection;