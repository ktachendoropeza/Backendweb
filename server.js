const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado exitosamente a la Base de Datos'))
  .catch(err => console.error('Error al conectar a la BD:', err));

// Definición del Schema y Modelo
const TareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  url: { type: String, required: true }
}, { versionKey: false });

const Tarea = mongoose.model('Tarea', TareaSchema, 'tareas');

// Endpoint GET requerido
app.get('/api/tareas', async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas', error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});
