import type {Request, Response, NextFunction} from 'express'

/*
CHALLENGE: Get specific with the Request and Response generics
1. Think about what params we might be getting in the request
2. Consider what we might be responding with
*/

export const validateId = (
  req:Request<{id:string}>, 
  res:Response<{message:string}>, 
  next:NextFunction
) => {
  const {id} = req.params
  if (!/^\d+$/.test(id)) { // This is Regex which is used to identify specific things like numbers, emails & passwords etc
    res.status(400).json({message: "Pet ID must be a number"})
  } else {
    next()
  }
}

/*
CHALLENGE: Create a `pleaseAuth` middleware
1. Write a standalone function called `pleaseAuth`
2. It should take req, res, and next
3. If query.password === "please", call next()
4. Otherwise, send a 401 with a message in JSON
5. Type req, res, and next
6. Attach this middleware to the `/:id` route
   
TESTS:
/pets/1 - should result in 401 Unauthorised error
/pets/1?password=please - we should get Bella the dog
*/

export const pleaseAuth = (req:Request<{}, unknown, {}, {password?:string}>, res: Response<{message: string}>, next: NextFunction): void => {  // Use these Request Parameters only in Query String
    const {password} = req.query
    if(password !== "please"){
        res.status(401).json({message: "Auth Fails"})
        return
    }else{
        next()
    }

}