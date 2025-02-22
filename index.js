import express from "express"
import 'dotenv/config'
import logger from "./logger.js";
import morgan from "morgan";


const app = express()
const port = process.env.PORT || 4000

const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);

// app.get("/", (req, res) => {
//     res.send("Hello From Nitin with nodemon")
// })

// app.get("/contactus",(req,res)=>{
//     res.send("NO Contact only visit...")
// })

// app.get("/about-us",(req, res)=>{
//     res.send("Dont like to Scream")
// })

// app.get("/ig",(req,res)=>{
//     res.send("Go and study")
// })

app.use(express.json())

let userData = []
let next = 1

// add new user 
app.post("/user", (req, res) => {
    logger.info("User added")
    const { name, price } = req.body
    const newData = { id: next++, name, price }
    userData.push(newData)
    res.status(201).send(newData)
})

//get all users
app.get("/user", (req, res) => {
    res.status(200).send(userData)
})

//get specific user on the basis of id
app.get("/user/:id", (req, res) => {
    const user = userData.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.status(200).send(user);
})

//update user
app.put("/user/:id", (req, res) => {
    const user = userData.find(user => user.id === parseInt(req.params.id))
    if (!user) {
        return res.status(404).send("User not found")
    }
    const { name, price } = req.body
    user.name = name
    user.price = price
    res.status(200).send(user)
})

//delete user
app.delete("/user/:id", (req, res) => {
    const user = userData.findIndex(user => user.id === parseInt(req.params.id))
    if (user === -1) {
        return res.status(404).send("No user with this id exists")
    }
    userData.splice(user, 1)
    return res.status(204).send("deleted")
})



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})