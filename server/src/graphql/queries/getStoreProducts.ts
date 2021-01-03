import { ContextType } from '../../types';
import db from '../../db/models';

type Args = {
  storeEndpoint: string
};

const getStoreProducts = async (obj: {}, args: Args, context: ContextType) => {
  const { storeEndpoint } = args;

  const store = await db.Store.findOne({ where: { endpoint: storeEndpoint } });

  const collection = await db.Collection.findOne({
    where: { 
      userId: store.userId,
      active: true
    }
  });
  
  const activeCollection = await db.Collection.findOne({
    attributes: [],
    where: { id: collection.id },
    include: [
      {
        model: db.Product,
        as: 'products',
        attributes: [ 'id', 'name', 'description', 'price' ],
        through: {
          model: db.ProductsCollection,
          where: { collectionId: collection.id }
        },
        include: [{
          model: db.Image,
          attributes: [ 'id', 'dataUrl' ]
        }]
      },
    ],
  });

  return activeCollection.products;
};

export default getStoreProducts;