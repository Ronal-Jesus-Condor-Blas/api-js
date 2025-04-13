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

// Eliminar un usuario por ID
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM usuarios WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});


app.listen(PORT, () => {
  console.log(`API ejecutándose en http://localhost:${PORT}`);
});
