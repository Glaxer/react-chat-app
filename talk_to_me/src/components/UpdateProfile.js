import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import firebase from 'firebase/app';

class UpdateProfile extends Component {
  constructor() {
    super();
    this.state = {
      userEmail: null,
      userName: null,
      userAddress: null,
      password: null,
    }
  }

  render() {
    return (
      <section>
        <div className="update-profile">
          <h2>Update your profile</h2>
          <Form onSubmit={(e) => this.submitProfile(e)}>
            <Form.Group>
              <Form.Label>Your Username</Form.Label>
              <Form.Control
                type="text"
                placeholder={this.props.userName}
                onChange={(e) => this.userTyping('username', e)}
                autoFocus
              >
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Your Address</Form.Label>
              <Form.Control
                type="text"
                placeholder={this.props.userAddress}
                onChange={(e) => this.userTyping('address', e)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => this.userTyping('password', e)}
              >
              </Form.Control>
            </Form.Group>

            <Button type="submit">Update Profile</Button>
          </Form>

          <Form onSubmit={(e) => this.deleteProfile(e)}>
            <Form.Label>Delete Account</Form.Label><br/>
            <Button type="submit">Delete Your Account</Button>
          </Form>
        </div>
      </section>
    )
  }

  userTyping = (type, e) => {
    switch (type) {
      case 'username':
        this.setState({ userName: e.target.value });
        break;

      case 'address':
        this.setState({ userAddress: e.target.value });
        break;

      case 'password': 
        this.setState({ password: e.target.value });
        break;

      default:
        break;
    }
  }

  submitProfile = (e) => {
    e.preventDefault();

    const user = firebase.auth().currentUser;
    const email = this.state.userEmail ? this.state.userEmail : this.props.userEmail
    const userName = this.state.userName ? this.state.userName : this.props.userName
    const address = this.state.userAddress ? this.state.userAddress : this.props.userAddress

    if (this.state.password) {
      this.updatePassword();
    }

    firebase.firestore().collection('users').doc(user.email).set({ userName, email, address });
    
  }

  updatePassword = () => {
    const user = firebase.auth().currentUser;
    const newPassword = this.state.password;

    user.updatePassword(newPassword).then(function() {
      console.log('Password Updated')
    }).catch(function(error) {
      console.log(error)
    });
  }

  deleteProfile = (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;

    firebase.firestore().collection('users').doc(user.email).delete().then(() => {
      user.delete().then(() => {
        console.log('Delete success')
      }).catch((error) => {
        console.log(error)
      })
    }).catch((err) => {
      console.log(err)
    })
  }
}

export default UpdateProfile;