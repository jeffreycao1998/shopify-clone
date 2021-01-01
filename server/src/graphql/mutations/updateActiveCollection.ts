import { updateUsersActiveCollection } from '../../db/helpers';
import { ContextType } from '../../types';

type Args = {
  collectionId: number
}

const updateActiveCollection = async (obj: {}, args: Args, context: ContextType) => {
  const { collectionId } = args;
  const userId = context.user.id;

  const result = await updateUsersActiveCollection(collectionId, userId);
  return { name: result.dataValues.name };
};

export default updateActiveCollection;