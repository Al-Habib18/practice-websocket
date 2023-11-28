/** @format */

const socket = io("ws://localhost:4000");

// chat page html elements
const messageArea = document.querySelector("#message_area");
const inputBox = document.querySelector("#input_box");
const form = document.querySelector("#form");
const heading = document.querySelector("#heading");
const activity = document.querySelector("#activity");

let userName;
(() => {
    const urlParmas = new URLSearchParams(window.location.search);
    const name = urlParmas.get("name");
    if (!name) {
        window.location.href = "http://localhost:4000";
    }

    userName = name;
    heading.innerHTML = `Welcome -- ${name} -- to stack room`;
    inputBox.focus();
})();

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = inputBox.value;
    if (!message) {
        return alert("Please enter a message");
    }

    sendMessage({ name: userName, message });
    inputBox.value = "";
});

const scrollToBottom = () => {
    messageArea.scrollTop = messageArea.scrollHeight;
};

const appendMessage = ({ name, message, type }) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(type.trim(), "message");

    let markup = `
        <h4>${name}</h4>
        <p>${message}</p>
    `;

    messageDiv.innerHTML = markup;
    messageArea.appendChild(messageDiv);
    scrollToBottom();
};

const sendMessage = ({ name, message }) => {
    appendMessage({ name, message, type: "sending" });

    socket.emit("message", { name, message });
};

socket.on("send-message", (message) => {
    appendMessage({ ...message, type: "receiving" });
});

inputBox.addEventListener("keyup", () => {
    socket.emit("activity", userName);
});

let activityTimer;

socket.on("send-activity", (name) => {
    clearTimeout(activityTimer);
    activity.innerHTML = `${name} is typing...`;

    activityTimer = setTimeout(() => {
        activity.innerHTML = "";
    }, 500);
});
