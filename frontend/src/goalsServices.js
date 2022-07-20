import axios from "axios";

const API_URL = "/api/goals/";

//create new Goal
const createGoal = async (goal, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL, goal, config);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//get user goals
const getGoals = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//delete user Goal
const deleteGoal = async (goalId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${API_URL}${goalId}`, config);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//Update User Goal
const updateGoal = async (goal, goalId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${API_URL}${goalId}`, goal, config);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
const goalsService = { createGoal, getGoals, deleteGoal, updateGoal };

export default goalsService;
