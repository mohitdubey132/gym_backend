import prisma from '../db/db.config.js';

export const planCreate = async(req, res)=>{
      const { name ,price} = req.body;
      console.log("ggggggggggggggggggggg")
      if(name && price){
        const newPlan = await prisma.plan.create({
            data:{
                name:name,
                price:price
            }
        }) .catch((err)=>{
          console.log("error --------->",err.meta,err)

        })

        if(newPlan){
              res.json({success:true,
                message:"plan created ",
                data:newPlan
        })
        }
      
      }
}

export const plans = async(req, res)=>{
        
        const newPlan = await prisma.plan.findMany() .catch((err)=>{
          console.log("error --------->",err.meta,err)

        })

        if(newPlan){
              res.json({success:true,
                message:"plans list   ",
                data:newPlan
        })
        }
    
}
export const updatePlans = async(req,res)=>{
    const { name , price , id } = req.body;

      const newPlan = await prisma.plan.update({
      where:{id:id},
      data:{name:name,price:price}})
    if(newPlan){
      res.json({
        success:true,
        data:newPlan
      })
    }
}