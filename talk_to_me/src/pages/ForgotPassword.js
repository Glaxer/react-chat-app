import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

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
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button type="submit" disabled={loading} className="w-100 btn-white">
              Reset Password
            </Button>
            <div className="w-100 text-center mt-2">
              <Link to="/login" className="white-link">Login</Link>
            </div>
          </Form>

          <div className="w-100 text-center mt-3">
            Need an account? <Link to="/signup" className="white-link">Sign Up</Link>
          </div>
        </div>
      </div>

    </>
  )
}
