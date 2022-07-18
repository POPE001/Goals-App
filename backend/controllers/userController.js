const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc Register new user
// @route POST /api/users
// @access public

const regiserUser = asyncHandler(async (req, res) => {

    const {name, email,password} = req.body
    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields')
    }

    //check if the user exists
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    } )

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })

    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }

})



// @desc Login user
// @route GET /api/users
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password)) ) {

        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)

        })
    }

    else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
    
})



// @desc Get user data
// @route POST /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
    const {_id, email, name} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
   
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,  {
        expiresIn: '30d'
    })
}


module.exports = {loginUser, regiserUser, getMe}