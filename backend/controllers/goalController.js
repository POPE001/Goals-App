const asyncHandler = require('express-async-handler')
// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field...')
    }
    res.status(200).json({ message: 'Get Goals'})

})
// @desc Set Goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    res.status(201).json({ message: 'Set Goals'})

})
// @desc Update Goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req,res) => {
    res.status(200).json({ message: `Update Goals ${req.params.id}`})
})

// @desc Delete Goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Deleted Goal ${req.params.id}`})
})

module.exports = {getGoals, setGoal, updateGoal, deleteGoal}