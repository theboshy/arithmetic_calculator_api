import { configDotEnv } from './env.config';

describe('configDotEnv', () => {
    it('should load .env.dev file when NODE_ENV is "dev"', () => {
        // Establece el valor de la variable de entorno NODE_ENV
        process.env.NODE_ENV = 'dev';
        configDotEnv();
        // Comprueba que la variable de entorno se ha cargado correctamente
        expect(process.env.IS_OFFLINE).toBeTruthy()
    });
});
