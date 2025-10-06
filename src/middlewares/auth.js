const adminAuth = (req, res, next) => {
  const token = "xyz";
  const authorized = token === "xyz";
  console.log("isAuthorized? ->", authorized);
  if (!authorized) {
    res.status(401).send("Unauthotrised");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const authorized = token === "xyz";
  console.log("isAuthorized? ->", authorized);
  if (!authorized) {
    res.status(401).send("Unauthotrised User");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
