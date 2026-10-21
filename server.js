const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const API_KEY = 'pk_live_Ef4IYcFG2dDU71UxgD6oMU10pCjNpwGm';

// Ruta para verificar jugadores de Free Fire con Volsever
app.get('/api/check-player', async (req, res) => {
    const playerId = req.query.id;
    if (!playerId) {
        return res.status(400).json({ status: false, message: 'Falta el ID del jugador' });
    }

    try {
        const response = await fetch(`https://gate.volsever.com/proxy/api/game/free-fire-global?id=${playerId}`, {
            method: 'GET',
            headers: { 'X-API-KEY': API_KEY }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error al conectar con la API' });
    }
});

// Ruta para verificar descuentos / cupones
app.get('/api/check-discounts', async (req, res) => {
    try {
        const response = await fetch('https://gate.volsever.com/api/check-discounts', {
            method: 'POST',
            headers: { 
                'X-API-KEY': API_KEY,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error al verificar descuentos' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de GT.STORE corriendo en el puerto ${PORT}`);
});