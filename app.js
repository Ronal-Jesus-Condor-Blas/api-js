const express = require('express');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { nombre } = req.body;
  db.run('INSERT INTO usuarios(nombre) VALUES(?)', [nombre], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, nombre });
  });
});

app.listen(PORT, () => {
  console.log(`API ejecutándose en http://localhost:${PORT}`);
});
