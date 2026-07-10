import express from "express";
import type { Express } from "express"; // Very imp in Express
const app: Express = express();

app.get("/", (req, res) => {
  res.send("Hi Ali");
});
const port: number = 8000;
app.listen(port, (): void => {
  console.log(`its working on ${port}`);
});
