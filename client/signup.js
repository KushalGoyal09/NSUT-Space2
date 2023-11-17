// Password strength validation
const passwordField = document.getElementById("password");
const passwordStrengthMeter = document.getElementById("password-strength-meter");
const passwordStrengthText = document.getElementById("password-strength-text");
const passwordStrengthLabel = document.getElementById("password-strength-label");

passwordField.addEventListener("input", function () {
    const password = passwordField.value;
    const strength = calculatePasswordStrength(password);
    passwordStrengthMeter.value = strength;
    updatePasswordStrengthLabel(strength);
});

function calculatePasswordStrength(password) {
    const criteria = [
        { pattern: /[A-Z]/, weight: 20 },
        { pattern: /[a-z]/, weight: 20 },
        { pattern: /\d/, weight: 20 },
        { pattern: /[!@#\$%\^&\*()_+{}\[\]:;<>,.?~\\-]/, weight: 20 },
        { pattern: /.{8,}/, weight: 20 },
    ];

    let score = 0;

    criteria.forEach((criterion) => {
        if (criterion.pattern.test(password)) {
            score += criterion.weight;
        }
    });

    score = Math.min(100, score);

    return score;
}


function updatePasswordStrengthLabel(strength) {
    if (strength < 30) {
        passwordStrengthLabel.textContent = "Weak";
        passwordStrengthLabel.style.color = "red";
    } else if (strength < 60) {
        passwordStrengthLabel.textContent = "Medium";
        passwordStrengthLabel.style.color = "orange";
    } else if (strength < 90) {
        passwordStrengthLabel.textContent = "Strong";
        passwordStrengthLabel.style.color = "green";
    } else {
        passwordStrengthLabel.textContent = "Very Strong";
        passwordStrengthLabel.style.color = "darkgreen";
    }
}

function validateNSUTemail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        if (email.endsWith('@nsut.ac.in')) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// on form submission

const form = document.getElementById('login-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const error = document.getElementById('error');
const message = document.getElementById('message')

form.addEventListener('submit', async (event) => {
    error.textContent = ""
    event.preventDefault();
    const passwordValue = password.value;
    const usernameValue = username.value;
    const emailValue = email.value;
    if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue))) {
        error.textContent = "Invalid email pattern";
        return false;
    }
    if (!validateNSUTemail(emailValue)) {
        error.textContent = `You can sign-up using your NSUT email only`;
        return false;
    }
    if (passwordValue.length < 8) {
        error.textContent = "Password must be 8 character long";
        return false;
    }
    try {
        const { data } = await axios.post('http://localhost:5000/signup', { username: usernameValue, password: passwordValue, email: emailValue });
        const response = data;
        if (response.success) {
            message.innerText = "Sussesfully Registered\nRedirecting to the home page"
            localStorage.setItem('userid', response.person._id);
            localStorage.setItem('username', response.person.username);
            setTimeout(function () {
                window.location.href = "./home.html";
            }, 2000);
        } else {
            throw response;
        }
    } catch (err) {
        const errorResponse = err.response.data.error;
        if (errorResponse.keyPattern) {
            if (errorResponse.keyPattern.username === 1) {
                error.textContent = "Username is already taken";
            } else if (errorResponse.keyPattern.email === 1) {
                error.textContent = "Email already registered"
            } else {
                error.textContent = "Invalid details"
            }
            return false;
        }
    }
})