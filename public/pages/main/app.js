const request = new Request();
const storage = new Storage();

const logInForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

logInForm.addEventListener("submit", (e) => handleSubmit(e));

const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const data = {
        email,
        password,
    };
    let response;
    await request
        .post("/api/auth/login", data)
        .then((res) => (response = res))
        .catch((err) => console.log(err));
    console.log(response)
    if (response.success === true) {
        token = response.token;
        storage.setItemToLocalStorage("Bearer", token);
        storage.setSessionStorage("senderId", response.data.id);
        window.location.href = '/lobby'
    }
};