const express = require('express');
const connectDB = require('./config/keys')

const app = express();

connectDB();

app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/Users'))
app.use('/api/qr', require('./routes/api/QR'))
app.use('/api/auth', require('./routes/api/Auth'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));