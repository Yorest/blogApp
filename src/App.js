/* eslint-disable linebreak-style */
import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

import Toggable from './components/Togglable';
import FormLogin from './components/FormLogin';
import Blog from './components/Blog';
import { getAllBlocks, setToken } from './services/blogs';
import userService from './services/user';
import { NewBlog } from './components/NewBlog';

const App = () => {
    const noteFormRef = useRef();
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [sortedBlogs, setSortedBlogs] = useState([]);
    const [myBlogs, setMyBlogs] = useState([]);

    useEffect(() => {
        async function get() {
            let response = await getAllBlocks();
            setBlogs(response);
        }

        get();
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            setToken(user.token);
            userService.getBlogsUser(user.username).then((data) => {
                setMyBlogs(data);
            });
        }
    }, []);

    useEffect(() => {
        setBlogs(sortedBlogs);
    }, [sortedBlogs]);

    const logOut = () => {
        console.log('logOut');
        window.localStorage.removeItem('loggedNoteappUser');
        setUser(null);
        Swal.fire({
            title: 'Login Out',
            text: 'Login out Correct',
            icon: 'success',
            confirmButtonText: 'ok',
        });
    };

    const sortBlogs = () => {
        const sortBlogs = blogs.sort(function (a, b) {
            return a.likes - b.likes;
        });

        setSortedBlogs(sortBlogs);
    };

    return (
        <div>
            {user === null ? (
                <Toggable buttonLabel='Login'>
                    <FormLogin setUser={setUser} />
                </Toggable>
            ) : (
                <div>
                    <h1>blogs</h1>
                    <p>
                        {user.name} logged-in
                        <button onClick={logOut}>logout</button>
                    </p>
                    <Toggable buttonLabel='New Blog' ref={noteFormRef}>
                        <NewBlog setBlogs={setBlogs} ref={noteFormRef} />
                    </Toggable>
                    <div
                        style={{
                            width: '80%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            marginTop: '15px',
                        }}
                    >
                        <button
                            style={{ margin: '10px 0px' }}
                            onClick={sortBlogs}
                        >
                            sort likes
                        </button>

                        {blogs.map((blog) => (
                            <Blog key={blog.id} blog={blog} myBlogs={myBlogs} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
