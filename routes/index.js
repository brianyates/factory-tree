const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize'); //Use Mongo Sanitize to protect against injection attacks
const Factory = mongoose.model('factories');
const {formInputsAreValid, generateChildArray} = require('./routeHelpers');

const INVALID_FORM_ERROR = Error('Invalid form inputs');

module.exports = (app, io) => {

    //Get all factories
    app.get('/api/all-factories', async (req, res) => {
        const factories = await Factory.find({}).sort({createdAt: 'desc'}).exec();
        res.send(factories);
    });

    //Create a new factory
    app.post('/api/create-factory',  async (req, res) => {
        try{
            var {name, generateChildren, lowerBound, upperBound, numChildren} = req.body;
            var children;
            //If the user generates the children upon factory creation, populate children...otherwise, leave child attributes blank
            if(!name){
                throw INVALID_FORM_ERROR;
            }
            if(generateChildren){
                if(!formInputsAreValid(lowerBound, upperBound, numChildren)){
                    throw INVALID_FORM_ERROR;
                }
                children = generateChildArray(lowerBound, upperBound, numChildren);
            }
            else{
                lowerBound = '';
                upperBound = '';
                numChildren = '';
                children = null;
            }
            const factory = new Factory({
                name: sanitize(name),
                lowerBound,
                upperBound,
                numChildren,
                children,
                createdAt: Date.now()
            });
            const savedFactory = await factory.save();
            io.emit('factoryAdded', savedFactory);
            res.sendStatus(201);
        }
        catch(err){
            console.log(err);
            res.sendStatus(501);
        }
    })

    //Edit a factory's properties
    app.put('/api/update-factory/:id/:type',  async (req, res) => {
        const {id, type} = req.params;
        //If the user is only editing the name, do not update the children properties (and vice versa)
        if(type==='name'){
            try{
                const {name} = req.body;
                if(!name){
                    throw INVALID_FORM_ERROR;
                }
                const factory = await Factory.findOneAndUpdate({_id: id}, {$set:{name: sanitize(name)}}, {new: true});
                if(factory){
                    io.emit('factoryUpdated', factory);
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }
            catch(err){
                console.log(err);
                res.sendStatus(500);
            }
        }
        else{
            try{
                var {lowerBound, upperBound, numChildren} = req.body;
                if(!formInputsAreValid(lowerBound, upperBound, numChildren)){
                    throw INVALID_FORM_ERROR;
                }
                const children = generateChildArray(lowerBound, upperBound, numChildren);
                const factory = await Factory.findOneAndUpdate({_id: id}, {$set:{lowerBound, upperBound, numChildren, children}}, {new: true});
                if(factory){
                    io.emit('factoryUpdated', factory);
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }
            catch(err){
                console.log(err);
                res.sendStatus(500);
            }
        }
    })

    //Delete a factory
    app.delete('/api/delete-factory/:id',  async (req, res) => {
        try {
            const {id} = req.params;
            const factory = await Factory.deleteOne({_id: id});
            if(factory){
                io.emit('factoryRemoved', id);
                res.sendStatus(204);
            }
            else{
                res.sendStatus(404);
            }
        }
        catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    })
}