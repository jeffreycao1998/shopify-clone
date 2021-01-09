const jwt = require('jsonwebtoken');

const getUserId = (token: string) => {
  const decoded = jwt.verify(
    token.slice(7),
    process.env.JWT_SECRET
  );

  const { userId } = decoded;

  return userId;
};

const context = ({ req }: any) => {
  const token = req.headers.authorization || '';
  
  if (!token) {
    return { user: null }
  }

  return { 
    user: {
      id: getUserId(token)
    } 
  };
}

export default context;