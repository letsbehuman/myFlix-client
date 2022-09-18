import React from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';

import { connect } from 'react-redux';

import { setUser, setFavorites, setUserData } from '../../actions/actions';

export function UserUpdate({ user, handleUpdateUser, birthday, toggleUpdateInfo }) {
  // hooks for user inputs
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newBirthday, setNewBirthday] = useState('');

  const [errorMessage, setErrorMessage] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  // user validation
  const validate = () => {
    let isReq = true;
    setErrorMessage((prev) => {
      return {
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
        birthdayErr: '',
      };
    });
    if (!newUsername) {
      setErrorMessage((prevValue) => {
        return { ...prevValue, usernameErr: 'Username is required' };
      });
      isReq = false;
    } else if (newUsername.length < 2) {
      setErrorMessage((prevValue) => {
        return { ...prevValue, usernameErr: 'Username must be at least 2 characters long' };
      });
      isReq = false;
    }
    if (!newPassword) {
      setErrorMessage((prevValue) => {
        return { ...prevValue, passwordErr: 'Password is required.' };
      });
      isReq = false;
    } else if (newPassword < 6) {
      setErrorMessage((prevValue) => {
        return { ...prevValue, passwordErr: 'Password must be at least 6 characters long' };
      });
      isReq = false;
    }
    if (newEmail) {
      setErrorMessage((prevValue) => {
        return { ...prevValue, emailErr: 'Email is required.' };
      });
      isReq = false;
    } else if (newEmail.indexOf('@') < 1) {
      setErrorMessage((prevValue) => {
        return { ...prevValue, emailErr: 'Email is invalid' };
      });
      isReq = false;
    }
    return isReq;
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const isReq = validate();
    if (isReq) {
      let updatedUser = {
        Username: newUsername,
        Password: newPassword,
        Email: newEmail,
        Birthday: newBirthday,
      };
      handleUpdateUser(updatedUser, token);
    }
  };
  return (
    <Container className="profile-view mb-4">
      <h4>Update your profile</h4>
      <Form column="true" className="mb-3">
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true" xs={3}>
            Username:
          </Form.Label>
          <Col>
            <Form.Control
              name="Username"
              type="text"
              defaultValue={user.Username}
              onChange={(event) => setNewUsername(event.target.value)}
            />{' '}
            {errorMessage.usernameErr && (
              <p className="validation-message">{errorMessage.usernameErr}</p>
            )}
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true" xs={3}>
            Password:
          </Form.Label>
          <Col>
            <Form.Control
              name="Password"
              type="text"
              placeholder="Set new password"
              onChange={(event) => setNewPassword(event.target.value)}
            />{' '}
            {errorMessage.passwordErr && (
              <p className="validation-message">{errorMessage.passwordErr}</p>
            )}
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true" xs={3}>
            E-Mail:
          </Form.Label>
          <Col>
            <Form.Control
              name="Email"
              type="email"
              defaultValue={user.Email}
              onChange={(event) => setNewEmail(event.target.value)}
            />{' '}
            {errorMessage.emailErr && (
              <p className="validation-message">{errorMessage.emailErr} </p>
            )}
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true" xs={3}>
            Birthday:
          </Form.Label>
          <Col>
            <Form.Control
              name="Birthday"
              type="date"
              defaultValue={user.Birthday}
              onChange={(event) => setNewBirthday(event.target.value)}
            />
          </Col>
        </Form.Group>
      </Form>
      <Button className="mb-3 mr-3" type="button" onClick={(e) => handleSubmitUpdate(e)}>
        <strong>Update </strong> my profile
      </Button>
      <Button className="mb-3" type="button" onClick={() => toggleUpdateInfo()}>
        {' '}
        Back
      </Button>
    </Container>
  );
}
