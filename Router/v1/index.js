import express from 'express';
import {planCreate , plans,updatePlans} from "../../controller/planController.js"
import userCreatev1,{login , listOFUser } from '../../controller/userController.js'
import {authorizeUser ,authorizeRoles} from '../../middleware/auth.js'
const router = express.Router()

router.get('/helo',(req,res,next)=>{
       res.json({
        success : true,
        message:"working",
        data:{},
        error:{}
       })
})
router.post("/user",userCreatev1)
router.post('/login',login)
router.post("/verifyToken",authorizeUser,authorizeRoles("adin","staff"),listOFUser)
router.post("/plan",authorizeUser,authorizeRoles("admin"),planCreate)
router.get("/plan",plans)
router.put('/plan',authorizeUser,authorizeRoles("admin"),updatePlans)
export default router;