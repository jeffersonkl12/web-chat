import Chat from './components/chat';
import Login from './components/login';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import React from 'react';
import SocketContext from './components/context/socketContext';
import './App.css';


class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {socket: {}};
    this.changeSocket = this.changeSocket.bind(this);

    this.router = new createBrowserRouter([{
      path: "/",
      children: [{
        path: "/",
        element: <Login changeSocket={this.changeSocket}/>
      },
      {
        path: "/chat",
        element: <Chat/>
      }  
    ]
    }]);

  }

  changeSocket(novoSocket){
    this.setState({socket: novoSocket});
  }

  render(){
    return(
        <SocketContext.Provider value={this.state.socket}>
           <RouterProvider router={this.router}/>
        </SocketContext.Provider>
       
    )
  }
}

export default App;
