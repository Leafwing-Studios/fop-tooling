const isAdmin = (req, res, next) => {
  if (req.user) { // are you logged in at all?
    if (req.user.isAdmin) { // are you an admin?
      next(); // all is well, pass execution to the next function
    } else {
      res.status(403).send({ // forbidden
        errors: "You must be an administrator to do that"
      }); 
    }
  } else {
    res.status(401).send(); // unauthorized
  }
};

module.exports = {
  isAdmin,
}
