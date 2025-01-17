import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { FavoriteMovies } from '../../favorite-movies/favorite-movies';

import { Link } from 'react-router-dom';

export function ProfileView(props) {
  const [user, setUser] = useState('');
  const [favoriteMovies, setfavoriteMovies] = useState('');
  const [email, setEmail] = useState(props.email);
  const [birthday, setBirth_date] = useState(props.birthday);

  // hooks for user inputs
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    birthdayErr: '',
    emailErr: '',
  });

  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios
      .get(`https://my-movie-db22.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setfavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => console.error('getUser Error ' + error));
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleDelete = () => {
    if (user && token) {
      let sure = confirm('Are you sure? This action is irreversible and will ERASE your account.');
      if (!sure) return;
      // request to Delete user from webserver
      axios
        .delete(`https://my-movie-db22.herokuapp.com/users/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert(`The account ${user.Username} was successfully deleted.`);
          localStorage.clear();
          window.open('/register', '_self');
        })
        .catch((error) => console.error('handleDelete Error ' + error));
    }
  };

  // user validation
  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username is required' });
      isReq = false;
    } else if (username.length < 2) {
      setValues({ ...values, usernameErr: 'Username must be at least 2 characters long' });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password is required.' });
      isReq = false;
    } else if (password < 6) {
      setValues({ ...values, passwordErr: 'Password must be at least 6 characters long' });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email is required.' });
      isReq = false;
    } else if (email.indexOf('@') < 1) {
      setValues({ ...values, emailErr: 'Email is invalid' });
      isReq = false;
    }
    return isReq;
  };

  const updateUser = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .put(
          `https://my-movie-db22.herokuapp.com/users/${user._id}`,
          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); //'_self' is necessary so that the page opens in the current tab
        })
        .catch((response) => {
          console.error(response);
          alert('unable to register');
        });
    }
  };
  if (!user) 'loading..';
  console.log(user.Email);
  console.log(props.movies);
  console.log(favoriteMovies);
  return (
    <Container className="profile-view">
      <h4>
        Profile of <strong>{currentUser}</strong>
      </h4>
      <Form column="true">
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true">Username:</Form.Label>
          <Col>
            <Form.Control
              variant="success"
              type="text"
              defaultvalue={currentUser}
              onChange={(e) => setUser}></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true">Password:</Form.Label>
          <Col>
            <Form.Control variant="success" type="text" value="******"></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true">E-Mail:</Form.Label>
          <Col>
            <Form.Control variant="success" type="email" value={user.Email}></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group className="mt-3" as={Row} controlId="formUsername">
          <Form.Label column="true">Birthday:</Form.Label>
          <Col>
            <Form.Control
              variant="success"
              type="date"
              value={user.Birth_date}
              onChange={(e) => updateUser}></Form.Control>
          </Col>
        </Form.Group>
      </Form>
      <Button className="mb-3" type="button" onClick={handleDelete}>
        <strong> Delete </strong> my profile
      </Button>
      <Button className="mb-3" type="button" onClick={updateUser}>
        <strong>Update </strong> my profile
      </Button>
      <h4>My favorite movies:</h4>
      <Row className="justify-content-center mt-3">
        {/* {favoriteMovies.map((m) => {
          return <FavoriteMovies movieData={props.movies} />;
        })} */}
      </Row>
    </Container>
  );
}
