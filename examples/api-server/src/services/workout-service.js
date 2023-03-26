const { v4: uuid } = require("uuid");
const workout = require("../database/workout");

const getAllWorkouts = (filterParams) => {
  try {
    const allWorkouts = workout.getAllWorkouts(filterParams);
    return allWorkouts;
  } catch (error) {
    throw error;
  }
};

const getWorkout = (workoutId) => {
  try {
    const aWorkout = workout.getWorkout(workoutId);
    return aWorkout;
  } catch (error) {
    throw error;
  }
};

const createWorkout = (newWorkout) => {
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "UTC" });
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  try {
    const createdWorkout = workout.createWorkout(workoutToInsert);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

const updateWorkout = (workoutId, changes) => {
  try {
    const updatedWorkout = workout.updateWorkout(workoutId, changes);
    return updatedWorkout;
  } catch (error) {
    throw error;
  }
};

const deleteWorkout = (workoutId) => {
  try {
    workout.deleteWorkout(workoutId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
