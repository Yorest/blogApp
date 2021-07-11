import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { updateLikes, deleteBlog } from '../services/blogs';

const Blog = ({ blog, myBlogs }) => {
    const [visible, setVisible] = useState(false);

    const [blogUse, setBlogUse] = useState(blog);

    const hideWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const handleLikes = async (blog) => {
        const blogToUpdate = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id,
        };

        // eslint-disable-next-line no-unused-vars
        const blogUpdated = await updateLikes(blog.id, blogToUpdate);

        setBlogUse((prev) => {
            return { ...prev, likes: blogToUpdate.likes };
        });
    };

    const deleteaBlog = async (id) => {
        const canDelete = window.confirm('do you want to delete this blog');

        if (canDelete) {
            try {
                await deleteBlog(id);
                alert('Blog Deleted');
            } catch (error) {
                alert('Error to the Delete');
            }
        }
    };

    const styleLine = {
        marginBottom: '5px',
    };
    return (
        <div
            style={{
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#eee',
                borderRadius: '5px',
            }}
            className="blogContent"
        >
            <div>
                <span style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '15px' }}>
                    {blogUse.title}
                </span>
                <button onClick={toggleVisibility}>view more</button>
                <div style={{ marginTop: '10px' }} >{blogUse.author}</div>
            </div>
            <div style={hideWhenVisible} className="togglelement">
                <div style={styleLine}>{blogUse.url}</div>
                <div style={styleLine}>
                    {blogUse.likes}{' '}
                    <button
                        onClick={() => {
                            handleLikes(blogUse);
                        }}
                        className="btnLike"
                    >
                        like
                    </button>{' '}
                </div>
                <div style={styleLine}>{blogUse.author}</div>

                {myBlogs.includes(blogUse.id) && (
                    <button
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            borderRadius: '5px',
                        }}
                        onClick={() => {
                            deleteaBlog(blogUse.id);
                        }}
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default Blog;

Blog.prototype = {
    blog: PropTypes.object.isRequired,
    myBlogs: PropTypes.array.isRequired,
};
