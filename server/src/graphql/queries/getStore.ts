import { ContextType } from '../../types';
import db from '../../db/models';

type Args = {
  storeEndpoint: string
}

const getStore = async (obj: {}, args: Args, context: ContextType) => {
  const { storeEndpoint } = args;
  const userId = context.user.id;

  let store;

  if (storeEndpoint) {
    store = await db.Store.findOne({
      where: { endpoint: storeEndpoint },
    });
  } else {
    store = await db.Store.findOne({
      where: { userId },
    });
  }
  
  return store;
};

export default getStore;