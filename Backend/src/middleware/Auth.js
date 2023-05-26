import Users from "../models/usersModel.js";

export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        console.log(req.session);
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await Users.findOne({
        where: {
            uuidd: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    req.userId = user.id;
    req.role = user.role; 
    console.log(req.session);
    next();
}

export const adminOnly = async (req, res, next) =>{
    const user = await Users.findOne({
        where: {
            uuidd: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if(user.role !== "admin") return res.status(403).json({msg: "Akses terlarang"});
    next();
}

export const checkLogin = (req, res, next) => {
  if (!req.session.login || !req.session.user) {
    console.log(req.session);
    console.log("Silahkan Lakukan Login");
    return res.status(401).json({ msg: "Unauthorized" });
  }
  // Continue with the next middleware if the user is logged in
  next();
};


  export const checkLoginStatus = (req, res) => {
    if (req.session.login) {
      // User is logged in
      return res.status(200).json({ isLoggedIn: true, session: req.session });
    } else {
      // User is not logged in
      return res.status(200).json({ isLoggedIn: false, session: null });
    }
  };

  // Middleware function to check if the user is authenticated
export const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "User not authenticated" });
  }
  next();
};

  
  
  
  