import { ContextType } from '../../types';
import db from '../../db/models';

type Args = {
  collectionId: number
}

const updateActiveCollection = async (obj: {}, args: Args, context: ContextType) => {
  const { collectionId } = args;
  const userId = context.user.id;

  // Deactivate old collection
  const activeCollection = await db.Collection.findOne({
    where: { 
      userId,
      active: true
    }
  });

  if (activeCollection) {
    activeCollection.active = false;
    await activeCollection.save();
  }
  
  // Activate new collection
  const newActiveCollection = await db.Collection.findOne({ where: { id: collectionId }});
  newActiveCollection.active = true;
  await newActiveCollection.save();

  return { name: newActiveCollection.name };
};

export default updateActiveCollection;