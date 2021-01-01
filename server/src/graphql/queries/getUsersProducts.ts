import { ContextType } from '../../types';
import db from '../../db/models';

const getUsersProducts = async (obj: {}, args: {}, context: ContextType) => {
  const userId = context.user.id;

  const result = await db.Product.findAll({
    attributes: [ 'id', 'name', 'description', 'price' ],
    where: { userId },
    include: [
      {
        model: Image,
        attributes: [ 'id', 'dataUrl' ]
      }
    ]
  });
  
  return result;
};

export default getUsersProducts;