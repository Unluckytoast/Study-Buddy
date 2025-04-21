const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./db/database');

const userRoutes = require('./routes/users');
const groupRoutes = require('./routes/groups');
const memberRoutes = require('./routes/members');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const flashcardRoutes = require('./routes/flashcards');

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,              
}));
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/flashcards', flashcardRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
