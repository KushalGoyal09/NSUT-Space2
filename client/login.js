const form = document.getElementById('login-form');
const error = document.getElementById('error');
const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username,password);
    try {
        const response = await axios.post("http://localhost:5000/login", {username,password});
        const person = response.data.user;
        message.innerText = "Sussesfully Registered\nRedirecting to the home page"
        localStorage.setItem('userid',person._id);
        localStorage.setItem('username',person.username);
        setTimeout(function () {
            window.location.href = "./home.html";
        }, 2000);
    } catch (err) {
        if(err.response.status === 404) {
            error.textContent = `No user exist as ${username}`
            return false;
        }
        if(err.response.status === 401) {
            error.textContent = `Password is incorrect`;
            return false;
        }
        error.textContent = `An unexpected error occured`;
        return false;
    }
})