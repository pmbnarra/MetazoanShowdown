//Get a room 

async function getPlayer_Room(player_id) {
    try {
        const response = await fetch(`/api/rooms/all/${player_id}`);
        if (response.status == 200) {
           var room = await response.json();
           return room;
           
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
    
}  

async function getRoom(roomId) {
    try {
        const response = await fetch(`/api/rooms/${roomId}`);
        if (response.status == 200) {
           var room = await response.json();
           return room;
           
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
    
}  

async function getRooms() {
    try {
        const response = await fetch(`/api/rooms`);
        if (response.status == 200) {
           var rooms = await response.json();
           return rooms;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function createPlayerRooms(player_id) {
    try {
        const response = await fetch(`/api/rooms/create/${player_id}`);
        if (response.status == 200) {
           var rooms = await response.json();
           return rooms;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function joinPlayerRooms(player_id, room_id) {
    try {
       
        const response = await fetch(`/api/rooms/${room_id}/join`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ player_id: player_id, room_id: room_id })
        });
        var result = await response.json();
        console.log(response);
        return { success: response.status == 200, result: result };
        
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}