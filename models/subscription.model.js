import mongoose from "mongoose";
const subscriptionSchema = mongoose.Schema({
    name:{
        type:String,
        required : [true,'Sunscription is needed'],
        trim : true,
        minLength:2,
        maxLength:100
    },
    price:{
        type : Number,
        required:[true,'Subscription Price is needed'],
        min:[0,'Price must be greater than 0 ']
    },
    frequency:{
        type : String,
        enum : ['daily','weekly','monthly','yearly']
    },
    category:{
        type:String,
        enum :['sports','news','finance','devotional','entertainment','politics','technology','other'],
        required : true
    },
    paymentMethod:{
        type:String,
        trim : true,
        required : true
    },
    status:{
        type: String,
        enum: ['active','cancelled','expired'], // ✅ correct spelling
        default: 'active'
    },
    startDate:{
        type:Date,
        required:true,
        validate:(value) => value <= new Date(),
        message : "Start Date must be in past"
    },
    renewalDate:{
        type:Date,
        validate: function(value) {
            return value> this.startDate;
        },
        message : "Start Date must be in past"
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true,
        index:true,
    }
},
{timestamps:true});

subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily : 1,
            weekly : 7,
            monthly : 30,
            yearly : 365
        };    
    this.renewalDate = new Date(this.startDate)
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    if(this.renewalDate < new Date()){
        this.status = 'expired'
    }
    next()
}
)
const SubscriptionModel = mongoose.model('SubscriptionModel',subscriptionSchema)
export default SubscriptionModel;