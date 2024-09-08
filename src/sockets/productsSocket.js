
const productsSocket = (socket) => {
    socket.on("products", () => {
        socket.emit("products", { message: "hola" });
    });
};

export default productsSocket;
