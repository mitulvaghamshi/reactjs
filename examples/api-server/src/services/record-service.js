const record = require("../database/record");

const getRecordForWorkout = (workoutId) => {
  try {
    const aRecord = record.getRecordForWorkout(workoutId);
    return aRecord;
  } catch (error) {
    throw error;
  }
};

module.exports = { getRecordForWorkout };
