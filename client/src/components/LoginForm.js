import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";
import Auth from '../utils/auth';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [loginUser] = useMutation(LOGIN_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await loginUser({ variables: userFormData });
            Auth.login(data.login.token);
        } catch (err) {
            console.warn(err.message);
            setShowAlert(true);
        }

        setUserFormData({
            username: "",
            email: "",
            password: "",
        });
    };

  return (
        <>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong with your login credentials!
                </Alert>
                <Form.Group>
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control
                        onChange={handleInputChange} value={userFormData.email}
                        type='text' placeholder='Your email' name='email' required
                    />
                    <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control
                        onChange={handleInputChange} value={userFormData.password}
                        type='password' placeholder='Your password' name='password' required
                    />
                    <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>
                <Button disabled={!(userFormData.email && userFormData.password)}
                    type='submit' variant='success'>
                    Submit
                </Button>
            </Form>
        </>
  );
};

export default LoginForm;
