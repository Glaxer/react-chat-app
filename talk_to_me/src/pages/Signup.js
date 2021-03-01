import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Signup() {
  // const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    //Check if the two passwords match. If not, set error
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError(''); //Clear error message
      setLoading(true); //Prevent signup on loading
      await signup(emailRef.current.value, passwordRef.current.value); //Create account with current values
      history.push('/'); //Redirect to dashboard
    } catch {
      setError('Failed to create an account'); 
    }

    setLoading(false); //Remove loading state when done
  }

  return (
    <>
      <div className="vertical-container" >
        <div className="vertical-container-inner">
          <h2 className="text-center mb-4">Sign Up</h2>

          <Form onSubmit={handleSubmit} className="auth-form">
            {/* <Form.Group id="username">
              <div className="i">
                <FontAwesomeIcon icon={['fas', 'user']} />
              </div>
              <Form.Control type="text" ref={userRef} required placeholder="Username"/>
            </Form.Group> */}

            <Form.Group id="email">
              <div className="i">
                <FontAwesomeIcon icon={['fas', 'bookmark']} />
              </div>
              <Form.Control type="email" ref={emailRef} required placeholder="Email"/>
            </Form.Group>

            <Form.Group id="password">
              <div className="i">
                <FontAwesomeIcon icon={['fas', 'lock-open']} />
              </div>
              <Form.Control type="password" ref={passwordRef} required placeholder="Password" />
            </Form.Group>

            <Form.Group id="password-confirm">
              <div className="i">
                <FontAwesomeIcon icon={['fas', 'lock']} />
              </div>
              <Form.Control type="password" ref={passwordConfirmRef} required placeholder="Confirm Password" />
            </Form.Group>

            <Button type="submit" disabled={loading} className="w-100 btn-white">
              Sign Up
            </Button>

            {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
          </Form>

          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login" className="white-link">Log In</Link>
          </div>
        </div>
      </div>
    </>
  )
}
