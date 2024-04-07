const { Router } = require("express");
const mongoose = require("mongoose");
const { User, Account } = require("../db");
const authMiddleware = require("../middleware");
const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const account = await Account.findOne({userId: userId});
    res.json({balance: (account.balance / 100)});
})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const userId = req.userId;
        const { to, amount } = req.body;

        if(amount === 0){
            res.json({msg: "You did not enter any amount"})
            return;
        }
        
        if(amount < 0){
            res.json({msg: "Transfer can't be negative."})
            return;
        }

        const fromUserAccount = await Account.findOne({userId: userId});
    
        const toUser = await User.findOne({username: to});
    
        if(!toUser){
            res.status(400).json({msg: "Invalid account"})
            return;
        }else if(fromUserAccount.balance < (amount * 100)){
            res.status(400).json({msg: "Insufficiant balance"})
            return;
        }
    
        const toUserAccount = await Account.findOne({userId: toUser._id});
    
        if(toUserAccount.userId == userId){
            res.json({msg: "Can not transfer to yourself!"})
            return;
        }

        fromUserAccount.balance -= (amount * 100);
        await fromUserAccount.save();

        toUserAccount.balance += (amount * 100);
        await toUserAccount.save();

        await session.commitTransaction();
    
        res.json({msg: `Transaction for ₹${amount} done successfully`});

    }catch(err){
        await session.abortTransaction();
        res.status(500).json({msg: "Internal Server Error"});

    }finally{
        session.endSession();
    }    

})

module.exports = accountRouter;