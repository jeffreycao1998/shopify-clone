import db from '../../db';

const addProduct = async (obj: any, args: any, context: any, info: any) => {
  const {} = args;
  console.log(args);
  const queryString = `
    UPDATE orders
    SET estimated_pickup=$1
    WHERE id=$2;
  `;

  const values = [] as Array<string>;

  db.query(queryString, values)
  .then(updatedOrder => updatedOrder.rows)
  .catch(e => console.error(e));
  
  return { success: true };
};

export default addProduct;