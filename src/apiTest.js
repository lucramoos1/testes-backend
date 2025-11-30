const request = require('supertest');
const app = require('./api');

describe('POST /transfer', () => {
    // Cenário Positivo
    test('deve retornar 200 e realizar transferência com sucesso', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({ senderId: 1, receiverId: 2, amount: 100 });
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.newSenderBalance).toBe(900);
    });

    // Dados Incompletos
    test('deve retornar 400 quando falta o campo amount', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({ senderId: 1, receiverId: 2 });
        
        expect(response.status).toBe(400);
        expect(response.body.error).toContain("Dados incompletos");
    });

    // Usuário Inexistente - CORRIGIDO para 400
    test('deve retornar 400 quando usuário não existe', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({ senderId: 999, receiverId: 2, amount: 100 });
        
        expect(response.status).toBe(400);
        expect(response.body.error).toContain("Usuário não encontrado");
    });

    // Novo teste: Saldo insuficiente
    test('deve retornar 400 quando saldo é insuficiente', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({ senderId: 1, receiverId: 2, amount: 5000 });
        
        expect(response.status).toBe(400);
        expect(response.body.error).toContain("Saldo insuficiente");
    });

    // Novo teste: Valor negativo
    test('deve retornar 400 quando valor é negativo', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({ senderId: 1, receiverId: 2, amount: -100 });
        
        expect(response.status).toBe(400);
        expect(response.body.error).toContain("Valor deve ser");
    });
});