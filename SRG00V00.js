const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Serves SRG00V00.html and assets

app.post('/api/contact', (req, res) => {
    const { email, message } = req.body;
    // Here you would process/store/send the message (e.g., save to DB, send email)
    console.log(`Contact from ${email}: ${message}`);
    res.json({ status: 'Message received! Thank you.' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

