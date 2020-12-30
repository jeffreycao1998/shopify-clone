import { getCollectionsByUserId, createCollection } from '../../db/helpers';
import { ImageType, CollectionType, ContextType } from '../../types';

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
  
  const collections = await getCollectionsByUserId(userId);
  const collectionExists = collections.filter((collection: any) => collection.dataValues.name === name).length > 0;

  if (collectionExists) {
    throw new Error('A collection with this name already exists');
  } else {
    const newCollection = await createCollection(name, description, image.data_url, userId);
    return { name: newCollection.name };
  }
};

export default addCollection;