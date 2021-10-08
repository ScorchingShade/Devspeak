import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import "semantic-ui-css/semantic.min.css"
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import {withRouter} from 'react-router'
import Register from './components/Auth/Register/Register.component';
import Login from './components/Auth/Login/Login.component';
import "./index.css"
import firebase from './server/firebase'


const Index=(props)=>{

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        props.history.push("/");
      }else{
        props.history.push("/login");
      }
    })
  }, [])

 
  return(
    <Switch>
        
    <Route exact path="/register" component={Register}/>
    <Route exact path="/login" component={Login}/>
    <Route  path="/" component={App}/>
    
  </Switch>
  )
}

const IndexWithRouter=withRouter(Index);


ReactDOM.render(
  
    <Router>
     <IndexWithRouter/>
    </Router>
    
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
