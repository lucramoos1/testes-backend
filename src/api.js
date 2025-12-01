const express = require('express');
const bankService = require('./bankService');
const app = express();

app.use(express.json());

app.post('/transfer', (req, res) => {
    try {
        const { senderId, receiverId, amount } = req.body;
        
        // Validação de dados incompletos
        if(!senderId || !receiverId || !amount) {
            return res.status(400).json({ error: "Dados incompletos" });
        }

        const result = bankService.transfer(senderId, receiverId, amount);
        res.status(200).json(result);

    } catch (error) {
        // Todos os erros de validação retornam 400
        res.status(400).json({ error: error.message });
    }
});

module.exports = app;