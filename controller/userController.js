import bcrypt from 'bcryptjs';
import prisma from '../db/db.config.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js'
import dotenv from 'dotenv';
// dotenv.config();
const userCreatev1 = async (req, res) => {
  const { name, email, password } = req.body;
  let passwordHash;

  // Uncomment this section for full functionality
  
  const findUser = await prisma.user.findUnique({
    where: { email },
  });

  if (findUser) {
    return res.json({
      status: 400,
      message: "Email already taken. Please use another email.",
    });
  }

  if (password) {
    const saltRounds = parseInt(process.env.PASSWORD_SALT) || 10;
passwordHash = await bcrypt.hash(password, saltRounds);

    // passwordHash = await bcrypt.hash(password, process.env.PASSWORD_SALT);
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash ?? password,
    },
  });

  if (newUser?.id) {
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET??"uggjjh", {
      expiresIn: '1h',
    });
   const alluser = await prisma.user.findMany()
    return res.json({
      status: 200,
      data: { token, user: newUser },
      total:alluser,
      message: 'User created successfully.',
    });
  }
  

  return res.json({
    status: 200,
    // data: newUser,
    msg: 'User created (mock response).',
  });
};

export default userCreatev1;

export const login = async (req, res) => {
    const {  email, password } = req.body;
     let passwordhash ;
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    let isVaild;
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //         user: process.env.EMAIL_USER,
  //         pass: process.env.EMAIL_PASS,
  //     },
  // });

//   const result = await prisma.$queryRaw`
//   SELECT *
//   FROM public.user

//   LIMIT 10;

// `;

// console.log(result);
    if (findUser) {
             isVaild = await bcrypt.compare(password,findUser.password)
             if(isVaild){
            //   const mailOptions = {
            //     from: process.env.EMAIL_USER, // Sender email
            //     to: findUser?.email, // Replace with recipient email
            //     subject: "User Action  🚀",
            //     text: "Some user has login with your account please new message inform our support team if you are not using yur account ",
            //     html: "<h1>Hello from Nodemailer</h1><p>This is bhgvhv a test email sent using <strong>Nodemailer</strong> in Node.js!</p>",
            // };   
            // transporter.sendMail({})
            //   transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //         console.log("Error:", error);
            //     } else {
            //         console.log("Email sent:", info.response);
            //     }
            // });
            const token = jwt.sign({id:findUser.id},process.env.JWT_SECRET??"uggjjh",{expiresIn:"1h"})    
              return res.json({
                status: 200,
                message: "Email and password is right Taken . please another email.",
                data:findUser,
                token:token
              });
             }
    
    }   
    return res.json({ status: 401, msg: "User not found" });
  };
