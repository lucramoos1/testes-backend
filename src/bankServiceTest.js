const bankService = require('./bankService');

describe('bankService.transfer', () => {
    // Cenário Positivo: Caminho Feliz
    test('deve transferir valor corretamente entre usuários', () => {
        const result = bankService.transfer(1, 2, 100);
        
        expect(result.success).toBe(true);
        expect(result.newSenderBalance).toBe(900);
        expect(bankService.getBalance(1)).toBe(900);
        expect(bankService.getBalance(2)).toBe(600);
    });

    // Cenário Negativo: Saldo Insuficiente
    test('deve permitir saldo negativo (falha no código atual)', () => {
        bankService.transfer(1, 2, 1500);
        expect(bankService.getBalance(1)).toBeLessThan(0);
    });

    // Teste de Limite: Valor Zero
    test('deve rejeitar transferência de valor zero', () => {
        expect(() => {
            bankService.transfer(1, 2, 0);
        }).toThrow();
    });

    // Teste de Limite: Valor Negativo
    test('deve rejeitar transferência com valor negativo', () => {
        expect(() => {
            bankService.transfer(1, 2, -100);
        }).toThrow();
    });

    // Teste de Entrada: Usuário Inexistente
    test('deve lançar erro quando usuário não existe', () => {
        expect(() => {
            bankService.transfer(999, 2, 100);
        }).toThrow("Usuário não encontrado");
    });
});