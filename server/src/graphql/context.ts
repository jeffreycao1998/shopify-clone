const jwt = require('jsonwebtoken');

const getUser = (token: string) => {
  
};

const context = ({ req }: any) => {
  const token = req.header.authorization || '';
  const user = getUser(token);
  return { user };
}

export default context;