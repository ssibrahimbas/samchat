const request = new Request();

const registerInForm = document.querySelector("#register-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

registerInForm.addEventListener("submit", (e) => handleSubmit(e));

const handleSubmit = async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const name = nameInput.value;
  const data = {
    name,
    email,
    password,
  };
  let response;
  await request
    .post("/api/auth/register", data)
    .then((res) => (response = res))
    .catch((err) => console.log(err));
  if (response.success === true) {
    window.location.href = "/pages/lobby/lobby.html";
  }
};