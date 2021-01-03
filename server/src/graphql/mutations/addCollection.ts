import { ImageType, ContextType, CollectionType } from '../../types';
import db from '../../db/models';

type Args = {
  collection: {
    name: string
    description: string
    image: ImageType
  }
};

const addCollection = async (obj: {}, args: Args, context: ContextType) => {
  const { name, description, image } = args.collection;
  const userId = context.user.id;
  
  const collections = await db.Collection.findAll({ where: { userId }});;
  const collectionExists = collections.filter((collection: CollectionType) => collection.name === name).length > 0;

  if (collectionExists) {
    throw new Error('A collection with this name already exists');
  } else {
    const hasActiveCollection = await db.Collection.findOne({
      where: { userId, active: true }
    });
  
    const collection = await db.Collection.build({
      name,
      description,
      active: hasActiveCollection ? false : true,
      userId,
      imageUrl: image.dataUrl
    });
    await collection.save();

    return { name: collection.name };
  }
};

export default addCollection;