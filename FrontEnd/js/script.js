// login elements
const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = document.querySelector(".login__input")

// chat elemets

const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = document.querySelector(".chat__input")
const chatmessages = document.querySelector(".chat__messages")



const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
]
const user = {id: "", name: "", color:"" }

let websocket

const creatMessageSelfElement = (content) =>{

    const div = document.createElement("div")
    
    div.classList.add("message--self")
    div.innerHTML = content
    return div
}

const creatMessageOtherElement = (content, sender, sendercolor) =>{

    const div = document.createElement("div")
    const span = document.createElement("span")
    div.classList.add("message--other")
    span.classList.add("message--sender")
    div.classList.add("message--self")
    span.style.color = sendercolor

    div.appendChild(span)

    span.innerHTML = sender

    div.innerHTML += content
    return div
}

const getRandomColor = () =>{
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

const scrollScreen = () => {
    window.scrollTo({
        top:document.body.scrollHeight,
        behavior: "smooth"
        
    })
}
const processMessage = ({ data }) =>{
    const { userid, username, usercolor, content } = JSON.parse(data)
    
    const message = userid == user.id ? creatMessageSelfElement(content) 
    : creatMessageOtherElement(content, username, usercolor)

    chatmessages.appendChild(message)
    scrollScreen()
}
    


const handleLogin = (event) => {
    event.preventDefault()
    
    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandomColor()

    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("wss://chat-b0s6.onrender.com")
    websocket.onmessage = processMessage

}
const sendMassage = () =>  {
    event.preventDefault()
    const message = {
        userid: user.id,
        username: user.name,
        usercolor: user.color,
        content: chatInput.value
    }

    websocket.send(JSON.stringify(message))

    chatInput.value = ""
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit",sendMassage )