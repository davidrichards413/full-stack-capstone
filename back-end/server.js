import express from "express";
import path from "node:os";
import newsRouter from "./routes/news/news.js";
import queriesRouter from "./routes/queries/queries.js";
import usersRouter from "./routes/users/users.js";

const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;

app.use("/news", newsRouter);
app.use("/users", usersRouter);
app.use("/queries", queriesRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
