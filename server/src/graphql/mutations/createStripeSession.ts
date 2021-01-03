import { ContextType } from '../../types';
import db from '../../db/models';
const stripe = require('stripe')(process.env.STRIPE_SK);

type Args = {
  cartProducts: any
  successUrl: string
  cancelUrl: string
}

const createStripeSession = async (obj: {}, args: Args, context: ContextType) => {
  const { cartProducts, successUrl, cancelUrl } = args;
  
  const session = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: 'Tax',
          },
          unit_amount: 1500,
        },
        quantity: 1
      }
    ],
    mode: 'payment',
  });

  return { sessionId: session.id };
};

export default createStripeSession;