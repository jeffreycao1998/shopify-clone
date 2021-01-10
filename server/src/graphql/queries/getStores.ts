import { ContextType } from '../../types';
import db from '../../db/models';

const getStores = async (_obj: {}, _args: {}, _context: ContextType) => {

  const stores = await db.Store.findAll();
  return stores;
};

export default getStores;