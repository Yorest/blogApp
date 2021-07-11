import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

export const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const config = () => {
    const loggedUserJSON = JSON.parse(
        window.localStorage.getItem('loggedNoteappUser')
    );

    if (loggedUserJSON) {
        token = loggedUserJSON.token;
    }

    return {
        headers: { Authorization: `bearer ${token}` },
    };
};

export const getAllBlocks = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export const createBlog = async (newObject) => {
    console.log(config());
    const response = await axios.post(baseUrl, newObject, config());
    return response.data;
};

export const updateLikes = async (id, newObject) => {
    const request = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return request.data;
};

export const deleteBlog = async (id) => {
    const request = await axios({
        method: 'DELETE',
        url: `${baseUrl}/${id}`,
        headers: { Authorization: token },
    });
    return request.data;
};
