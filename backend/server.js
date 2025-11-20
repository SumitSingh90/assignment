import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

let data = [];

app.get("/api/items", (req, res) => {
  res.json(data);
});

app.post("/api/items", (req, res) => {
  const item = req.body;
  data.push(item);
  res.json({ message: "Item added", item });
});

app.put("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  data[id] = req.body;
  res.json({ message: "Item updated", item: data[id] });
});

app.delete("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const removed = data.splice(id, 1);
  res.json({ message: "Item deleted", removed });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
