const socket = io()

socket.emit('products')
socket.on("products", (data)=>{
    console.groupCollapsed(data)
})