import { updateUsersActiveCollection } from '../../db/helpers';
import { ContextType } from '../../types';

type Args = {
  collectionId: number
}

const updateActiveCollection = async (obj: {}, args: Args, context: ContextType) => {
  const { collectionId } = args;
  const userId = context.user.id;

  await updateUsersActiveCollection(collectionId, userId);
  
  return { success: true };
};

export default updateActiveCollection;