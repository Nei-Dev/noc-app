import { envs } from './envs.plugin';

describe('Test envs.plugin', () => {

  beforeEach(() => {
    jest.resetModules();
  });

  test('should return envs options', () => {
    expect(envs).toBeDefined();
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'neibusdev@gmail.com',
      MAILER_SECRET_KEY: 'euempfzbhntqzwjq',
      PROD: false,
      MONGO_URL: 'mongodb://admin:123456789@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'admin',
      MONGO_PASS: '123456789'
    });
  });

  test('Shpuld return error if not found env', async () => {
    process.env.PORT = 'ABC';

    try{
      await import('./envs.plugin');
    } catch(error){
      expect(error).toBeInstanceOf(Error);
      expect(`${error}`).toContain(`should be a valid integer`);
    }
  })
});