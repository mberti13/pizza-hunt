const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
    pizzaName:{
        type: String
    },
    createdBy:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    size:{
        type: String,
        default: 'Large'
    },
    toppings:[],
    comments:[
        {
            // ! references Comment ID to display comments for pizza
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
// ! Allows Schema to use virtuals
{
toJSON: {
    virtuals: true,
},
id: false
}
);

// ! Get a total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function(){
    return this.comments.length;
});

// ! Create the Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// ! Export the Pizza model
module.exports = Pizza;