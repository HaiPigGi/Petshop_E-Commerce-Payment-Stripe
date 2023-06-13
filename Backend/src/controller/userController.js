import Users from "../models/usersModel.js";
import bcrypt from "bcrypt";
import session from 'express-session';
import generateToken from "../middleware/GenerateTok.js";
import { v4 as uuidv4 } from "uuid";

export const getUsers = async(req, res) => {
  try {
      const users = await Users.findAll({
          attributes:['id','uuidd','name','email','Nomer','password','role']
      });
      res.json(users);
  } catch (error) {
      console.log(error);
  }
}
export const getUserById = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    const response = await Users.findOne({
      attributes: ['uuidd', 'name', 'email', 'nomer', 'role'],
      where: {
        email: email,
      }
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const Register = async (req, res) => {
  const { name, email, nomer, password, confPassword, role } = req.body;
<<<<<<< HEAD
  
  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password dan Confirm Password Tidak Cocok" });
  }

  if (password.length < 8) {
    return res.status(400).json({ msg: "Password harus memiliki minimal 8 karakter" });
  }

  // Check if the phone number is 12 digits long
  if (nomer.length !== 12) {
    return res.status(400).json({ msg: "Nomor telepon harus terdiri dari 12 digit" });
  }
=======
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password Tidak Cocok" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password harus memiliki minimal 8 karakter" });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
>>>>>>> b39ca943dc7d7bbcf26da6f968ce0e6e8c2840ce

  try {
    // Check if the phone number is already registered
    const existingNomer = await Users.findOne({ where: { Nomer: nomer } });
    if (existingNomer) {
      return res.status(400).json({ msg: "Nomor telepon sudah digunakan" });
    }

    // Check if the email is already registered
    const existingEmail = await Users.findOne({ where: { email: email } });
    if (existingEmail) {
      return res.status(400).json({ msg: "Email sudah digunakan" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await Users.create({
      name: name,
      email: email,
      Nomer: nomer,
      password: hashedPassword,
      role: role ? role : "user",
    });

    res.json({ msg: "Registrasi berhasil" });
  } catch (err) {
    console.log(err);
  }
};



<<<<<<< HEAD


=======
>>>>>>> b39ca943dc7d7bbcf26da6f968ce0e6e8c2840ce
export const Login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.status(404).json({ msg: "User tidak ditemukan" });
  }

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(400).json({ msg: "Wrong Password" });
  }

  req.session.login = true; // Menandai bahwa pengguna telah login
  req.session.user = user; // Menandai bahwa pengguna telah login dengan menyimpan data user di session

  const { name, email, Nomer, role } = user;
  console.log("Session:", req.session); // Mengecek session

  // Generate UUID menggunakan paket uuid
  const uuid = uuidv4();

  const token = generateToken(user); // Generate token for user
  console.log("Isi Token : ", token);
  if (role === "user") {
    return res
      .status(200)
      .json({ uuid, name, email, Nomer, role, token, redirectTo: "/home/user" });
  } else if (role === "admin") {
    return res
      .status(200)
      .json({ uuid, name, email, Nomer, role, token, redirectTo: "/admin" });
  } else if (role === "owner") {
    return res
      .status(200)
      .json({ uuid, name, email, Nomer, role, token, redirectTo: "/owner" });
  } else {
    return res
      .status(200)
      .json({ uuid, name, email, Nomer, role, token, redirectTo: "/home" });
  }
};

// export const updateUser = async(req, res) =>{
//   const user = await Users.findOne({
//       where: {
//         email: req.body.email,
//       }
//   });
//   if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
//   const {name, email, password, confPassword, role} = req.body;
//   if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
//   const salt = await bcrypt.genSalt();
//   const hashedPassword = await bcrypt.hash(password, salt);
//   try {
//       await Users.update({
//           name: name,
//           email: email,
//           password: hashedPassword,
//           role: role
//       },{
//           where:{
//               id: user.id
//           }
//       });
//       res.status(200).json({msg: "User Updated"});
//   } catch (error) {
//       res.status(400).json({msg: error.message});
//   }
// }
export const Me = async (req, res) =>{
  if(!req.session.userId){
      return res.status(401).json({msg: "Mohon login ke akun Anda!"});
  }
  const user = await Users.findOne({
      attributes:['uuidd','name','email','Nomer','role'],
      where: {
          uuidd: req.session.userId
      }
  });
  if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
  res.status(200).json(user);
}


export const Logout = async (req, res) => {
  try {
    console.log("Session Sebelum Logout:", req.session); // Mengecek session
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ msg: "Tidak dapat logout" });
      }
      res.clearCookie("sid"); // Menghapus cookie sesi
      res.status(200).json({ msg: "Anda telah logout" });
      console.log("Session Setelah Logout:", req.session); // Mengecek session
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
