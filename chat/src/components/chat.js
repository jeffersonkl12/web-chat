import React from "react";
import ChatContatos from "./chatContatos";
import ChatMsg from "./chatMsg";
import SocketContext from "./context/socketContext";
import "./chat.css";
import { Navigate } from "react-router-dom";

class Chat extends React.Component{

    constructor(props){
        super(props);
        this.state = {listaUser: [],listaMsg: []};
        this.socket =  null;
        this.user = null;
        this.receptor = null;
        this.atualizaListaMsg = this.atualizaListaMsg.bind(this);
        this.enviarMsg = this.enviarMsg.bind(this);
        this.desconnect = false;
    }

    componentDidMount(){
        try{
            if(this.socket.auth.nome){
                
            }
        
            this.user = this.socket.auth.nome;
            this.socket.on("novo user",(msg)=>{
                this.setState({listaUser: msg});
            })

            this.socket.on("user saiu",(msg)=>{
                console.log(msg);
                this.setState({listaUser: msg});
            }) 

            this.socket.on("lista msg",(lista)=>{
                this.setState({listaMsg: lista});
            })

            this.socket.on("receber msg",(msg)=>{
                if(this.receptor === msg.remetente){
                    this.state.listaMsg.push(msg);
                    this.setState({listaMsg: this.state.listaMsg});
                }   
            })

            this.socket.on("disconnect",(rason)=>{
                this.desconnect = true;
            })

            this.socket.on("connect_error",(rason)=>{
                console.log(rason);
                this.socket.disconnect();
            })
        }catch(e){
            this.desconnect = true;
        }
        
    }

    
    atualizaListaMsg(user){
        if(user !== this.user){
            this.socket.emit("get msg",user);
            this.receptor = user;
        }

    }

    enviarMsg(msg){
        if(this.receptor !== "" && this.user !== "" && msg !== ""){
            const sendMsg = {
                receptor: this.receptor,
                remetente: this.user,
                conteudo: msg
            }
    
            this.state.listaMsg.push(sendMsg);
            this.socket.emit("enviar msg",sendMsg);
            this.setState({listaMsg: this.state.listaMsg});
        }
       
    }
    
    render(){
        return(
            <>
                {this.desconnect ? <Navigate to="../"/>: null}
                <SocketContext.Consumer>
                    {(value)=>{this.socket = value}}
                </SocketContext.Consumer>
                <div className="chat-container">
                    <div className="chat-container-contatos">
                        <ChatContatos listaUser={this.state.listaUser} user={this.user} 
                        atualizaLista={this.atualizaListaMsg}/>
                    </div>
                    <div className="chat-container-msg">
                        <ChatMsg listaMsg={this.state.listaMsg} enviarMsg={this.enviarMsg} user={this.user} receptor={this.receptor}/>
                    </div>
                </div> 
            </>
        )
    }

};

export default Chat;