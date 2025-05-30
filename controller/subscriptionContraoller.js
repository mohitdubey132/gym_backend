import prisma from '../db/db.config.js';

// export const subscription = async( req, res )  =>{
//     const {userId,planId,} = req.body;
//     console.log("yser",userId)
//        if(planId){
//         const plan = await prisma.plan.findUnique({where:{id:planId}})
//         console.log("hhhhhhhhhhhhh-------------------------------")
//         if(plan && userId){
//               console.log("hhhhhhhhhhhhh-------------------------------5555555555555555555555")
//                const newSubscription = await prisma.subscription.create({data:{
//                 member:userId,
//                 plan:planId
//                }})
//                  console.log("hhhhhhhhhhhhh-------------------------------3333333333333333333333333333")
//                 res.json({
//         success:true,
//         data:newSubscription??""
//     })
//         }
//        }   

   
// }
export const subscription = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    if (!userId || !planId) {
      return res.status(400).json({
        success: false,
        message: "Both userId and planId are required.",
      });
    }

    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found.",
      });
    }

    const newSubscription = await prisma.subscription.create({
      data: {
        member: {
          connect: { id: userId },
        },
        plan: {
          connect: { id: planId },
        },
        // Optionally, calculate endDate here based on plan.duration
        endDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000),
      },
    });

    return res.status(201).json({
      success: true,
      data: newSubscription,
    });

  } catch (error) {
    console.error("Subscription creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};