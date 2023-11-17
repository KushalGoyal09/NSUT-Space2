// handling non loged in
const loginAlert = document.getElementById('login-container');
const main = document.getElementById('main');
const usernameElement = document.querySelector('.username')
const userid = localStorage.getItem('userid')
const username = localStorage.getItem('username');

if (userid) {
    loginAlert.style.display = "none";
    main.style.display = "block"
    usernameElement.textContent = username;
} else {
    loginAlert.style.display = "block";
    main.style.display = "none"
}

// post a tweet
const userUsername = document.querySelector('.user-username')
userUsername.textContent = username
const postBtn = document.getElementById('post-btn');
const tweetInput = document.getElementById('tweet-input');
const message = document.getElementById('message');

postBtn.addEventListener('click', async () => {
    const tweetInputValue = tweetInput.value;
    const trimmedTweet = tweetInputValue.trim();
    message.textContent = "";
    if (!trimmedTweet) {
        message.textContent = "Can not post a empty message";
        message.style.color = "red";
        return;
    }       
    try {
        await axios.post("http://localhost:5000/tweet", { user: userid, text: tweetInputValue });
        message.textContent = "Your message has been posted";
        message.style.color = "green";
        tweetInput.value = "";
    } catch (error) {
        message.textContent = "An unexpected error occured";
        message.style.color = "red";
    }
})

const generatePost = document.getElementById('generate-post');

generatePost.addEventListener('click', async () => {
    const tweetInputValue = tweetInput.value;
    const trimmedTweet = tweetInputValue.trim();
    if(!trimmedTweet) {
        return
    }
    try {
        const {data} = await axios.post("http://localhost:5000/tweet/generate", {topic:trimmedTweet})
        tweetInput.value = data.content;
    } catch (error) {
        message.textContent = "An unexpected error occured";
        message.style.color = "red";
    }
})