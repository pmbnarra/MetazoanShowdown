async function getPlayerCards(pId) {
    try {
        const response = await fetch(`/api/players/${pId}/card`);
        var result = await response.json();
       
        return result;
    } catch (err) {
      
        console.log(err);
    }
}

async function getAliveCards(pId) {
    try {
        const response = await fetch(`/api/players/${pId}/card/alive`);
        var result = await response.json();
        
        return result;
    } catch (err) {
        
        console.log(err);
    }
}

async function getDeckedCards(pId) {
    try {
        const response = await fetch(`/api/players/${pId}/card/decked`);
        var result = await response.json();
        
        return result;
    } catch (err) {
        
        console.log(err);
    }
}



async function getPlayerDamage(pId) {
    try {
        const response = await fetch(`/api/players/${pId}/card/damage`);
        if (response.status == 200) {
           var actions = await response.json();
           return actions;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function getActiveCards(pId) {
    try {
        const response = await fetch(`/api/players/${pId}/card/active`);
        var result = await response.json();
        
        return result;
    } catch (err) {
        
        console.log(err);
    }
}

async function register(name, password) {
    try {
        const response = await fetch(`/api/players/register`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ name: name, password: password}) 
        });
        var result = await response.json();
        // We are not checking for errors (considering the GUI is only allowing correct choices)
        return result;
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function login(name, password) {
    try {
        const response = await fetch(`/api/players/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ name: name, password: password}) 
        });
        var  result= await response.json();
        return {logged: response.status==200 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestUserInfo() {
    try {
        const response = await fetch(`/api/players/profile/1`);
        var result = await response.json();
        return {logged: response.status!=401 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function requestOpponentUserInfo() {
    try {
        const response = await fetch(`/api/players/profile/2`);
        var result = await response.json();
        return {logged: response.status!=401 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
    
}

async function logout() {
    try {
        const response = await fetch(`/api/players/logout`,
        {
            method: "POST",
        });
        var  result= await response.json();
        return {success: response.status==200 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function endPlayerTurn() {
    try {
        const response = await fetch(`/api/players/turns`);
        if (response.status == 200) {
           var turn = await response.json();
           return turn;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

/*
async function turnNumber() {
    try {
        const response = await fetch(`/api/players/turns/number`);
        if (response.status == 200) {
           var turn = await response.json();
           return turn;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}*/