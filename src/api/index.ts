import axios from 'axios';

export const api = axios.create({
    // baseURL: `http://localhost:3500`
    baseURL: window.location.origin
})