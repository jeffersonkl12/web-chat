import React from "react";
import "./chatContatos.css";
import "./pattern.css";

class ChatContatos extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="chat-contatos-container">
                <div className="chat-contatos-header">
                    
                </div>
                <div className="contatos-lista-container">
                    <ul className="contatos-lista">
                    {this.props.listaUser ? this.props.listaUser.map((v,i)=>{                     
                        if(this.props.user !== v.nome){
                            return <li key={i} className="contatos-lista-item" 
                            onClick={(e)=>this.props.atualizaLista(v.nome)}><p>{v.nome}
                            <span className={`contatos-item-status ${v.status ? "online": "offline"}`}></span></p></li>
                        }
                                
                    }): null}
                    </ul>
                </div>
             
                <div className="chat-contatos-footer">
                    <p className="contatos-footer-perfil">{this.props.user}</p>
                </div>
                
            </div>
        )
    }

};

export default ChatContatos ;
