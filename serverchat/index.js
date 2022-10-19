const http = require("http");
const express = require("express");
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(express.json);
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Methods","*");
    next();
})

const listaUser = [];
const listaMsg = new Map();
const io = new Server(server,{cors: 
    {origin: "*",methods: "*", allowedHeaders: "*"}
    });

io.use((socket,next)=>{
    next();
});

io.on("connection",(socket)=>{
    
   const index = listaUser.findIndex((v,i)=>{
        if(v.nome === socket.handshake.auth.nome){
            return true;
        }
    });

    if(index >= 0){
        listaUser.at(index).status = true;
    }else{
        listaUser.push({nome: socket.handshake.auth.nome, status: true});
    }
    socket.join(socket.handshake.auth.nome);
    socket.emit("novo user",listaUser);
    socket.broadcast.emit("novo user",listaUser);

    socket.on("enviar msg",(msg)=>{
        const allmsg = [];
        const novaMsg = {
            remetente: socket.handshake.auth.nome,
            receptor: msg.receptor,
            conteudo: msg.conteudo,
            data: new Date()
        };

        if(!listaMsg.has(novaMsg.receptor)){
            listaMsg.set(novaMsg.receptor,[]);
        };

        if(!listaMsg.has(novaMsg.remetente)){
            listaMsg.set(novaMsg.remetente,[]);
        }

        listaMsg.get(novaMsg.receptor).push(novaMsg);
        listaMsg.get(novaMsg.remetente).push(novaMsg);

        
        io.to(novaMsg.receptor).emit("receber msg",novaMsg);
    });

    socket.on("get msg",(index)=>{
        const allMsg = [];

        if(listaMsg.has(socket.handshake.auth.nome)){
            listaMsg.get(socket.handshake.auth.nome).map((v,i)=>{
                if(v.receptor === index || v.remetente === index){
                    allMsg.push(v);
                }
            })
        }   

        io.sockets.in(socket.handshake.auth.nome).emit("lista msg",allMsg);
    })

   socket.on("disconnect",(reason)=>{
        listaUser.forEach((v,i)=>{
            if(v.nome === socket.handshake.auth.nome){
                v.status = false;
            }
        });

        socket.emit("user saiu",listaUser);
        socket.broadcast.emit("user saiu",listaUser);
   })

})



server.listen(8080,"127.0.0.1",()=>{
    console.log("server on");
})