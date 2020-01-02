import axios from 'axios';

const instance = axios.create( {
    baseURL: 'https://burgerbuilder-7586f.firebaseio.com/'
} );

export default instance;