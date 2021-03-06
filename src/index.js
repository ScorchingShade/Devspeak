import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import Register from "./components/Auth/Register/Register.component";
import Login from "./components/Auth/Login/Login.component";
import "./index.css";
import firebase from "./server/firebase";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import { combinedReducers } from "./store/reducer";
import { setUser } from "./store/actioncreator";
import { AppLoader } from "./components/AppLoader/AppLoader.component";



const store = createStore(combinedReducers)




const Index = (props) => {
  useEffect(() => {


    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUser(user);
        props.history.push("/");
      } else {
        props.setUser(null);
        props.history.push("/login");
      }
    });
  }, []);

  console.log(props.currentUser);



  return (
    <>
    <AppLoader loading={props.loading && props.location.pathname==="/"} />
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route path="/" component={App} />
    </Switch>
    </>
  );
};

const mapStateToProps = (state)=>{
  return{
    currentUser: state.user.currentUser,
    loading : state.channel.loading
  }
  
}

const mapDispatchToProps = (dispatch)=>{
  return {
    setUser:(user)=>{dispatch(setUser(user))}
  }
}

const IndexWithRouter =withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <IndexWithRouter />
    </Router>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
