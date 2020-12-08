import React, { useState } from 'react';
import './register.css';
import {
  Card, Button, Form, Alert,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import auth from '../firebase/firebase';

const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const updateConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  async function register() {
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);
      // eslint-disable-next-line
      console.log(user);
      history.push('/');
      // Signed in
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setError('');
      // Call firebase register function
      register();
    } catch (err) {
      setError('Failed to create an account');
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="w-100 register-container">
        <Card className="w-100">
          <Card.Body>
            <h2 className="text-center mb-4">Register</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder="Enter email" type="email" onChange={updateEmail} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control placeholder="Enter password" type="password" onChange={updatePassword} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control placeholder="Re-enter password" type="password" onChange={updateConfirmPassword} required />
              </Form.Group>
              <Button className="w-100" type="submit" variant="primary">Register</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          {'Already have an account? '}
          <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
