const express = require("express");
const router = express.Router();
const users = require("../models/userSchema")

// router.get("/",(req,res)=>{
//     console.log("Connect");
// })

router.post("/register", async (req, res) => {
    // console.log(req.body);

    const { name, accNo, bank, add1, add2, city, country, zip } = req.body;

    if (!name || !accNo || !bank || !city || !country || !zip) {

        res.status(422).json("plz fill data");
        return
    }

    try {

        const preUser = await users.findOne({ accNo: accNo });
        console.log(preUser);

        if (preUser) {
            res.status(422).json("User already present");
        }
        else {
            const addUser = new users({
                name, accNo, bank, add1, add2, city, country, zip
            });
            await addUser.save();
            res.status(201).json(addUser);
            console.log(addUser);
        }


    } catch (error) {
        res.status(422).json(error);
    }
})


router.get("/getData", async (req, res) => {
    try {
        const userData = await users.find();
        res.status(201).json(userData);
        // console.log(userData);
    } catch (error) {

    }
})

router.get("/getuser/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const userindividual = await users.findById({ _id: id });

        console.log(userindividual);
        res.status(201).json(userindividual);

    } catch (error) {
        res.status(422).json(error);
    }
})

router.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updateduser = await users.findByIdAndUpdate( id, req.body,{
            new: true
        });
        console.log(updateduser);
        res.status(201).json(updateduser);
}catch (error) {
    res.status(422).json(error);
}
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteuser = await users.findByIdAndDelete({_id:id});
        console.log(deleteuser);
        res.status(201).json(deleteuser);
}catch (error) {
    res.status(422).json(error);
}
})


module.exports = router;
