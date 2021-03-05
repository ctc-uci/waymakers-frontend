import React, { useState } from 'react';
import firebase from 'firebase/app';
import './login.css';
import {
  Card, Button, Form, Alert,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import auth from '../firebase/firebase';

const LogIn = (props) => {
  const { cookies } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  async function login() {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);

      const idToken = await firebase.auth().currentUser.getIdToken();
      // console.log(`idToken: ${JSON.stringify(idToken)}`);
      console.log(`idToken: ${idToken}`);

      // Setting a session cookie
      cookies.set('accessToken', idToken, {
        path: '/',
        maxAge: 3600,
      });

      // eslint-disable-next-line
      console.log(user.user.uid);
      history.push('/');
      // Signed in
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  async function loginWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithRedirect(provider);
      const result = await auth.getRedirectResult();
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken;
      }
      // The signed-in user info.
      const { user } = result;
      // eslint-disable-next-line
      console.log(user);
      history.push('/');
    } catch (err) {
      setError(err.message);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      setError('');
      login();
    } catch (err) {
      setError('Failed to log in');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="w-100 login-container">
        <Card className="w-100">
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
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
              <Button className="w-100" type="submit" variant="primary">Log In</Button>
              <Button className="mt-3 w-100" type="button" onClick={loginWithGoogle}>Sign In With Google</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          {'Don\'t have an account? '}
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

LogIn.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(LogIn);
