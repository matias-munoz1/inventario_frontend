// src/bookService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/books'; // Asegúrate de que esta URL apunta a tu backend

export const getBooks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
};
