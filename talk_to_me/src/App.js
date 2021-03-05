import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
// import ForgotPassword from './pages/ForgotPassword';
// import UpdateProfile from './pages/UpdateProfile';

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
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/dashboard" component={Dashboard}></Route> 
      </Router>

    // <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
    //   <div className="w-100" style={{ maxWidth: "500px" }}>
    //     <Router>
    //       <AuthProvider>
    //         <Switch>
    //           <PrivateRoute exact path="/" component={Dashboard} />
    //           <PrivateRoute path="/update-profile" component={UpdateProfile} />
    //           <Route path="/signup" component={Signup} />
    //           <Route path="/login" component={Login} />
    //           <Route path="/forgot-password" component={ForgotPassword} />
    //         </Switch>
    //       </AuthProvider>
    //     </Router>
    //   </div>
    //   Hello
    // </Container>
  )
}

export default App;
