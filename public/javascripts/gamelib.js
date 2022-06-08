var img,img2; // Declare variable 'img'.
var cards;
var x = 90;
var y = 200;
let i = 0;
let button1, button2;
let player1;
let player2;
let drawcard;
let makeactive;
let activecard;
let turn;
let roomturn;
let hp;
var wins = false;
var loses = false;
var switchcards = false
//let myCards;

var hand = [];
var active = [];
var inactive = [];
var opactive = [];
var opinactive = [];

async function setup() {
    var canvas = createCanvas(1500, 800);
    canvas.parent('game');
        
    img = loadImage('assets/Creature_Card.png');
    img2 = loadImage('assets/Creature_Card2.png'); // Load the image
    window.setInterval(refresh,2000);

    button1 = createButton('End Game');
    button1.position(1500, 650);
    button1.mousePressed(quitgame);
    button2 = createButton('Attack');
    button2.position(1500, 550);
    button2.mousePressed(attack);
    player1 = await getUserInfo();
    activecard = await getActiveCards(player1.player_id)
 //   if(activecard === 0){
        makeactive = await makeCardActive(player1.player_id)
  //  }
    
    drawcard = await drawPlayerCard(player1.player_id);
    drawcard = await drawPlayerCard(player1.player_id);
    
}

async function loadCards() {
    player1 = await getUserInfo();
    player2 = await getOpponentUserInfo();
    let myCards = await getPlayerCards(player1.player_id);
    let opCards = await getPlayerCards(player2.player_id);
    let lose = await getAliveCards(player1.player_id);
    let win = await getAliveCards(player2.player_id);
    
    if (lose.count === 0){
        //clearInterval(refresh)
        loses = true;
        button2.hide();
        button1.hide();
        await resetGame(player1.player_id);
        window.location = "rooms.html"
       // switchButton[i].hide();
    } else loses = false;
    if (win.count === 0){
        //clearInterval(refresh)
        wins = true;
        button2.hide();
        button1.hide();
        await resetGame(player1.player_id);
        window.location = "rooms.html"
       // switchButton[i].hide();
    } else wins = false;
    console.log(loses)
    console.log(wins)
  //  console.log(player1);
   // console.log(player2.player_id);
   hp = await getPlayerDamage(player1.player_id);
    console.log(hp.playercard_hp)
    if (hp.playercard_hp <= 0){
        await deadPlayerCard(player1.player_id);
        if(wins || loses){
        await makeCardActive(player1.player_id) ;
        }
    }
    
    let handPos = 0;
    hand = [];
    active = [];
    let inactivePos = 0;
    inactive = [];
    let opPos = 0;
    opactive = [];
    opinactive = [];
    //switchButton = [];
    for (let card of myCards) {
        if (card.playercard_cardstate === 2) {
            hand.push(new Card(img, card.playercard_card, card.card_name,card.playercard_hp,card.playercard_damage, card.playercard_speed, 600 + 100* handPos,650));
            handPos++;
            /*switchButton[i] = createButton('Switch');
            switchButton[i].position(600 + 100 * handPos, 800);
            switchButton[i].mousePressed(switchPlayerCard);
            switchButton++;*/

        } else if (card.playercard_cardstate === 3) {
            active.push(new Card(img, card.playercard_card, card.card_name,card.playercard_hp,card.playercard_damage, card.playercard_speed, 600,350));
            
        } else if (card.playercard_cardstate === 4){
            inactive.push(new Card(img, card.playercard_card, card.card_name,card.playercard_hp,card.playercard_damage, card.playercard_speed, 600 + 100*inactivePos,500));
            inactivePos++;
            /*switchButton[i] = createButton('Switch');
            switchButton[i].position(600 + 100 * handPos, 950);
            switchButton[i].mousePressed(switchPlayerCard);
            switchButton++;*/
        }
    }
    for (let card of opCards) {
        if (card.playercard_cardstate === 3) {
            opactive.push(new Card(img2, card.playercard_card, card.card_name,card.playercard_hp,card.playercard_damage, card.playercard_speed, 600 + 100*opPos,200));
            opPos;
        } else if (card.playercard_cardstate === 4) {
            opinactive.push(new Card(img2, card.playercard_card, card.card_name,card.playercard_hp,card.playercard_damage, card.playercard_speed, 600 + 100*opPos,50));
            opPos++;
        }
    }
    
}

async function attack() {
    player1 = await getUserInfo();
    player2 = await getOpponentUserInfo();
    
   
    await attackOpponentCard(player1.player_id);
    decked = await getDeckedCards(player1.player_id);
    if (decked.count > 0){
    drawcard = await drawPlayerCard(player1.player_id);
    }
    
    await endPlayerTurn()
}

async function quitgame() {
    player1 = await getUserInfo();
    switchcards = true;
    await endPlayerTurn();
    await resetGame(player1.player_id);
    window.location = "rooms.html"
   // button1.hide();
  //  button2.hide();
   // await endPlayerTurn()
   /*
    if (decked.count > 0){
        await drawPlayerCard(player1.player_id);
    }
    */
   
}
/*
async function switchPlayerCard(){
    await switchOut(player1.player_id, selectedcards);

    await endPlayerTurn()
}*/

function draw() {
 //   if (myCards == undefined)
   //     return;

    clear(); //Working Alpha modifier
    background(128,128,128,180); // 0-255 RGBA
    textSize(12)

    for (let card of hand) card.draw();
    for (let card of active) card.draw();
    for (let card of inactive) card.draw();
    for (let card of opactive) card.draw();
    for (let card of opinactive) card.draw();
    
    if(wins === true){
        text('You Win', 900,550);
    } 
    if (loses === true){
        text('You Lose', 900,550);
    }
    
 //   console.log(wins)
    
//    console.log(loses)
}

async function turns(){
    player1 = await getUserInfo();
    roomturn = await getPlayer_Room(player1.player_id);
    turn = await getRoom(roomturn.room_id);
   // console.log(turn);
    if (turn.room_current_player === player1.player_id){
        button2.show();
        button1.show();
       // switchButton[i].show();
        } else {
        button2.hide();
        button1.hide();
        console.log(turn)
        //switchButton[i].hide();
    }
    console.log(turn.room_current_player)
    console.log(player1.player_id)
}

function refresh(){
    loadCards();
    turns();
}

function mouseClicked(){
    if (switchcards = true){
    for(let card of hand){
        card.clicked(mouseX, mouseY);
        
    }
    for(let card of inactive){
        card.clicked(mouseX, mouseY);
    }
}
}