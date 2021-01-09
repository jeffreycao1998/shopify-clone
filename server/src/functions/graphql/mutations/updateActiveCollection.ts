import { ContextType } from '../../../types';
import db from '../../../db/models';

type Args = {
  collectionId: number
}

const updateActiveCollection = async (_obj: {}, args: Args, context: ContextType) => {
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
    //@ts-ignore
    activeCollection.active = false;
    await activeCollection.save();
  }
  
  // Activate new collection
  const newActiveCollection = await db.Collection.findOne({ where: { id: collectionId }});
  //@ts-ignore
  newActiveCollection.active = true;
  //@ts-ignore
  await newActiveCollection.save();

  //@ts-ignore
  return { name: newActiveCollection.name };
};

export default updateActiveCollection;