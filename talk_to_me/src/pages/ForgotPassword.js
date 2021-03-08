import React, { Component } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';


class ForgotPassword extends Component {
  constructor(props) {
    super();
    this.state = {
      email: props.location.email,
      resetError: '',
      message: ''
    }
  }

  render() {
    let email;

    if (!this.state.email) {
      email = ""
    } else {
      email = this.state.email
    }

    return (
      <main className="d-flex justify-content-center">
        <div className="image-container col-4">
          <img src="images/chat-image.svg" alt="icon" />
          <h1>Talk To Me</h1>
        </div>
        <div className="vertical-container col-4 bg-primary" >
          <div className="vertical-container-inner">
            <img src="images/welcome-icon.svg" alt="icon" className="welcome-icon" />
            <h2 className="text-center mb-4">Reset Password</h2>

            {
              this.state.message ?
                <Alert variant="success" className="mt-2">
                  {this.state.message}
                </Alert> :
                null
            }
            <Form onSubmit={(e) => this.resetPassword(e)} className="auth-form">
              <Form.Group id="email">
                <FontAwesomeIcon icon={['fas', 'user']} />
                <Form.Control required autoFocus type="email" onChange={(e) => this.userTyping('email', e)} placeholder="Email" value={email}></Form.Control>
              </Form.Group>

              <Button type="submit" className="w-100" variant="light">Reset Password</Button>
            </Form>
            {
              this.state.resetError ?
                <Alert variant="danger" className="mt-2">
                  {this.state.resetError}
                </Alert> :
                null
            }

            <div className="w-100 text-center mt-2">
              Need an account? <Link to="/signup" className="text-info">Sign Up</Link>
            </div>
            <div className="w-100 text-center mt-2">
              Already have an account? <Link to="/login" className="text-info">Log In</Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  userTyping = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({ email: e.target.value });
        break;

      default:
        break;
    }
  }

  resetPassword = (e) => {
    e.preventDefault();

    firebase.auth().sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.setState({ message: 'An email has been sent' })
      }, err => {
        this.setState({ resetError: 'Something went wrong. Please try again' });
        console.log(err)
      })
  }
}

export default ForgotPassword;