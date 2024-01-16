const isAuthorized = (req, res, next) => {
  console.log((req.user));
  if (req.user) {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized access' });
      return;
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
    return; 
  }
  
};

module.exports = { isAuthorized };
