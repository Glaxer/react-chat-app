import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function Signup() {
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
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>

            <Button type="submit" disabled={loading} className="w-100 btn-white">
              Sign Up
            </Button>
          </Form>

          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login" className="white-link">Log In</Link>
          </div>
        </div>
      </div>
    </>
  )
}
