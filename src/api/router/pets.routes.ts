import { Router } from "express";
import {
  createNewPet,
  deletePet,
  getAllPets,
  getPetById,
  updatePet,
} from "../controllers/pets.controller";

const router = Router();

router.get("/", getAllPets);
router.get("/:_id", getPetById);
router.post("/", createNewPet);
router.put("/:_id", updatePet);
router.delete("/:_id", deletePet);

export default router;
