const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    destination:{
        type:String,
        required:true
    },
    destinationCountry:{
        type:String
    },
    totalPersons:{
        type:Number,
        required:true
    },
    TravelMonth:{
        type:String,
        required:true
    },
    travelDuration:{
        type:Number,
        default:5
    },
    durationUnit:{
        type:String,
        enum:['days','weeks'],
        default:'days'
    },
    BudgetPerPerson:{
        type:Number,
        required:true
    },
    budgetCurrency:{
        type:String,
        default:'USD'
    },
    description:{
        type:String,
        required:true
    },
    highlights:[String],
    activities:[String],
    image:{
        type:String,
        default:null
    },
    additionalImages:[String],
    accommodationType:{
        type:String,
        enum:['Budget','Mid-range','Luxury'],
        default:'Mid-range'
    },
    transportMode:{
        type:String,
        enum:['Flight','Train','Car','Mixed'],
        default:'Mixed'
    },
    difficulty:{
        type:String,
        enum:['Easy','Moderate','Challenging'],
        default:'Moderate'
    },
    likeCount:{
        type:Number,
        default: 0
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    interested_persons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    comments:[{
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        comment:String,
        createdAt:{
            type:Date,
            default:Date.now
        }
    }],
    status:{
        type:String,
        enum:['open','full','cancelled'],
        default:'open'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const Post = mongoose.model('postData',postSchema)
module.exports = Post