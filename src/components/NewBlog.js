import React, { useState } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

import { createBlog } from '../services/blogs';

export const NewBlog = React.forwardRef(({ setBlogs }, ref) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const blogSaved = await createBlog({
                title,
                author,
                url,
            });

            setBlogs((prev) => {
                return [...prev, blogSaved];
            });

            ref.current.toggleVisibility();
            setTitle('');
            setAuthor('');
            setUrl('');

            Swal.fire({
                title: 'Login Out',
                text: 'Login out Correct',
                icon: 'success',
                confirmButtonText: 'ok',
            });
        } catch (error) {
            setTitle('');
            setAuthor('');
            setUrl('');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error creating blog',
            });
        }
    };

    return (
        <div>
            <h2>new blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={({ target }) => {
                            setTitle(target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author </label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={author}
                        onChange={({ target }) => {
                            setAuthor(target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="url">Url </label>
                    <input
                        type="text"
                        name="url"
                        id="url"
                        value={url}
                        onChange={({ target }) => {
                            setUrl(target.value);
                        }}
                    />
                </div>
                <button id="createBlog" type="submit">
                    Create
                </button>
            </form>
        </div>
    );
});

NewBlog.displayName = 'NewBlog';

NewBlog.propTypes = {
    setBlogs: PropTypes.func.isRequired,
    ref: PropTypes.object,
};
