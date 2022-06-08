async function loginPlayer() {
    try {
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let result = await login(name, password);
        if (result.logged) {
            window.location = "rooms.html"
        } else {
            document.getElementById("result").innerHTML = "Incorrect username or password";
        }
    } catch (err) {
        console.log(err)
    }
}