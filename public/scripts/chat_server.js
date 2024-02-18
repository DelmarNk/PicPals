const socket = io()

const form = document.querySelector('form')
const input = document.querySelector('.content')
const messages = document.querySelector('.messages')

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    console.log(chatId)
    console.log(input.value)
    fetch(`/chat/${chatId}/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            content: input.value
        })
    })
    if(input.value){
        socket.emit('chat message', input.value)
        input.value = ''
    }
})

socket.on('chat message', (msg)=>{
    console.log(msg)
    const newMessage = document.createElement('li')
    newMessage.textContent = msg
    messages.appendChild(newMessage)
})