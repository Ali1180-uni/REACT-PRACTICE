import express from "express";
import cors from "cors";
import type { Express, Request, Response } from "express";

import { petRouter } from "./routes/pets.routes.js";

const PORT = 8000;
const app: Express = express();
app.use(cors());

// app.get("/", (req: Request, res: Response<Pet[]>): void => {
//   res.json(pets);
// });

app.get("/:id", petRouter);

// http://localhost:8000/?adopted=true check by this
// More Flexible
app.get("/", petRouter);

// Species Specified Setup only
// app.get(
//   "/",
//   (
//     req: Request<{}, unknown, {}, { species?: string }>, // Special Generica Parameters of Request also handeled
//     res: Response<Pet[]>,
//   ): void => {
//     const { species } = req.query;

//     let filteredPets: Pet[] = pets;

//     if (species) {
//       filteredPets = filteredPets.filter(
//         (pet: Pet): boolean =>
//           pet.species.toLowerCase() === species.toLowerCase(),
//       );
//     }
//     res.json(filteredPets);
//   },
// );

app.use((req: Request, res: Response<{ message: string }>): void => {
  // Here Response is Generic and message decides the type of JSON type which returns
  res.status(404).json({ message: "No endpoint found" });
});

app.listen(PORT, (): void => {
  console.log("Listening on port: ", PORT);
});
