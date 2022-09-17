import express from "express";
import { getDatabase } from "../utils/database";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await getDatabase();

    const data = await db.collection("pets").find().sort({ _id: -1 }).toArray();
    if (data.length === 0) return res.status(204);
    res.send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const db = await getDatabase();
    const _id = parseInt(req.params._id);

    const data = await db.collection("pets").findOne({ _id });
    if (!data)
      return res
        .status(400)
        .send({ _id, message: "Specified _id does not exist" });
    res.send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const db = await getDatabase();

    await db.collection("pets").insertOne({ ...data });
    res.send({ message: "Added to the database successfully", data });
  } catch (error) {
    res.status(400).send({ error: error, data });
  }
});

router.put("/:_id", async (req, res) => {
  let data = req.body;
  try {
    const db = await getDatabase();
    const _id = parseInt(req.params._id);

    await db.collection("pets").updateOne({ _id }, { $set: { ...data } });
    data = await db.collection("pets").findOne({ _id });

    if (!data)
      return res
        .status(400)
        .send({ _id, message: "Specified _id does not exist" });
    res.send({ message: "Updated data successfully", data });
  } catch (error) {
    res.status(400).send({ error: error, data });
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const db = await getDatabase();
    const _id = parseInt(req.params._id);

    const { deletedCount } = await db.collection("pets").deleteOne({ _id });
    if (deletedCount === 0)
      return res.status(400).send({ message: "Specified _id does not exist" });
    res.send({ _id, message: "Data deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

export default router;
