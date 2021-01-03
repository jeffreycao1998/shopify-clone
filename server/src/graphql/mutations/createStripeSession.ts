import { ContextType } from '../../types';
import db from '../../db/models';
import { CartProductType } from '../../types';
const stripe = require('stripe')(process.env.STRIPE_SK);

type Args = {
  cartProducts: Array<CartProductType>
  successUrl: string
  cancelUrl: string
}

const createStripeSession = async (obj: {}, args: Args, context: ContextType) => {
  const { cartProducts, successUrl, cancelUrl } = args;

  // get list of product ids to fetch products from DB
  const productIds = cartProducts.map((cartProduct: CartProductType) => cartProduct.id);

  // fetch product names and prices from DB
  const productDetails = (await db.Product.findAll({
    attributes: ['id', 'name', 'price'],
    where: { id: [...productIds] }
  }));

  // format products for Stripe API
  const lineItems = productDetails.map((product: any) => {
    const quantity = cartProducts.filter((cartProduct: CartProductType) => {
      return cartProduct.id === product.id;
    })[0].quantity;

    return {
      price_data: {
        currency: 'cad',
        product_data: {
          name: product.name,
        },
        unit_amount: product.price,
      },
      quantity
    }
  })

  // create a stripe session
  const session = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    payment_method_types: ['card'],
    line_items: [...lineItems],
    mode: 'payment',
  });

  return { sessionId: session.id };
};

export default createStripeSession;