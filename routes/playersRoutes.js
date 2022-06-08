var express = require('express');
var router = express.Router();
var pModel = require("../models/playersModel");
var auth = require("../models/authentication");

router.get('/:pId/card', async function(req, res, next) {
  console.log("Get deck for player in a match");
  let pId = req.params.pId;
 // let pmId = req.params.pmId;
  let result = await pModel.getPlayerCards(pId);
  res.status(result.status).send(result.result);
});

router.get('/:pId/card/alive', async function(req, res, next) {
  console.log("Get alive cards for a player in a match");
  let pId = req.params.pId;
 // let pmId = req.params.pmId;
  let result = await pModel.aliveCards(pId);
  res.status(result.status).send(result.result);
});

router.get('/:pId/card/decked', async function(req, res, next) {
  console.log("Get alive cards for a player in a match");
  let pId = req.params.pId;
 // let pmId = req.params.pmId;
  let result = await pModel.deckedCards(pId);
  res.status(result.status).send(result.result);
});



router.get('/:pId/card/damage', async function(req, res, next) {
  console.log("Get player damage");
  let pId = req.params.pId;
  let result = await pModel.getDamage(pId);
  res.status(result.status).send(result.result);
});

router.get('/:pId/card/active', async function(req, res, next) {
  console.log("Get active cards for a player in a match");
  let pId = req.params.pId;
 // let pmId = req.params.pmId;
  let result = await pModel.activeCards(pId);
  res.status(result.status).send(result.result);
});

router.post('/register', async function(req, res, next) {
  console.log("Register");
  let name = req.body.name;
  let password = req.body.password;
  let result = await pModel.registerUser(name,password);
  res.status(result.status).send(result.result);
});

router.post('/login', async function(req, res, next) {
  console.log("Login")
  let name = req.body.name;
  let password = req.body.password;
  let result = await pModel.loginCheck(name,password);
  if (result.status == 200) {
      auth.saveUserId(res,result.result.userId);
      res.status(result.status).send({msg:"User logged in"});
  } else  res.status(result.status).send(result.result);
});

router.post('/logout', auth.checkAuthentication, async function(req, res, next) {
  console.log("Logout")
  auth.logout(res);    
  res.status(200).send({msg:"User logged out"});
});

router.get('/profile/1', auth.checkAuthentication, async function(req, res, next) {
  console.log("Get profile of logged user ");
  let result = await pModel.getLoggedUserInfo(req.userId);
  res.status(result.status).send(result.result);
});

router.get('/profile/2', auth.checkAuthentication, async function(req, res, next) {
  console.log("Get profile of logged user ");
  let result = await pModel.getOpponentLoggedUserInfo(req.userId);
  console.log(result)
  res.status(result.status).send(result.result);
});

router.get('/turns', async function(req, res, next) {
  console.log("Get all cards")
  let result = await pModel.endTurn();
  res.status(result.status).send(result.result);
});
/*
router.get('/turns/number', async function(req, res, next) {
  console.log("Get all cards")
  let result = await pModel.turnNum();
  res.status(result.status).send(result.result);
});
*/
module.exports = router;
