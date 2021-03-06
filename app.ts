import dotenv from 'dotenv';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { baseUrl, port } from './src/config/constants';
import router from './src/routes/index.route';

// Get all environment variables
dotenv.config();

const app = express();

// Third Party Middlewares
app.set('views', 'src/views');
app.set('view engine', 'ejs');
app.use(expressLayouts);
// Express Middlewares
app.use(express.static('public'));
app.use(express.static('dist/public'));

// Connect to database
require('./src/config/database');

// Routes
app.use(router);

// Start server
app.listen(port, () => {
    console.log(`Portfolio is listening to ${baseUrl}`);
});
