
// middleware.js
export const checkAuth = (req, res, next) => {
    if (!req.session.login) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    next();
  };
  
