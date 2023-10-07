const asyncHandler = require("express-async-handler");
const user = require("../models/student.model");


const registerUser = asyncHandler(async (req,res) =>{
    const {name} = req.body;
})


const updateUserProfile = asyncHandler(async (req,res) => {

})

module.exports = {registerUser, updateUserProfile};