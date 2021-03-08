import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCGPozXn-gK8q0Suv6IY35VLjE86u1twx8",
  authDomain: "talktome-ec7f2.firebaseapp.com",
  databaseURL: "https://talktome-ec7f2-default-rtdb.firebaseio.com",
  projectId: "talktome-ec7f2",
  storageBucket: "talktome-ec7f2.appspot.com",
  messagingSenderId: "693873571305",
  appId: "1:693873571305:web:b9cfeae4cbb02bb4a8c778"
});

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
      </Switch>
    </Router>
  )
}

export default App;