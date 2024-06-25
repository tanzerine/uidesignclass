const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/ascii-art', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ascii-art.html'));
});

app.get('/ai-art', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ai-art.html'));
});

app.get('/personal', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'personal.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
