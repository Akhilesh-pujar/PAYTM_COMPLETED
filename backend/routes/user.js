const { Router } = require("express");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const JWT_SECRET = require("../config");
const authMiddleware = require("../middleware");

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string()
});

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

const userRouter = Router();

userRouter.get("/userInfo", authMiddleware, async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findOne({ _id: userId });
        
        if (user) {
            res.json({
                firstName: user.firstName,
                lastName: user.lastName
            });
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


userRouter.post("/signup" ,async (req, res) => {
    const body = req.body;
    
    const { success } = signupSchema.safeParse(body);
    const dbCheck = await User.findOne({ username: body.username });
    
    if (success && !dbCheck) {
        const user = await User.create(body);
        
        const balance = Math.round((Math.random() * 10000) * 100);
        await Account.create({userId: user._id, balance: balance});

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.json({ msg: "User created successfully", token: token });
    } else {
        res.status(411).json({ msg: "Email already taken / Incorrect inputs" });
    }
});

userRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    const { success } = signinSchema.safeParse(req.body);

    if (!success) {
        res.status(411).json({ msg: "Invalid credentials" });
        return;
    }

    const check = await User.findOne({ username, password });
    if (check) {
        const token = jwt.sign({ userId: check._id }, JWT_SECRET);
        res.json({ token: token , msg: "Logged in successfully"});
    } else {
        res.status(411).json({ msg: "User not found" });
    }
});

userRouter.put("/", authMiddleware, async (req, res) => {
    const { success, data } = updateSchema.safeParse(req.body);

    if (!success) {
        res.status(400).json({ msg: "Invalid credentials" });
        return;
    }

    const filter = { _id: req.userId }; 
    const update = { $set: data };

    try {
        const result = await User.updateOne(filter, update);
        if (result.modifiedCount > 0) {
            res.json({ msg: 'Document updated successfully!' });
        } else {
            res.json({ msg: 'Document not found or no modifications were made.' });
        }
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

userRouter.get("/", authMiddleware, async(req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
                firstName: {
                    "$regex": filter
                }
            }, 
            {
                lastName: {
                    "$regex": filter
                }
            }]
    });
    const filterdUsers = users.map(user => {
        return {
            userId: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }
    })
    res.json(filterdUsers); 
})

module.exports = userRouter;
