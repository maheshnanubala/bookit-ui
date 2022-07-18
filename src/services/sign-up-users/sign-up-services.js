import axios from 'axios';

const uri = `http://localhost:4000/api`;

export const registerUser = async (user) => {
    try {
        return await axios.post(uri + '/sign-up', user);

    } catch (error) {
        console.log(error?.message);
        return;
    }
}