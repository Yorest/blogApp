import axios from 'axios';
const baseUrl = 'api/users/blogs';

const getBlogsUser = async (username) => {
    const response = await axios.post(baseUrl, { username });
    console.log(response.data)
    return response.data.blogs;
};

export default { getBlogsUser };
