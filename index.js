import express from 'express'

const app = express()

const port = 3000

app.use(express.json())

let CourseData = []
let nextid = 1

app.post('/course' , (req, res) =>{
    const {name,price} = req.body
    const newData= {id : nextid++ , name , price}
    CourseData.push(newData)
    res.status(201).send(newData)
})

app.get("/courses" , (req, res)=>{
    res.status(201).send(CourseData)
})

app.get("/course/:id", (req,res) =>{
    const course = CourseData.find(t => t.id === parseInt(req.params.id))
    if (!course){
        return res.send(404).send("Course not found")
    }
    res.status(201).send(course)
})

app.put("/course/:id" , (req,res) => {
    const course = CourseData.find(t => t.id === parseInt(req.params.id))

    if(!course){
        return res.status(404).send('course not found')
    }

    const {name,price} = req.body
    course.name = name
    course.price = price
    res.status(200).send(course)
})


app.delete('/course/:id' , (req,res) => {
    const index =  CourseData.findIndex(t => t.id === parseInt(req.params.id))
    if(index == -1){
        return res.status(404).send("course not found")
    }
    CourseData.splice(index , 1)
    return res.status(204).send('deleted course')

})



app.get("/" , (req , res) => {
    res.send("Hello from sid ")
})

app.listen(port , ()=>{
    console.log(`Server is running at port: ${port}....`)
})