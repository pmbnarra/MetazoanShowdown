

class Card {
    static images = {};
    constructor(img,id, name, hp, dmg, spd, x, y) {
       // this.card_id = card_id;
        this.img = img
        this.id = id
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
        this.spd = spd; 
        this.x = x;
        this.y = y;
      //  this.enabled = true;
      //  this.attacked = attacked;
      //  this.selected = false;
    }
    draw() {

        image(this.img, this.x, this.y,this.img.width/3,img.height/3);
        text(this.name,30+this.x,55+this.y);
        text(this.hp,60+this.x,80+this.y);
        text(this.dmg,60+this.x,95+this.y);
        text(this.spd,60+this.x,110+this.y);
        
    }
  //  getId() { return this.card_id;}
    
    getHp() { return this.hp; }
    setHp(hp) { this.hp = hp }
    getDmg() { return this.dmg; }
    setHp(dmg) { this.dmg = dmg }
    getId() { return this.id; }
    /*
    enable() { this.enabled = true }
    disable() { this.enabled = false }
    
    isSelected() { return this.selected; }
    deselect() {this.selected = false;}
*/
    async clicked(x, y) {
      
            if (this.x <= x && (this.x + 78) >= x &&
                this.y <= y && (this.y + 113) >= y) {
              //  this.selected = !this.selected;
                //return this.id;
              let player1 = await getUserInfo();
              await switchPlayerCards(player1.player_id,this.id)  
              //  return this.id;
                switchcards = false
                await endPlayerTurn()
                let decked = await getDeckedCards(player1.player_id);
                if (decked.count > 0){
                drawcard = await drawPlayerCard(player1.player_id);
                }
            }
        return false
        //return console.log('joe');
    }

}