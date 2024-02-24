const socket = io()

const form = document.querySelector('form')
const input = document.querySelector('.content')
const messages = document.querySelector('.messages')

form.addEventListener('submit', (event)=>{
    event.preventDefault()
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
    const newMessage = document.createElement('li')
    const time = document.createElement('p')
    newMessage.className = 'my_message'
    newMessage.textContent = msg
    time.className = 'my_message_time time'
    time.textContent = new Date().toLocaleString()
    messages.appendChild(newMessage)
    messages.appendChild(time)
    window.scrollTo(0, document.body.scrollHeight) // make a msg automatically scroll to the top
})