import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'



dotenv.config();

const app = express();                                  // Calls express as a function
app .use(cors({
    orgin: "http://localhost:5173"
}));                                       // use cors as middleware
app.use(express.json({ limit: '50mb'}))                 // additional middleware
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', async (req, res) => {
    res.send('What up BroBro from DALL-E!');
})

const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, () => console.log('Server started on port 8080 '))
    } catch (error) {
        console.log(error)
    }
}

startServer();
