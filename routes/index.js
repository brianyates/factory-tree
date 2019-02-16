const mongoose = require('mongoose');
const Factory = mongoose.model('factories');

const generateChildArray = (lowerBound, upperBound, numChildren) => {
    var arr = [];
    for(let i = 0; i < numChildren; i++){
        const randomValue = Math.floor(Math.random() * (upperBound - lowerBound + 1) ) + lowerBound;
        arr.push(randomValue);
    }
    return arr;
}

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
            if(generateChildren){
                lowerBound = parseInt(lowerBound);
                upperBound = parseInt(upperBound);
                numChildren = parseInt(numChildren);
                children = generateChildArray(lowerBound, upperBound, numChildren);
            }
            else{
                lowerBound = '';
                upperBound = '';
                numChildren = '';
                children = null;
            }
            const factory = new Factory({
                name,
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
        if(type==='name'){
            try{
                const {name} = req.body;
                const factory = await Factory.findOneAndUpdate({_id: id}, {$set:{name}}, {new: true});
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
                lowerBound = parseInt(lowerBound);
                upperBound = parseInt(upperBound);
                numChildren = parseInt(numChildren);
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