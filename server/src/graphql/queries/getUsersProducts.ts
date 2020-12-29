import { getProductsByUserId } from '../../db/helpers';

const getUsersProducts = async (obj: any, args: any, context: any, info: any) => {
  const userId = context.user.id;

  const result = await getProductsByUserId(userId)

  // const product = {
  //   id: 1234,
  //   name: 'Jeffrey',
  //   description: 'Jeff',
  //   images: [
  //     { 
  //       id: 123,
  //       data_url: '123123'
  //     }
  //   ],
  //   price: 1232
  // }

  return result;
};

export default getUsersProducts;