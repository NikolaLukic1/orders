const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get partner
router.get('/', async (req,res) => {
    const data = await loadPartnersCollection();
    res.socket.setNoDelay();
    res.send(await data.find({}).toArray());
});

//insert partner
router.post('/', async(req,res) => {
    const data = await loadPartnersCollection();
    console.log(req.body);
    await data.insertOne(
        req.body
    );
    res.status(201).send();
});

router.delete('/:id', async(req,res) => {
    const data = await loadPartnersCollection();
    await data.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPartnersCollection() {
    const uri = 'mongodb+srv://nikola:Thenikgame93@cluster0-b924k.mongodb.net/test?retryWrites=true&w=majority'
    const dbName = 'orders'
    //'mongodb://localhost/podaci'
    //'mongodb+srv://nikola:Thenikgame93@cluster0-b924k.mongodb.net/test?retryWrites=true&w=majority'

    const client = await mongodb.MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const data = client.db(dbName).collection('partner');

    return data;
}
module.exports = router;
