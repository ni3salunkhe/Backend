import express from "express"
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 4000

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

let userData=[]
let next=1
app.post("/user",(req, res)=>{
    const {name,price}=req.body
    const newData={id:next++, name, price}
    userData.push(newData)
    res.status(201).send(newData)
})

app.get("/user",(req, res)=>{
    res.status(200).send(userData)
})

app.get("/user/:id",(req, res)=>{
    const user = userData.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.status(200).send(user);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})