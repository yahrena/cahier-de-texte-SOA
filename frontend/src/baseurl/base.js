// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
const base = axios.create({
// .. where we make our configurations
    // baseURL: 'http://3.94.122.44:3700/api'
    baseURL: 'http://localhost:3001/api'
});


export default base;