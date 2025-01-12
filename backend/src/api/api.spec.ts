import request from 'supertest';
import app from '.';
import { validatePixelGrid } from '../validate';
import { draw } from '../draw';
import { Server } from 'http';

jest.mock('../draw', () => ({
  draw: jest.fn(),
}));

jest.mock('../validate', () => ({
  validatePixelGrid: jest.fn(),
}));

describe('api', () => {
  let server: Server;

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  describe('/ping', () => {
    it('should return pong', async () => {
      const response = await request(app).get('/api/ping');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ response: 'pong' });
    });
  });

  describe('/draw', () => {
    it('should return 400 if pixels are missing', async () => {
      const response = await request(app).post('/api/draw');
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Request body must contain pixels grid',
      });
    });

    it('should return 400 if pixels are invalid', async () => {
      (validatePixelGrid as jest.Mock).mockReturnValue(false);
      const response = await request(app)
        .post('/api/draw')
        .send({ pixels: [] });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error:
          'Request body pixels grid does not have the correct dimensions. Required: 64 x 64',
      });
    });

    it('should return 500 if draw fails', async () => {
      (validatePixelGrid as jest.Mock).mockReturnValue(true);
      (draw as jest.Mock).mockReturnValue(false);
      const response = await request(app)
        .post('/api/draw')
        .send({ pixels: [] });
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to update image' });
    });

    it('should return 200 if draw succeeds', async () => {
      (validatePixelGrid as jest.Mock).mockReturnValue(true);
      (draw as jest.Mock).mockReturnValue(true);
      const response = await request(app)
        .post('/api/draw')
        .send({ pixels: [] });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ response: 'Image successfully updated' });
    });
  });
});
