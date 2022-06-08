window.onload = async function() {
    let userInfo = await getUserInfo();
    document.getElementById("username").innerHTML = userInfo.player_name;   
    await fillRooms();
    //console.log(userInfo)
}

async function fillRooms() {
    try {
        let rooms = await getRooms();
        let html = "";
        for(let room of rooms) {
            html+=`<section onclick= openRoom(${room.room_id})>
                      <h3>‏‏‎ ‏‏‎ ‎‎Room ${room.room_id} ‏‏‎ ‎‏‏‎ ‎<br>   </h3> <br>
                   </section>`
        }
        document.getElementById("rooms").innerHTML = html;
    } catch (err) {
        console.log(err);
    }
}

async function openRoom(id) {
    sessionStorage.setItem("roomId",id);
    player1 = await getUserInfo();
    let result = await joinPlayerRooms(player1.player_id,id);
    if (result.success) {
        window.location = "game.html"
    } else {
        document.getElementById("result").innerHTML = "Incorrect username or password";
    }

}

async function roomCreate(){
    player1 = await getUserInfo();
    await createPlayerRooms(player1.player_id);
    window.location = "game.html"
}