import express from "express";
import cors from "cors";
import type { Express, Request, Response } from "express";
import { pets, Pet } from "./data/pets.js";

const PORT = 8000;
const app: Express = express();
app.use(cors());

type typeQueryPrams = {
  species?: string;
  adopted?: string;
}

// app.get("/", (req: Request, res: Response<Pet[]>): void => {
//   res.json(pets);
// });


app.get(
  "/:id",
  (
    req: Request<{ id: string }>,
    res: Response<Pet | { message: string }>,
  ): void => {
    const { id } = req.params;
    const pet: Pet | undefined = pets.find(
      (pet: Pet): boolean => pet.id.toString() === id,
    );
    if (!pet) {
      res.status(404).json({ message: "not found" });
      return
    }
    res.json(pet);
  },
);

// http://localhost:8000/?adopted=true check by this
// More Flexible
app.get('/', (
  req:Request<{}, unknown, {}, typeQueryPrams>, 
  res:Response<Pet[]>
):void=> {
  const {species, adopted} = req.query

  let filteredPets:Pet[] = pets
  
  if (species){
    filteredPets = filteredPets.filter((pet:Pet):boolean=>
      pet.species.toLowerCase() === species.toLowerCase()
    )
  }

  if (adopted){
    filteredPets = filteredPets.filter((pet:Pet):boolean=>
      pet.adopted === JSON.parse(adopted) // becz we got the true value not in boolean
    )
  }

  res.json(filteredPets)
})

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
