function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        alert(`Logging in with\nUsername: ${username}\nPassword: ${password}`);
    } else {
        alert('Please fill in both fields.');
    }
}
