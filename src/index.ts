import express from "express";
import morgan from "morgan";
import petsRouter from "./api/pets";
import { port } from "./utils/config";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send({ name: "Pet Store API", endpoint: "/api/pets" });
});

app.use("/api/pets", petsRouter);

app.listen(port, () => console.log(`app running at http://localhost:${port}`));
