window.onload = async function() {
  let userInfo = await getUserInfo();
  document.getElementById("username").innerHTML = userInfo.player_name;  
  //console.log(userInfo)
}

let img; // Declare variable 'img'.
var cardImgIds=[];
let cards;
let x = 50;
let y = 40;
let button;
let checkbox=cardImgIds; 
let cardImgs = {};
let checkCounter = 0 //Checkbox I
var checkboxIdNum = []
let player;
//var i = [];

async function setup() {
    var canvas = createCanvas(1500, 700);
    canvas.parent('deck');
    cards = await getCards();

    player = await getUserInfo();

    //Checkboxes 
    checkbox1 = createCheckbox('Selected 1', false);
    checkbox1.class = ("box")
    checkbox1.position (190,480)
    checkbox1.changed(Select1);

    checkbox2 = createCheckbox('Selected 2', false);
    checkbox2.position (340,480)
    checkbox2.changed(Select2);

    checkbox3 = createCheckbox('Selected 3', false);
    checkbox3.position (490,480)
    checkbox3.changed(Select3);

    checkbox4 = createCheckbox('Selected 4', false);
    checkbox4.position (640,480)
    checkbox4.changed(Select4);

    checkbox5 = createCheckbox('Selected 5', false);
    checkbox5.position (790,480)
    checkbox5.changed(Select5);

    checkbox6 = createCheckbox('Selected 6', false);
    checkbox6.position (940,480)
    checkbox6.changed(Select6);

    checkbox7 = createCheckbox('Selected 7', false);
    checkbox7.position (1090,480)
    checkbox7.changed(Select7);

    checkbox8 = createCheckbox('Selected 8', false);
    checkbox8.position (1240,480)
    checkbox8.changed(Select8);

    checkbox9 = createCheckbox('Selected 9', false);
    checkbox9.position (1390,480)
    checkbox9.changed(Select9);

    checkbox10 = createCheckbox('Selected 10', false);
    checkbox10.position (190,730)
    checkbox10.changed(Select10);

    checkbox11 = createCheckbox('Selected 11', false);
    checkbox11.position (340,730)
    checkbox11.changed(Select11);

    checkbox12 = createCheckbox('Selected 12', false);
    checkbox12.position (490,730)
    checkbox12.changed(Select12);

    checkbox13 = createCheckbox('Selected 13', false);
    checkbox13.position (640,730)
    checkbox13.changed(Select13);

    checkbox14 = createCheckbox('Selected 14', false);
    checkbox14.position (790,730)
    checkbox14.changed(Select14);

    checkbox15 = createCheckbox('Selected 15', false);
    checkbox15.position (940,730)
    checkbox15.changed(Select15);
    //img = loadImage('assets/Creature_Card.png'); // Load the image
    
    //test
  //let cardImgs = {}
  
  for (let card of cards) {
    let cardImgId = card.card_id;
    cardImgIds.push(cardImgId);
    cardImgs[cardImgId] = await loadImage('./assets/Creature_Card_'+cardImgId+'.png');
    console.log(cards)
    //Checkbox creation
    //checkbox[checkCounter] = createCheckbox('Select Card '+cardImgId, false);
    //checkbox[checkCounter].changed(Select);
    //checkbox[checkCounter].position(100*cardImgId, 490);
    checkCounter++  
    
}


    button = createButton('Update Deck');
    button.position(790, 850);
    button.mousePressed(UpdateCheck);
}

async function draw() {
    clear(); //Working Alpha modifier
    background(128,128,128,180); // 0-255 RGBA
    textSize(20)
    
    for (i = 0;i < cards.length ;i++) {
      //image(cardImgs[cards[i].card_id], 50+150*i+x, 80+y,cardImgs.width/2,cardImgs.height/2);
      if (i >= 9) {
      i.push
      image(cardImgs[cards[i].card_id], 50+150*(i-9)+x, 330+y,cardImgs.width/2,cardImgs.height/2);
      text(cards[i].card_hp,140+150*(i-9)+x,435+y,70,50);
      text(cards[i].card_damage,140+150*(i-9)+x,458+y,70,50);
      text(cards[i].card_speed,140+150*(i-9)+x,480+y,70,50);
      //checkbox[i].position(150*(i-9)+ 200, 730);
    } else {
      //console.log(cardImgs)
      //text(cards[i].card_name,90+150*i+x,135+y,70,50);
      image(cardImgs[cards[i].card_id], 50+150*i+x, 80+y,cardImgs.width/2,cardImgs.height/2);
      text(cards[i].card_hp,140+150*i+x,187+y,70,50);
      text(cards[i].card_damage,140+150*i+x,210+y,70,50);
      text(cards[i].card_speed,140+150*i+x,230+y,70,50);
      //checkbox[i].position(150*i + 200, 480);
      //if (cards[i].card_description) text(cards[i].card_description,70+150*i+x,155+y,70,50);
    }
    }
  //console.log(cards)
}

let count = 0;

async function CardLimit(){
    //console.log(count)
if (checkboxIdNum.length != 7) {
    alert("Please select 7 cards.")
}
else if (checkboxIdNum.length = 7){
  await DropDeck()
  await CreatingDeck()
//window.location.reload();
}
else{}
}
/*
function Select1() {
    if (this.checked()) {
      console.log("bruh")
      //GET CHECKBOX ID WE NEED IT
        count++;

        //console.log('Checking! +1');
    } else {
      //console.log('Unchecking! -1');
      count--;
      
    }
    //console.log(count)
  }
*/

//Remove specific card from the array 
//https://stackabuse.com/remove-element-from-an-array-in-javascript/
function removeElement(array, elem) { //remove the selected element from array from the selected array
  var index = array.indexOf(elem); //checks what's the elements array
  if (index > -1) { //checks if index exists
      array.splice(index, 1); //removes one element starting on the selected array
  }
}

  function Select1(i) {
    if (checkbox1.checked()) {
      checkboxIdNum.push(1)
      localStorage.setItem('checked','true');
      console.log(checkboxIdNum[i])
      } else {
        //( checkboxIdNum[i] === 0) 
    
          //checkboxIdNum.splice(i, 1); 
          removeElement(checkboxIdNum, 1);
          localStorage.setItem('checked','false');
          console.log(checkboxIdNum)
      
    }
}

function Select2(i) {
  if (checkbox2.checked()) {
    checkboxIdNum.push(2)
    console.log(checkboxIdNum[i])
    } else {
      //( checkboxIdNum[i] === 0) 
  
        //checkboxIdNum.splice(i, 1); 
        removeElement(checkboxIdNum, 2);
        console.log(checkboxIdNum)
    
  }
}

function Select3(i) {
  if (checkbox3.checked()) {
    checkboxIdNum.push(3)
    console.log(checkboxIdNum[i])
    } else {
      //( checkboxIdNum[i] === 0) 
  
        //checkboxIdNum.splice(i, 1); 
        removeElement(checkboxIdNum, 3);
        console.log(checkboxIdNum)
    
  }
}

function Select4(i) {
  if (checkbox4.checked()) {
    checkboxIdNum.push(4)
    console.log(checkboxIdNum[i])
    } else {
      //( checkboxIdNum[i] === 0) 
  
        //checkboxIdNum.splice(i, 1); 
        removeElement(checkboxIdNum, 4);
        console.log(checkboxIdNum)
    
  }
}

function Select5(i) {
  if (checkbox5.checked()) {
    checkboxIdNum.push(5)
    console.log(checkboxIdNum[i])
    } else {
      //( checkboxIdNum[i] === 0) 
  
        //checkboxIdNum.splice(i, 1); 
        removeElement(checkboxIdNum, 5);
        console.log(checkboxIdNum)
    
  }
}

function Select6(i) {
  if (checkbox6.checked()) {
    checkboxIdNum.push(6)
    console.log(checkboxIdNum[i])
    } else {
      //( checkboxIdNum[i] === 0) 
  
        //checkboxIdNum.splice(i, 1); 
        removeElement(checkboxIdNum, 6);
        console.log(checkboxIdNum)
    
  }
}

function Select7(i) {
  if (checkbox7.checked()) {
    checkboxIdNum.push(7)
    console.log(checkboxIdNum[i])
    } else {
      //( checkboxIdNum[i] === 0) 
  
        //checkboxIdNum.splice(i, 1); 
        removeElement(checkboxIdNum, 7);
        console.log(checkboxIdNum)
    
  }
}

function Select8(i) {
  if (checkbox8.checked()) {
    checkboxIdNum.push(8)
    console.log(checkboxIdNum[i])
    } else {
      //( checkboxIdNum[i] === 0) 
  
        //checkboxIdNum.splice(i, 1); 
        removeElement(checkboxIdNum, 8);
        console.log(checkboxIdNum)
    
  }
}

function Select9(i) {
  if (checkbox9.checked()) {
    checkboxIdNum.push(9)
    console.log(checkboxIdNum[i])
    } else {
      //( checkboxIdNum[i] === 0) 
  
        //checkboxIdNum.splice(i, 1); 
        removeElement(checkboxIdNum, 9);
        console.log(checkboxIdNum)
    
  }
}

function Select10(i) {
  if (checkbox10.checked()) {
    checkboxIdNum.push(10)
    console.log(checkboxIdNum[i])
    } else {
      //( checkboxIdNum[i] === 0) 
  
        //checkboxIdNum.splice(i, 1); 
        removeElement(checkboxIdNum, 10);
        console.log(checkboxIdNum)
    
  }
}

function Select11(i) {
  if (checkbox11.checked()) {
    checkboxIdNum.push(11)
    console.log(checkboxIdNum[i])
    } else {
      //( checkboxIdNum[i] === 0) 
  
        //checkboxIdNum.splice(i, 1); 
        removeElement(checkboxIdNum, 11);
        console.log(checkboxIdNum)
    
  }
}

function Select12(i) {
  if (checkbox12.checked()) {
    checkboxIdNum.push(12)
    console.log(checkboxIdNum[i])
    } else {
      //( checkboxIdNum[i] === 0) 
  
        //checkboxIdNum.splice(i, 1); 
        removeElement(checkboxIdNum, 12);
        console.log(checkboxIdNum)
    
  }
}

function Select13(i) {
  if (checkbox13.checked()) {
    checkboxIdNum.push(13)
    console.log(checkboxIdNum[i])
    } else {
      //( checkboxIdNum[i] === 0) 
  
        //checkboxIdNum.splice(i, 1); 
        removeElement(checkboxIdNum, 13);
        console.log(checkboxIdNum)
    
  }
}

function Select14(i) {
  if (checkbox14.checked()) {
    checkboxIdNum.push(14)
    console.log(checkboxIdNum[i])
    } else {
      //( checkboxIdNum[i] === 0) 
  
        //checkboxIdNum.splice(i, 1); 
        removeElement(checkboxIdNum, 14);
        console.log(checkboxIdNum)
    
  }
}

function Select15(i) {
  if (checkbox15.checked()) {
    checkboxIdNum.push(15)
    console.log(checkboxIdNum[i])
    } else {
      //( checkboxIdNum[i] === 0) 
  
        //checkboxIdNum.splice(i, 1); 
        removeElement(checkboxIdNum, 15);
        console.log(checkboxIdNum)
    
  }
}

  function UpdateCheck() {
    //  for (var i = 0;i < cards.length ;i++)
     //     cards[0].card_state = 1
     //     cards[1].card_state = 2
      //    console.log(cards)
      CardLimit()
    }

    async function DropDeck()
    {
     
      player = await getUserInfo();
      await clearDeck(player.player_id);
      console.log("AHHHHHHHH")  
      
    }

    async function CreatingDeck()
    {
     for (let deckCard of checkboxIdNum){
      player = await getUserInfo();
      await createDeck(player.player_id, deckCard);
      console.log("AHHHHHHHH")  
    }
    }

  