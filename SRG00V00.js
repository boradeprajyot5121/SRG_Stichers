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

// Fade-in animation for service cards
document.addEventListener("DOMContentLoaded", function() {
    const services = document.querySelectorAll('.service');
    const reveal = () => {
        services.forEach(service => {
            const rect = service.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                service.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal();

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            document.body.classList.toggle('light-mode', this.checked);
            localStorage.setItem('theme', this.checked ? 'light' : 'dark');
        });
        // On load, set theme from localStorage
        const theme = localStorage.getItem('theme');
        if(theme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.checked = true;
        }
    }

    // Contact form submission
    const sendBtn = document.querySelector('button[onclick="sendContact()"]');
    if (sendBtn) {
        sendBtn.addEventListener('click', function() {
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, message })
            })
            .then(res => res.json())
            .then(data => alert(data.status))
            .catch(() => alert('Error sending message.'));
        });
    }
});
