import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
// import firebase from 'firebase/app';

class UpdateProfile extends Component {
  constructor() {
    super();
    this.state = {

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
                placeholder="Your username"
                // required
                autoFocus
                // onChange={(e) => this.userTyping('friendEmail', e)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Your Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your address"
              >
              </Form.Control>
            </Form.Group>

            <Button type="submit">Update Profile</Button>
          </Form>
        </div>
      </section>
    )
  }

  submitProfile = (e) => {
    e.preventDefault();
    console.log('Updated profile')
  }
}

export default UpdateProfile;