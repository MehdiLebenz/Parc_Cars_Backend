import jwt from 'jsonwebtoken';

const SECRET = 'mysecret';
function verifyToken(token) {
  try {
    const { id } = jwt.verify(token, SECRET);
    return id;
  } catch (err) {
    return null;
  }
}
export default verifyToken;