// Simple Variable Type Practice
// let name = "Ali Tahir"; --> JS
let Name: string = "Ali Tahir"; // Explicitly declaring the type as string
let GetName: boolean = true; // Explicitly declaring the type as boolean

// i can also do sometig like this
type Food  = String;
let FoodData: Food = "Grow";

// I can also perform this on objects

type Person = {
    name: string
    age: number
    skill: string
}

// Also i add the Nested Type

type Address = {
  street: string
  Area: string
}

let Person 1: Person = {
  name: "Ali",
  age: 13,
  skill: "WEB",
  address?: Address
}

// Also i add an array of objects
let Persons: Person[] = [Person1, Person2]
let Persons: Array<Person> = [Person1, Person2]


// We can also write like this
let myName: "Bob" = "Bob"
const myName2: "Bob" = "Bob"

// Wrong
let myName: "Bob" = "Bobby"
const myName2: "Bob" = "Bobby"


// We can also add the userRoles like Enums in TypeScript

type UserRole = "guest" | "member" | "admin"
let userRole: UserRole = "admin"

type User = {
    username: string
    role: "guest" | "member" | "admin"
}

type UserRole = "guest" | "member" | "admin"

let userRole: UserRole = "member"

// UtilityTypes

type User = {
    id: number
    username: string
    role: "member" | "contributor" | "admin"
}

type UpdatedUser = {
    id?: number
    username?: string
    role?: "member" | "contributor" | "admin"
}

const users: User[] = [
    { id: 1, username: "john_doe", role: "member" },
    { id: 2, username: "jane_smith", role: "contributor" },
    { id: 3, username: "alice_jones", role: "admin" },
    { id: 4, username: "charlie_brown", role: "member" },
];

function updateUser(id: number, updates: UpdatedUser) { // Explicity defined type Added as a Parameter
    // Find the user in the array by the id
    const foundUser = users.find(user => user.id === id)
    if (!foundUser) {
        console.error("User not found!")
        return
    }
    // Use Object.assign to update the found user in place. 
    Object.assign(foundUser, updates)
}

// Example updates:
updateUser(1, { username: "new_john_doe" });
updateUser(4, { role: "contributor" });

console.log(users)

// Generics and Partial User

type User = {
    id: number
    username: string
    role: "member" | "contributor" | "admin"
}

// The Partial utility type makes all properties of an object optional.
type UpdatedUser = Partial<User> // Built-in type 

// Omit is used to --> Just minus specific key attribute from the object

Practice:
function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
    const newPizza: Pizza = {
        id: nextPizzaId++,
        ...pizzaObj
    }
    menu.push(newPizza)
    return newPizza
}

// Adding Generics:

function addToArray<T>(array: T[], item: T): T[] { // Any type
    array.push(item)
    return array
}


// This is how we can add the restrictions with generics
addToArray<Pizza>(menu, {id: nextPizzaId++, name: "Chicken Bacon Ranch", price: 12 })
addToArray<Order>(orderQueue, { id: nextOrderId++, pizza: menu[2], status: "completed" })

// We use Generics in the useState()