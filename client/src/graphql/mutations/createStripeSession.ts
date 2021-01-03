import { gql } from 'apollo-boost'

const CREATE_STRIPE_SESSION = gql`
  mutation createStripeSession($cartProducts: [CartProduct], $successUrl: String, $cancelUrl: String) {
    createStripeSession(cartProducts: $cartProducts, successUrl: $successUrl, cancelUrl: $cancelUrl) {
      sessionId
    }
  }
`;

export default CREATE_STRIPE_SESSION;