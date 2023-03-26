const express = require("express");
const bodyParser = require("body-parser");
const v1WorkoutRouter = require("./v1/routes/workout-routes");
const { swaggerDocs: v1SwaggerDocs } = require("./v1/swagger");

const app = express();
const PORT = process.env.PORT || 3000;

// app.get("/", (_, res) => res.send("<h2>It's Working...</h2>"));

app.use(bodyParser.json());
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`API Service listening at: http://[::1]:${PORT}`);
  v1SwaggerDocs(app, PORT);
});
