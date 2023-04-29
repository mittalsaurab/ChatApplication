
const socket = io('http://localhost:8000');

let messageInput = document.getElementById("messageInp"); 
let formElement = document.getElementById("inputForm"); 

function append(message, position){
    let messageContainer = document.getElementById("container"); 
    let messageElement = document.createElement("div");
    messageElement.innerHTML = message; 
    messageElement.classList.add("message"); 
    messageElement.classList.add(position); 

    messageContainer.appendChild(messageElement);
}

const name = prompt("What is your name ? "); 

if(name){
    socket.emit("new-user-joined", name); 
}

socket.on("user-joined", (name)=>{
    append(`${name} joined the chat`, "left");
})

socket.on('receive', data =>{
    let message = `${data.name} : ${data.message}`; 
    append(message, "left"); 
}); 

socket.on("left", (message) =>{
    console.log("");
    append(message, "left");
})

formElement.addEventListener('submit', (e)=>{
    e.preventDefault();
    let text = messageInput.value; 
    append(`You : ${text}`, 'right'); 
    socket.emit("receive", {'message': text, 'name' : name});
    messageInput.value = "";
})


