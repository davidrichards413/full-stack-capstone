import express from "express";
const queriesRouter = express.Router();

import { client, connect } from "../../db.js";
const dbName = "queriesdb";
const collectionName = "queries";
connect(); // Connect to MongoDB

queriesRouter.get("/", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const queries = await collection.find({}).toArray();
    // console.log(queries);
    console.log(`retrieved ${queries.length} queries`);
    if (queries.length > 0) {
      res.status(200).json(queries);
    } else {
      res.status(404).send(`no queries found for ${req.params.user}`);
    }
  } catch (err) {
    if (res.status) console.error(err);
    res.status(500).send("queries table not read");
  }
});

queriesRouter.get("/user/:user", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const filter = { user: req.params.user };
    const queries = await collection.find(filter).toArray();
    // console.log(queries);
    console.log(
      `retrieved ${queries.length} queries for user ${req.params.user}`
    );
    if (queries.length > 0) {
      res.status(200).json(queries);
    } else {
      res.status(404).send(`no queries found for ${req.params.user}`);
    }
  } catch (err) {
    if (res.status) console.error(err);
    res.status(500).send("queries table not read");
  }
});

queriesRouter.post("/", async (req, res) => {
  const queryArray = req.body;
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.insertOne(queryArray);
    console.log("query saved to MongoDB");
    res.status(200).send("query saved to MongoDB");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

queriesRouter.delete("/user/:user", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const filter = { user: req.params.user };
    const result = await collection.deleteMany(filter);
    console.log(
      `deleted ${result.deletedCount} documents for user ${req.params.user}`
    );
    // if (result.length > 0) {
    res.status(200).json(result);
    // } else {
    //   res.status(404).send(`no queries found for ${req.params.user}`);
    // }
  } catch (err) {
    if (res.status) console.error(err);
    res.status(500).send("queries table not reset");
  }
});

export default queriesRouter;
