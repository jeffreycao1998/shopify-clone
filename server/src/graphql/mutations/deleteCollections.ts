import { ContextType } from '../../types';
import db from '../../db/models';

type Args = {
  collectionIds: Array<number>
}

const deleteCollections = async (obj: {}, args: Args, context: ContextType) => {
  const { collectionIds } = args;
  
  await db.Collection.destroy({ where: { id: [...collectionIds] }});

  return { amount: collectionIds.length };
};

export default deleteCollections;