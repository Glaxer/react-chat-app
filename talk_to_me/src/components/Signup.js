import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from 'firebase/app';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConformation: null,
      signupError: ''
    }
  }

  render() {
    return (
      <main className="d-flex justify-content-center">
        <div className="image-container col-4">
          <img src="images/chat-image.svg" alt="icon" />
          <h1>Talk To Me</h1>
        </div>
        <div className="vertical-container col-4 bg-primary" >
          <div className="vertical-container-inner">
            <h2 className="text-center mb-4">Sign Up</h2>

            <Form onSubmit={(e) => this.sumbitSignup(e)} className="auth-form">
              <Form.Group id="email">
                <FontAwesomeIcon icon={['fas', 'bookmark']} />
                <Form.Control required autoFocus type="email" onChange={(e) => this.userTyping('email', e)} placeholder="Email"></Form.Control>
              </Form.Group>

              <Form.Group id="password">
                <FontAwesomeIcon icon={['fas', 'lock-open']} />
                <Form.Control required type="password" onChange={(e) => this.userTyping('password', e)} placeholder="Password"></Form.Control>
              </Form.Group>

              <Form.Group id="password-confirm">
                <FontAwesomeIcon icon={['fas', 'lock']} />
                <Form.Control required type="password" onChange={(e) => this.userTyping('passwordConformation', e)} placeholder="Confirm Password"></Form.Control>
              </Form.Group>

              <Button type="submit" className="w-100" variant="light">Sign Up</Button>
            </Form>

            {
              this.state.signupError ?
                <Alert variant="danger" className="mt-2">
                  {this.state.signupError}
                </Alert>: 
              null
            }

            <div className="w-100 text-center mt-2">
              Already have an account? <Link to="/login" className="text-info">Log In</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  passwordMatch = () => this.state.password === this.state.passwordConformation;

  userTyping = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({ email: e.target.value });
        break;

      case 'password':
        this.setState({ password: e.target.value });
        break;

      case 'passwordConformation':
        this.setState({ passwordConformation: e.target.value });
        break;

      default:
        break;
    }
  }

  sumbitSignup = (e) => {
    e.preventDefault();

    if (!this.passwordMatch()) {
      this.setState({ signupError: 'Passwords do not match' });
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(authRes => {
        const userObj = {
          email: authRes.user.email
        };
        firebase.firestore().collection('users').doc(this.state.email).set(userObj)
          .then(() => {
            this.props.history.push('/dashboard')
          }, dbError => {
            console.log(dbError);
            this.setState({ signupError: 'Failed to add user' });
          })
      }, authError => {
        console.log(authError);
        this.setState({ signupError: 'Failed to add user' });
      })
  }
}

export default Signup;
