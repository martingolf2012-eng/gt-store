const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = 3000;

// Tu clave secreta de Volsever
const VOLSEVER_API_KEY = 'pk_live_Ef4IYcFG2dDU71UxgD6oMU10pCjNpwGm';

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Ruta para verificar el ID de Free Fire usando la API de Volsever
app.get('/api/verificar-id', async (req, res) => {
    const playerId = req.query.id;
    if (!playerId) {
        return res.status(400).json({ status: false, message: 'Falta el ID de jugador' });
    }

    try {
        const response = await fetch(`https://gate.volsever.com/proxy/api/game/free-fire-global?id=${playerId}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': VOLSEVER_API_KEY
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error al conectar con Volsever' });
    }
});

app.listen(PORT, () => {
    console.log(`🔥 Servidor de GT.STORE corriendo en http://localhost:${PORT}`);
});