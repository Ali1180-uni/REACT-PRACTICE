import express from 'express'
import type {Express} from 'express'

const PORT = 8000
const app:Express = express()

/*
CHALLENGE: Respond with some data!
1. Create an object called `pet` before the `/` route that includes:
   - name (string)
   - species (string)
   - adopted (boolean)
   - age (number)
2. Type your new pet object (inline or using a custom type)
3. Update your existing GET `/` route to return that pet object
4. Compile the TypeScript and run the resulting JavaScript to see it in action
*/

app.get('/', (req, res)=> {
  res.json({})
})

app.listen(PORT, ():void =>{
  console.log("Listening on port: ", PORT)
})