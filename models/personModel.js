const mongoose = require('mongoose')

const personSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:[true, "Please enter the person name"]
        },
        age:{
            type: Number,
            required: true,
            default: 0
        },
        weight:{
            type: Number,
            required: true
        },
        sport:{
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Person = mongoose.model('Person', personSchema);

module.exports = Person;