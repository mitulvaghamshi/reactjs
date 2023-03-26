const express = require("express");
const apicache = require("apicache");
const workoutController = require("../../controllers/workout-controller");
const recordController = require("../../controllers/record-controller");
const router = express.Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.get("/", cache("2 minutes"), workoutController.getAllWorkouts);
// GET
router.get("/:workoutId", workoutController.getWorkout);
// POST
router.post("/", workoutController.createWorkout);
// PATCH
router.patch("/:workoutId", workoutController.updateWorkout);
// DELETE
router.delete("/:workoutId", workoutController.deleteWorkout);

// Record
// GET
router.get("/:workoutId/records", recordController.getRecordForWorkout);

module.exports = router;
