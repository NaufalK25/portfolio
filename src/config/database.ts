import { connect } from 'mongoose';

connect(
    process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio',
    (err) => {
        if (!err) {
            console.log('MongoDB Connection Succeeded.');
        } else {
            console.log(`Error on DB connection: ${err}`);
        }
    }
);
