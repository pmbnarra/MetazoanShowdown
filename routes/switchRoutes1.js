var express = require('express');
var router = express.Router();
var sModel = require("../models/switchModel1");
 
/*
router.post('/player_id', async function(req, res, next) {
    console.log("Attack")
    let player_id = req.body.player_id
    let result = await cModel.attackCards(player_id);
    res.status(result.status).send(result.result);
});*/

router.post('/:pId/selectedcards/switch', async function (req, res, next) {
    console.log("Switch")
    let pId = req.body.player_id
    let selectedcards = req.body.switching
    let result = await sModel.Switchcards(pId, selectedcards);
    res.status(result.status).send(result.result);
});

module.exports = router;