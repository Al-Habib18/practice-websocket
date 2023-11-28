/** @format */

const inputName = document.querySelector("#input_name");
const basicInfoForm = document.querySelector("#basic_info_form");

basicInfoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userName = inputName.value;
    window.location.href = `http://localhost:4000/chat?name=${userName}`;
});
