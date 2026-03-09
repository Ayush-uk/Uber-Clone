import http from 'http';
import app from './app.js';

const port = process.env.PORT || 8080;

const sever = http.createServer(app);
sever.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});
