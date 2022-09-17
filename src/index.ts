import express from "express";
import petsRouter from "./api/pets";
import { port } from "./utils/config";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ name: "Pet Store API", endpoint: "/api/pets" });
});

app.use("/api/pets", petsRouter);

app.listen(port, () => console.log(`app running at http://localhost:${port}`));
