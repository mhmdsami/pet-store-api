import express from "express";
import { port } from "./utils/config";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ name: "Pet Store API", endpoint: "/api/" });
});

app.listen(port, () => console.log(`app running at http://localhost:${port}`));
