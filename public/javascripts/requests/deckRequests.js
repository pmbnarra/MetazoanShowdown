async function clearDeck(player_id) {
    try {
        const response = await fetch(`/api/deck/${player_id}/clear`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({player_id:player_id}) 
        });
        var  result= await response.json();
        return {deck: response.status==200 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function createDeck(player_id, pcCardId) {
    try {
        const response = await fetch(`/api/deck/${player_id}/deck1`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({player_id:player_id, pcCardId: pcCardId}) 
        });
        var  result= await response.json();
        return {deck: response.status==200 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function getSelectedCards(cardId,HP,Damage,Speed) {
    try {
        const response = await fetch(`/api/players/${pId}/deck`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ hp: hp, damage: damage, speed: speed}) 
        });
        var  result= await response.json();
        return {logged: response.status==200 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}