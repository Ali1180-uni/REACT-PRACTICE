import Express from "express"
import type { Router, Request, Response } from "express"
import { pets, Pet } from "../data/pets.js"

export const petRouter: Router = Express.Router()

type PetQueryParams = {
  species?:string,
  adopted?: 'true' | 'false',
  minAge?: string,
  maxAge?: string
}

petRouter.get('/', (
  req:Request<{}, unknown, {}, PetQueryParams>, 
  res:Response<Pet[]>
):void=> {
  const {species, adopted, minAge, maxAge} = req.query

  let filteredPets:Pet[] = pets
  
  if (species){
    filteredPets = filteredPets.filter((pet:Pet):boolean=>
      pet.species.toLowerCase() === species.toLowerCase()
    )
  }

  if (adopted){
    filteredPets = filteredPets.filter((pet:Pet):boolean=>
      pet.adopted === JSON.parse(adopted)
    )
  }

  if (minAge){
    filteredPets = filteredPets.filter((pet:Pet):boolean=>
      pet.age >= JSON.parse(minAge)
    )
  }

  if (maxAge){
    filteredPets = filteredPets.filter((pet:Pet):boolean=>
      pet.age <= JSON.parse(maxAge)
    )
  }

  res.json(filteredPets)
})

petRouter.get('/:id', (
  req:Request<{id:string}>,
  res:Response<Pet|{message:string}>):void=>{
  const {id} = req.params
  const pet:Pet|undefined = pets.find((pet:Pet):boolean => pet.id.toString() === id)
  
  if (pet){
    res.json(pet)
  } else {
    res.status(404).json({message: "No pet with that ID"})
  }
})