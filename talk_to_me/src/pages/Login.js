import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError(''); //Clear error message
      setLoading(true); //Prevent signup on loading
      await login(emailRef.current.value, passwordRef.current.value); //Create account with current values
      history.push('/'); //Redirect to dashboard
    } catch {
      setError('Failed to log in');
    }

    setLoading(false); //Remove loading state when done
  }

  return (
    <>
      <div className="vertical-container" >
        <div className="vertical-container-inner">
          <img src="images/welcome-icon.svg" alt="icon" className="welcome-icon"/>
          <h2 className="text-center mb-4">Welcome</h2>
        
          <Form onSubmit={handleSubmit} className="auth-form">
            <Form.Group id="email">
              <FontAwesomeIcon icon={['fas', 'user']} />
              <Form.Control type="email" ref={emailRef} required placeholder="Email" />
            </Form.Group>

            <Form.Group id="password">
              <FontAwesomeIcon icon={['fas', 'lock']} />
              <Form.Control type="password" ref={passwordRef} required placeholder="Password" />
            </Form.Group>

            <Button type="submit" disabled={loading} className="w-100 btn-white">
              Log In
            </Button> 
          </Form>
          {error && <Alert variant="danger" className="text-center mt-2">
            {error}
            <div className="w-100 text-center ">
              <Link to={{pathname: "/forgot-password", email: emailRef.current.value }} className="white-link">Forgot Password?</Link>
            </div>
          </Alert>}
          <div className="mt-2 text-right">
            Need an account? <Link to="/signup" className="white-link">Sign Up</Link>
          </div>

          
        </div>
      </div>

    </>
  )
}
