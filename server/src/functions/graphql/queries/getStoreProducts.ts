import { ContextType } from '../../../types';
import db from '../../../db/models';

type Args = {
  storeEndpoint: string
};

const getStoreProducts = async (_obj: {}, args: Args, _context: ContextType) => {
  const { storeEndpoint } = args;

  const store = await db.Store.findOne({ where: { endpoint: storeEndpoint } });

  const collection = await db.Collection.findOne({
    where: { 
      //@ts-ignore
      userId: store.userId,
      active: true
    }
  });
  
  const activeCollection = await db.Collection.findOne({
    attributes: [],
    //@ts-ignore
    where: { id: collection.id },
    include: [
      {
        model: db.Product,
        as: 'products',
        attributes: [ 'id', 'name', 'description', 'price' ],
        through: {
          //@ts-ignore
          model: db.ProductsCollection,
          //@ts-ignore
          where: { collectionId: collection.id }
        },
        include: [{
          model: db.Image,
          attributes: [ 'id', 'dataUrl' ]
        }]
      },
    ],
  });

  //@ts-ignore
  return activeCollection.products;
};

export default getStoreProducts;