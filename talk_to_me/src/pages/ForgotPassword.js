import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ForgotPassword(props) {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const userEmail = props.location.email;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage(''); //Clear success message
      setError(''); //Clear error message
      setLoading(true); //Prevent signup on loading
      await resetPassword(emailRef.current.value);
      setMessage('An email with further instructions has been sent to you');
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false); //Remove loading state when done
  }

  return (
    <>
      <div className="vertical-container" >
        <div className="vertical-container-inner">
          <h2 className="text-center mb-4">Password Reset</h2>
          

          <Form onSubmit={handleSubmit} className="auth-form">
            <Form.Group id="email">
              <div className="i">
                <FontAwesomeIcon icon={['fas', 'user']} />
              </div>
              <Form.Control type="email" ref={emailRef} required defaultValue={userEmail} />
            </Form.Group>

            <Button type="submit" disabled={loading} className="w-100 btn-white">
              Reset Password
            </Button>
            <div className="w-100 text-center mt-2">
              <Link to="/login" className="white-link">Login</Link>
            </div>
          </Form>
          {error && <Alert variant="danger" className="text-center mt-2">{error}</Alert>}
          {message && <Alert variant="success" className="text-center mt-2">{message}</Alert>}

          <div className="w-100 text-center mt-3">
            Need an account? <Link to="/signup" className="white-link">Sign Up</Link>
          </div>
        </div>
      </div>

    </>
  )
}
