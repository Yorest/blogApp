import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import { login as loginService } from '../services/login';
import { setToken } from '../services/blogs';

const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService({
                username,
                password,
            });
            window.localStorage.setItem(
                'loggedNoteappUser',
                JSON.stringify(user)
            );
            setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
            Swal.fire({
                title: 'Login',
                text: 'Login Correct',
                icon: 'success',
                confirmButtonText: 'ok',
            });
        } catch (exception) {
            console.log(exception);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Username or password incorrect',
            });
            setUsername('');
            setPassword('');
        }
    };
    return (
        <div>
            <h1>Log in to app</h1>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="username"
                        id="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="password"
                        id="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit" id="login-button">
                    login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;

LoginForm.prototype = {
    setUser: PropTypes.func.isRequired,
};
