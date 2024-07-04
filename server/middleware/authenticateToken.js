// server/middleware/authenticateToken.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }
console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification error:', err); // Log the error
      return res.status(403).json({ message: 'Invalid access token' });
    }
    console.log('Decoded user:', user); // Log the decoded user
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
