import express from "express";
import { Request, Response } from "express";
import { authToken } from "../../utils/config";
import { getDatabase } from "../../utils/database";


const router = express.Router();

export const getAllPets = async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();

    const data = await db.collection("pets").find().sort({ _id: 1 }).toArray();
    if (data.length === 0) return res.status(204);
    res.send(data);
  } catch (error) {
    res.status(400).send(error);
  }
}

export const getPetById = async (req: Request, res: Response) => {
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
}

export const createNewPet = async (req: Request, res: Response) => {
  if (req.headers.authorization != authToken)
    return res
      .status(401)
      .send({ message: "You are unauthorized to make this request" });

  const {_id, pet_name, owner_name, type, gender}= req.body;
  if(!_id || !pet_name || !owner_name || !type || !gender) {
    const error: Error = {
      name: "MANDATORY_FIELDS_MISSING",
      message: "Mandatory field is missing.",
    };
    return res.status(400).json(error);
  }
  const data = {
    _id : _id,
    pet_name : pet_name,
    owner_name : owner_name,
    type : type,
    gender : gender 

  }
  try {
    const db = await getDatabase();
    await db.collection("pets").insertOne({ ...data });
    res.send({ message: "Added to the database successfully", data });
  } catch (error) {
    res.status(400).send({ error: error, data });
  }
}

export const updatePet = async (req: Request, res: Response) => {
  if (req.headers.authorization != authToken)
    return res
      .status(401)
      .send({ message: "You are unauthorized to make this request" });

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
}

export const deletePet = async (req: Request, res: Response) => {
  if (req.headers.authorization != authToken)
    return res
      .status(401)
      .send({ message: "You are unauthorized to make this request" });

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
}

export default router;
