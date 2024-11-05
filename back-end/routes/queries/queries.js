import express from "express";
const queriesRouter = express.Router();

queriesRouter.get("/", async (req, res) => {
  res.send("GET called");
});

queriesRouter.post("/", async (req, res) => {
  res.send("POST called");
});

export default queriesRouter;
