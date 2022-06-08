async function logoutUser() {
    try {
        let result = await logout();
        window.location = "index.html"
    } catch (err) {
        console.log(err);
    }
}

async function getUserInfo() {
    try {
        let result = await requestUserInfo();
        if (result.logged) {
           return result.result;
        } else {
            alert ("You are not logged in\nRedirecting back to login page");
            window.location = "index.html"
        }
    } catch(err) {
        console.log(err);
    }
}

async function getOpponentUserInfo() {
    try {
        let result = await requestOpponentUserInfo();
        if (result.logged) {
           return result.result;
        } else {
            alert ("You are not logged in\nRedirecting back to login page");
            window.location = "index.html"
        }
    } catch(err) {
        console.log(err);
    }
}

