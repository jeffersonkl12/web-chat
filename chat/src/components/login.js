import React from "react";
import { io } from "socket.io-client";
import { Navigate } from "react-router-dom";
import InputLine from "./inputs/inputLine";
import ButtonGradiente from "./buttons/buttonGradiente";
import "./login.css";
import "./pattern.css";



class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {nome: "",conexcao: false};
        this.changNome = this.changNome.bind(this);
        this.loginEvento = this.loginEvento.bind(this);
        this.socket = {};
        
    }

    changNome(e){
        this.setState({nome: e.target.value});

    }

    loginEvento(e){
        e.preventDefault();
        
        if(this.state.nome && this.state.nome !== ""){
           this.socket = io("ws://localhost:8080/",{auth: {nome: this.state.nome}});
           this.props.changeSocket(this.socket);
           this.setState({conexcao: true}); 

        }
    }

    render(){
    
        return(
            <>
                {this.state.conexcao ? <Navigate to={"../chat"}/>: null}
               <div className="login-documento"> 
                    <div className="login-container">
                        <h1 className="login-titulo">Login</h1>
                        <form method="POST" className="login-formulario" onSubmit={this.loginEvento}>
                            <div className="login-nick-container">
                                <label className="login-info">Nome:</label>
                                <InputLine placeHolder="Digite um nome..." onChange={this.changNome}/>
                            </div>
                            <div className="btn-login-submit">
                            <ButtonGradiente valor="Entrar" estilo={{width: "150px"}} tipo="submit"/>  
                            </div>
                            
                        </form>
                    </div>
                </div>
            </>
        )
    }

};

export default Login;