import express from 'express';
import dotenv from 'dotenv';

import usersRouter from './routes/users.js';
import roomsRouter from './routes/rooms.js';
import reservationsRouter from './routes/reservations.js';


const express = require('express');
const app = express();

app.get('/' ,(req,res) => {
    res.send("HELLO");
});

app.listen(3000, ()=>console.log('listening on port 3000...'));