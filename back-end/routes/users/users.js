import express from "express";
const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  res.send("GET called");
});

usersRouter.post("/", async (req, res) => {
  res.send("POST called");
});

export default usersRouter;
