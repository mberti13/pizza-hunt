const { Pizza } = require('../models');

const pizzaController = {
    // * get all pizzas
    getAllPizza(req, res){
        Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        });
    },
    // * Get one pizza from ID
    getPizzaById({ params }, res){
        Pizza.findOne({ _id: params.id })
        .then(dbPizzaData =>{
            //if no pizza is found send 404
            if(!dbPizzaData){
                res.status(404).json({ message: 'No pizza found with this ID!'})
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        });
    },
    // * Creates a pizza
    createPizza({ body }, res){
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },
    // * Update a Pizza by its ID
    updatePizza({ params, body }, res){
        Pizza.findOneAndUpdate({ _id: params.id }, body, {new: true})
        .then(dbPizzaData =>{
            if(!dbPizzaData){
                res.status(404).json({ message: "No Pizza found with this ID!" })
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },
    // * Delete a Pizza by its ID
    deletePizza({ params}, res){
        Pizza.findOneAndDelete({ _id: params.id})
        .then(dbPizzaData =>{
            if(!dbPizzaData){
                res.status(404).json({ message: "No Pizza found with this ID!"});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
};


module.exports = pizzaController;