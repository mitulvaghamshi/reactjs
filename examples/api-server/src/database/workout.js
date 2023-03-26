const DB = require("./json/db.json");
const { saveToDatabase } = require("./utils");

/**
 * @openapi
 * components:
 *   schemas:
 *     workout:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name:
 *           type: string
 *           example: Tommy V
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */
const getAllWorkouts = (filterParams) => {
  try {
    let workouts = DB.workouts;
    if (filterParams.mode) {
      return workouts.filter((workout) => {
        return workout.mode.toLowerCase().includes(filterParams.mode);
      });
    }
    // other filters
    return workouts;
  } catch (error) {
    throw { status: error?.status || 500, massage: error?.massage || error };
  }
};

const getWorkout = (workoutId) => {
  try {
    const workout = DB.workouts
      .find((workout) => workout.id === workoutId);
    if (!workout) {
      throw {
        status: 400,
        massage: `Can't find workout with the id '${workoutId}'`,
      };
    }
    return workout;
  } catch (error) {
    throw { status: error?.status || 500, massage: error?.massage || error };
  }
};

const createWorkout = (newWorkout) => {
  const isExists = DB.workouts
    .findIndex((workout) => workout.name === newWorkout.name) > -1;
  if (isExists) {
    throw {
      status: 400,
      massage: `Workout with name: ${newWorkout.name} already exists.`,
    };
  }
  try {
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw { status: error?.status || 500, massage: error?.massage || error };
  }
};

const updateWorkout = (workoutId, changes) => {
  try {
    const indexForUpdate = DB.workouts
      .findIndex((workout) => workout.id === workoutId);
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  } catch (error) {
    throw { status: error?.status || 500, massage: error?.massage || error };
  }
};

const deleteWorkout = (workoutId) => {
  try {
    const indexForDelete = DB.workouts
      .findIndex((workout) => workout.id === workoutId);
    if (indexForDelete === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    DB.workouts.splice(indexForDelete, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, massage: error?.massage || error };
  }
};

module.exports = {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
