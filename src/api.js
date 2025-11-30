const express = require('express');
const bankService = require('./bankService');
const app = express();

app.use(express.json());

app.post('/transfer', (req, res) => {
    try {
        const { senderId, receiverId, amount } = req.body;
        
        if(!senderId || !receiverId || !amount) {
            return res.status(400).json({ error: "Dados incompletos" });
        }

        const result = bankService.transfer(senderId, receiverId, amount);
        res.status(200).json(result);

    } catch (error) {
        if(error.message === "Usuário não encontrado")
        {
            return res.status(404).json({ error: error.message });
        }

        if (error.message.includes("Saldo insuficiente") || 
            error.message.includes("Valor deve ser")) {
            return res.status(400).json({ error: error.message });
        }

        // Tratamento de erro genérico
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;