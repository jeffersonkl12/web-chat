import React from "react";
import Input from "./inputs/input";
import {BiSend} from "react-icons/bi";
import "./chatMsg.css";
import "./pattern.css";


class ChatMsg extends React.Component{

    constructor(props){
        super(props);
        this.state = {msg: ""};
        this.changeMsg = this.changeMsg.bind(this);
        this.enviaMsg = this.enviaMsg.bind(this);
    }

    changeMsg(e){
        this.setState({msg: e.target.value});
    }

    enviaMsg(e){
        e.preventDefault();
        this.setState({msg: ""});
        this.props.enviarMsg(this.state.msg)
    };

    render(){
     
        return (
            <div className="chat-msg-container">
                <div className="contato-msg-header">
                    {this.props.receptor ? <p className="contato-msg-receptor">{this.props.receptor}</p>: ""}
                </div>
                <div className="contato-msg-conteudo">
                    <ul className="contato-msg-lista">
                        {this.props.listaMsg ? this.props.listaMsg.map((v,i)=>{
                            if(v.remetente === this.props.user){
                                return <li className="msg-info remetente" key={i}><p>{v.conteudo}</p></li>
                            }else{
                                return <li className="msg-info receptor" key={i}><p>{v.conteudo}</p></li>
                            }   
                        }): null}
                    </ul>
                    
                </div>
                <form onSubmit={this.enviaMsg}>
                    <div className="contato-msg-entrada">
                        <div className="msg-entrada-container">
                            <Input placeHolder="escreva uma messagem..." valor={this.state.msg} onChange={this.changeMsg}/>
                        </div>
                        <button type="submit" className="btn-submit"><BiSend className="icon-msg"/></button>
                    </div>
                </form>
            </div>
        )
    }
};

export default ChatMsg;