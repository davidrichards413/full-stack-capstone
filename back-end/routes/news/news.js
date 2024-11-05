import express from "express";
const newsRouter = express.Router();

newsRouter.get("/", async (req, res) => {
  res.send("GET called");
});

newsRouter.post("/", async (req, res) => {
  res.send("POST called");
});

export default newsRouter;
