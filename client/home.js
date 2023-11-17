const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const postBtn = document.getElementById('post-btn');
const avatar = document.getElementById('avatar');
let scrollTop = 0;

loginBtn.addEventListener('click', () => {
    window.location.href = './login.html';
})

signupBtn.addEventListener('click', () => {
    window.location.href = './signup.html';
})

postBtn.addEventListener('click', () => {
    window.open('./post.html', "_blank");
})

const userid = localStorage.getItem('userid');
const username = localStorage.getItem('username');

if (userid) {
    avatar.style.display = "block";
    postBtn.style.display = "block";
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
} else {
    avatar.style.display = "none";
    postBtn.style.display = "none";
    loginBtn.style.display = "block";
    signupBtn.style.display = "block";
}

// loading tweets

const loader = document.getElementById('loader');

const tweetContainer = document.getElementById('tweet-container');

let tweetHtml = "";
const render = async () => {
    try {
        const { data } = await axios.get('http://localhost:5000/home');
        const tweets = data;
        tweets.forEach(tweet => {
            tweetHtml += `
        <div class="tweet" key=${tweet._id}>
        <div class="user-info">
            <img class="user-img" src="static/user.png" alt="User Avatar">
            <span class="user-name">${tweet.username}</span>
        </div>
        <div class="tweet-text">
            ${tweet.text.replace(/\n/g, "<br>").replace(/  /g, "&nbsp;&nbsp;")}
        </div>
        <div class="interaction-buttons">
            <div class="interaction-button">
                <i class="fa-regular fa-heart like-btn" style="color: #FF69B4" onclick="manageLike('${tweet._id}')"></i>
                <span class="interaction-count"><span class="like-count">${tweet.likes}</span> Likes</span>
            </div>
            <div class="interaction-button">
                <div class="icon-comment"></div>
                <span class="interaction-count">${tweet.comments.length} Comments</span>
            </div>
        </div>
    </div>`
        });
        loader.style.display = "none";
        tweetContainer.innerHTML = tweetHtml;
        const tweetsDiv = document.querySelectorAll('.tweet');
        // single 
        tweetsDiv.forEach(tweet => {
            tweet.addEventListener('click', (event) => {
                if (event.target === tweet || event.target.classList.contains('tweet-text')) {
                    showSingleTweet(tweet.getAttribute('key'))
                }
            });
            tweet.addEventListener('mouseover', (event) => {
                if (event.target == tweet || event.target.classList.contains('tweet-text')) {
                    tweet.style.cursor = "pointer";
                } else {
                    tweet.style.cursor = "default";
                }
            })
        });
    } catch (error) {
        console.log(error);
    }
}

render();

const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const popupText = document.getElementById('popupText');

closePopup.addEventListener('click', () => {
    popup.style.display = "none";
})

const manageLike = async (tweetid) => {
    if (!userid) {
        popup.style.display = "block";
        popupText.innerHTML = `Login first to like a tweet <br> Click <a id="login-link" href="./login.html">here</a> to log in`
        return;
    }
    const tweet = document.querySelector(`[key="${tweetid}"]`);
    const like = tweet.querySelector('.like-btn');
    const likeCount = tweet.querySelector('.like-count');
    try {
        const { data } = await axios.post(`http://localhost:5000/home/${tweetid}/like`, { userid });
        if (data.likes === 1) {
            like.classList.add("fa-solid")
            like.classList.remove("fa-regular");
            likeCount.textContent++;
        } else {
            like.classList.remove("fa-solid")
            like.classList.add("fa-regular");
            likeCount.textContent--;
        }
    } catch (error) {
        popup.style.display = "block";
        popupText.innerHTML = `An unexpected error occured`;
    }
}

const likesByTheUser = () => {
    // manage the color of like button
    // we need to cange the tweet model 
    // add likes by the username
}


// single tweet

const singleTweetContainer = document.getElementById('single-tweet-container');

const showSingleTweet = async (key) => {
    scrollTop = window.scrollY;
    tweetContainer.style.display = "none";
    singleTweetContainer.style.display = "block";
    const { data } = await axios.get(`http://localhost:5000/home/${key}`);
    const tweet = data.tweet;
    const comments = data.comments;
    singleTweetContainer.innerHTML = `
        <div class="back">
            <i class="fa-solid fa-arrow-left" style="color: #183153;" id="back-btn"></i>
            <span>Post</span>
        </div>
        <div class="tweet" key="${tweet._id}">
            <div class="user-info">
                <img class="user-img" src="static/user.png" alt="User Avatar">
                <span class="user-name">${tweet.username}</span>
            </div>
            <div class="tweet-text">
                ${tweet.text.replace(/\n/g, "<br>").replace(/  /g, "&nbsp;&nbsp;")}
            </div>
            <div class="interaction-buttons">
                <div class="interaction-button">
                    <i class="fa-regular fa-heart like-btn" style="color: #FF69B4" onclick="manageLike('${key}')"></i>
                    <span class="interaction-count"><span class="like-count">${tweet.likes}</span> Likes</span>
                </div>
                <div class="interaction-button">
                    <div class="icon-comment"></div>
                    <span class="interaction-count">${tweet.comments.length} Comments</span>
                </div>
            </div>
        </div> 
        <div class="comments-container" id="comment-box">
            <div class="comment" id="user-comment">
                <div class="user-avatar">
                    <img src="static/user.png" alt="User Avatar">
                </div>
                <div class="comment-content">
                    <textarea type="text" placeholder="Write a comment..." id="comment-input"></textarea>
                    <button class="comment-btn" id="comment-btn">Comment</button>
                </div>
            </div>
        </div>
    `;
    const commentBox = document.getElementById('comment-box');
    let commentBoxHTML = "";
    comments.forEach(comment => {
        commentBoxHTML += `
            <div class="comment">
                <div class="user-avatar">
                    <img src="static/user.png" alt="User Avatar">
                </div>
                <div class="comment-content">
                    <p class="comment-username">${comment.author}:</p>
                    <p class="comment-text">${comment.text.replace(/\n/g, "<br>").replace(/  /g, "&nbsp;&nbsp;")}</p>
                </div>            
            </div>
        `
    });
    commentBox.innerHTML += commentBoxHTML;
    const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', () => {
        tweetContainer.style.display = "block";
        singleTweetContainer.style.display = "none";
        singleTweetContainer.innerHTML = "";
        window.scrollBy(0, scrollTop);
    })

    const commentBtn = document.getElementById('comment-btn');
    const commentInput = document.getElementById('comment-input');
    commentBtn.addEventListener('click', async () => {
        if (!commentInput.value.trim()) {
            popup.style.display = "block";
            popupText.innerHTML = `Can not post a empty comment`
            return;
        }
        if (!userid) {
            popup.style.display = "block";
            popupText.innerHTML = `Login first to comment <br> Click <a id="login-link" href="./login.html">here</a> to log in`
            return;
        }
        const { data } = await axios.post(`http://localhost:5000/home/${key}/comment`, { userid, username, text: commentInput.value });
        commentInput.value = "";
        const comment = data.comment;
        const newComment = document.createElement('div');
        newComment.classList.add("comment");
        newComment.innerHTML = `
        <div class="user-avatar">
            <img src="static/user.png" alt="User Avatar">
        </div>
        <div class="comment-content">
            <p class="comment-username">${comment.author}:</p>
            <p class="comment-text">${comment.text.replace(/\n/g, "<br>").replace(/  /g, "&nbsp;&nbsp;")}</p>
        </div>
        `
        const userComment = document.getElementById('user-comment');
        commentBox.insertBefore(newComment, userComment.nextSibling);
    })
}

// drop-down

const userImg = document.querySelector('#avatar img');
const dropdown = document.getElementById('user-dropdown');

userImg.addEventListener('click', () => {
    dropdown.classList.toggle('show');
})

dropdown.querySelector('li').textContent = username;

const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})