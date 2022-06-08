const room = sessionStorage.getItem("roomId");

window.onload = async function() {
    let userInfo = await getUserInfo();
    document.getElementById("username").innerHTML = userInfo.player_name;
    if (!room) {
        alert("No match choosen!");
        window.location="rooms.html";
    }
}