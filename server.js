const express = require('express')
const mongoose = require('mongoose')
const Person = require('./models/personModel')
const app = express()

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('Hello Node API')
})

app.get('/persons', async(req,res)=>{
    try {
        const persons = await Person.find({});
        res.status(200).json(persons);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/persons/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const persons = await Person.findById(id);
        res.status(200).json(persons);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/persons', async(req,res)=>{
    try {
        const person = await Person.create(req.body)
        res.status(200).json(person);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//update person
app.put('/persons/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const person = await Person.findByIdAndUpdate(id, req.body);
        //cannot find product
        if(!person){
            return res.status(404).json({message: 'cannot find person'})
        }
        const updatedPerson = await Person.findById(id);
        res.status(200).json(updatedPerson);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete person
app.delete('/persons/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const person = await Person.findByIdAndDelete(id);
        if(!person){
            return res.status(404).json({message: "cannot find person"})
        }
        res.status(200).json(person);
    } catch (error) {
        
    }
})


mongoose.set("strictQuery",false)

mongoose.connect('mongodb+srv://dattaraj:easyone23@dattarajapi.rjoznzi.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to mongoDB')
    app.listen(3000, ()=>{
        console.log('Node API app is running on port 3000')
    });
}).catch((error)=>{
    console.log(error)
})