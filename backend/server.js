

const express = require ('express')
const app = express()
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()


app.use(cors())
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*")
  next()
})

// db connection
let db = new sqlite3.Database('database.db', (err)=>{
  if (err){
    // console.log(err)
  }
  // console.log("Connected to the access database.")
})

app.use(express.json({limit:'10mb'}))


// login api
app.post('/validatePassword', (req, res)=>{
  const {email, password} = req.body
  const query = `SELECT * FROM users WHERE email = ?`
  db.get(query, [email], (err, user) =>{
    if (err){
      return res.status(500).json({message : "DB error"})
    }

    if (!user){
      return res.status(400).json({message : "User not found"})
    }
    
    if (user.password != password){
      return res.status(400).json({message : "Invalid Password"})
    }
    return res.json({message: "Login Successful", user})
  })
})


// Sign up api

app.post('/signup', (req, res) => {
  const {name, phone, email, password} = req.body
  if (!name || !phone || !email || !password){
    return res.status(400).json({message: "All fields are required"})
  }
  const query = `INSERT INTO users (name, phone, email, password ) VALUES(?,?,?,?)`
  db.run(query, [name, phone, email, password], (err)=>{
    if(err){
      // console.log(err)
       // already email exist
      if(err.message.includes("UNIQUE")){
      return res.status(500).json({message: "Email already exists"})
    }
    return res.status(500).json({ message: "Database error" });
    }
   
    return res.json({ message: "Signup Successful" })
  })

})


app.listen(3002, () => console.log("Listening at port 3002")) 