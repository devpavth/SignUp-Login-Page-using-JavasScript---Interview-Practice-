function validateEmail(email){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password){
    return password.length >= 8;
}

function toggleForm(formType){
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const formTitle = document.getElementById('formTitle');

    if(formType === 'signup'){
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        formTitle.textContent = 'Sign Up';
    }else{
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        formTitle.textContent = 'Login';
    }
}


function handleLogin(){
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginError = document.getElementById('loginError');

    loginError.textContent = '';
    loginError.classList.remove('success');

    if(!email){
        showNotification('Email is required.', 'error');
        return;
    }

    if(!validateEmail(email)){
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    if(!password){
        showNotification('Password is required.', 'error');
        return;
    }

    if(!validatePassword(password)){
        showNotification('Password must be at least 8 characters long.', 'error');
        return;
    }
    
    const storedUser = JSON.parse(localStorage.getItem(email));

    if(!storedUser){
        showNotification('Invalid credentials. Account not found.', 'error');
        return;
    }

    if(storedUser.password !== password){
        showNotification('Invalid credentials. Wrong password.', 'error');
        return;
    }

    console.log('Email:', email);
    console.log('Password:', password);


    showNotification('Login successful!');

    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = ''; 
}

function handleSignup(){
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('reEnterSignupPassword').value;
    const signupError = document.getElementById('signupError');

    signupError.textContent = '';
    signupError.classList.remove('success');

    if(!username){
        showNotification('Username is required.', 'error');
        return;
    }

    if(!email){
        showNotification('Email is required.', 'error');
        return;
    }

    if(!validateEmail(email)){
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    if(!password){
        showNotification('Password is required.', 'error');
        return;
    }

    if(!validatePassword(password)){
        showNotification('Password must be at least 8 characters long.', 'error');
        return;
    }

    if(!confirmPassword){
        showNotification('Please Re-enter your Password.', 'error');
        return;
    }


    if(password !== confirmPassword){
        signupError.textContent = 'Passwords do not match.';
        return;
    }

    const existingUser = JSON.parse(localStorage.getItem(email));
    if(existingUser){
        showNotification('Account already exists with this email.', 'error');
        return;
    }

    const userData = {
        username: username, 
        email: email,
        password: password
    }
    localStorage.setItem(email, JSON.stringify(userData));

    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);


    showNotification('Signup successful!');
    
    document.getElementById('signupUsername').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('reEnterSignupPassword').value = '';

    toggleForm('login');
}


// Function to show the custom notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');

    // Set the message and type (success or error)
    notificationMessage.textContent = message;
    notification.classList.remove('hidden', 'fade-out');
    if (type === 'error') {
        notification.classList.add('error');
    } else {
        notification.classList.remove('error');
    }

    // Show the notification
    notification.classList.remove('fade-out');
    
    // Automatically hide after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
    }, 3000);
}

// Function to manually close the notification
function closeNotification() {
    const notification = document.getElementById('notification');
    notification.classList.add('fade-out');
}