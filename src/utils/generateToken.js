import jwt from 'jsonwebtoken';
const JWT_SIGN_SECRET = 'dsklf,sdmfmdlksdmlsdfmlfdslfdsmlfkdsmlkfds';




function generateToken(id, email) {
  const token = jwt.sign({ id, email },

    JWT_SIGN_SECRET,{
        expiresIn: '2h'
    });
  
  return token;
}


export default generateToken;
