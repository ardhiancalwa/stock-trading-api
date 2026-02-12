import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma';

describe('Stock Trading API (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken: string;
  let userId: string;
  let watchlistId: string;

  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    full_name: 'Test User',
  };

  const testStock = {
    symbol: 'BBCA',
    company_name: 'Bank Central Asia',
    current_price: 9500,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    prisma = app.get<PrismaService>(PrismaService);
    await app.init();

    await prisma.transaction.deleteMany({});
    await prisma.portfolio.deleteMany({});
    await prisma.watchlist.deleteMany({});
    await prisma.wallet.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.stock.deleteMany({});
  });

  afterAll(async () => {
    await prisma.transaction.deleteMany({});
    await prisma.portfolio.deleteMany({});
    await prisma.watchlist.deleteMany({});
    await prisma.wallet.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.stock.deleteMany({});
    await app.close();
  });

  describe('Auth Flow', () => {
    it('POST /auth/register - should register a new user with wallet', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);

      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.user.email).toBe(testUser.email);
      expect(response.body.user.fullName).toBe(testUser.full_name);

      const wallet = await prisma.wallet.findFirst({
        where: { user: { email: testUser.email } },
      });
      expect(wallet).toBeDefined();
      expect(Number(wallet.balance)).toBe(0);
    });

    it('POST /auth/register - should reject duplicate email', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(409);
    });

    it('POST /auth/login - should login and return access_token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200);

      expect(response.body.access_token).toBeDefined();
      accessToken = response.body.access_token;
    });

    it('POST /auth/login - should reject invalid credentials', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });

  describe('Stocks CRUD', () => {
    it('POST /stocks - should create a new stock', async () => {
      const response = await request(app.getHttpServer())
        .post('/stocks')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(testStock)
        .expect(201);

      expect(response.body.symbol).toBe(testStock.symbol);
      expect(response.body.companyName).toBe(testStock.company_name);
    });

    it('GET /stocks - should list all stocks', async () => {
      const response = await request(app.getHttpServer())
        .get('/stocks')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('PATCH /stocks/:symbol - should update stock details', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/stocks/${testStock.symbol}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ current_price: 10000 })
        .expect(200);

      expect(Number(response.body.currentPrice)).toBe(10000);
    });

    it('GET /stocks - should require authentication', async () => {
      await request(app.getHttpServer())
        .get('/stocks')
        .expect(401);
    });
  });

  describe('Watchlist CRUD Flow', () => {
    it('POST /watchlist - should add stock to watchlist', async () => {
      const response = await request(app.getHttpServer())
        .post('/watchlist')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          stock_symbol: testStock.symbol,
          target_price: 11000,
          notes: 'Target untuk Q2',
        })
        .expect(201);

      expect(response.body.stockSymbol).toBe(testStock.symbol);
      expect(Number(response.body.targetPrice)).toBe(11000);
      watchlistId = response.body.id;
    });

    it('POST /watchlist - should reject duplicate watchlist entry', async () => {
      await request(app.getHttpServer())
        .post('/watchlist')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          stock_symbol: testStock.symbol,
          target_price: 12000,
        })
        .expect(409);
    });

    it('GET /watchlist - should return user watchlist', async () => {
      const response = await request(app.getHttpServer())
        .get('/watchlist')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].stockSymbol).toBe(testStock.symbol);
    });

    it('PATCH /watchlist/:id - should update target price', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/watchlist/${watchlistId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ target_price: 12000, notes: 'Updated notes' })
        .expect(200);

      expect(Number(response.body.targetPrice)).toBe(12000);
      expect(response.body.notes).toBe('Updated notes');
    });

    it('DELETE /watchlist/:id - should remove from watchlist', async () => {
      await request(app.getHttpServer())
        .delete(`/watchlist/${watchlistId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      const response = await request(app.getHttpServer())
        .get('/watchlist')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.length).toBe(0);
    });
  });

  describe('Trading Flow', () => {
    beforeAll(async () => {
      const user = await prisma.user.findUnique({
        where: { email: testUser.email },
      });
      await prisma.wallet.update({
        where: { userId: user.id },
        data: { balance: 100000 },
      });
    });

    it('GET /portfolio - should show wallet balance and empty portfolio', async () => {
      const response = await request(app.getHttpServer())
        .get('/portfolio')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(Number(response.body.balance)).toBe(100000);
      expect(response.body.assets).toEqual([]);
    });

    it('POST /trade/buy - should execute buy order successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/trade/buy')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          stock_symbol: testStock.symbol,
          quantity: 5,
        })
        .expect(201);

      expect(response.body.message).toBe('Buy order executed successfully');
      expect(response.body.transaction.type).toBe('BUY');
      expect(response.body.transaction.quantity).toBe(5);

      const portfolioResponse = await request(app.getHttpServer())
        .get('/portfolio')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(Number(portfolioResponse.body.balance)).toBe(50000);
      expect(portfolioResponse.body.assets.length).toBe(1);
      expect(portfolioResponse.body.assets[0].total_shares).toBe(5);
    });

    it('POST /trade/buy - should reject when insufficient balance', async () => {
      const response = await request(app.getHttpServer())
        .post('/trade/buy')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          stock_symbol: testStock.symbol,
          quantity: 100, // 100 * 10000 = 1,000,000 > 50,000 available
        })
        .expect(400);

      expect(response.body.message).toBe('Insufficient balance');

      const portfolioResponse = await request(app.getHttpServer())
        .get('/portfolio')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(Number(portfolioResponse.body.balance)).toBe(50000);
    });

    it('POST /trade/sell - should execute sell order successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/trade/sell')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          stock_symbol: testStock.symbol,
          quantity: 2,
        })
        .expect(201);

      expect(response.body.message).toBe('Sell order executed successfully');
      expect(response.body.transaction.type).toBe('SELL');
      expect(response.body.transaction.quantity).toBe(2);

      const portfolioResponse = await request(app.getHttpServer())
        .get('/portfolio')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(Number(portfolioResponse.body.balance)).toBe(70000);
      expect(portfolioResponse.body.assets[0].total_shares).toBe(3);
    });

    it('POST /trade/sell - should reject when insufficient shares', async () => {
      const response = await request(app.getHttpServer())
        .post('/trade/sell')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          stock_symbol: testStock.symbol,
          quantity: 100, // More than 3 shares owned
        })
        .expect(400);

      expect(response.body.message).toBe('Insufficient stock shares');
    });

    it('POST /trade/buy - should reject for non-existent stock', async () => {
      await request(app.getHttpServer())
        .post('/trade/buy')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          stock_symbol: 'NONEXISTENT',
          quantity: 1,
        })
        .expect(404);
    });
  });

  describe('Soft Delete Stock', () => {
    it('DELETE /stocks/:symbol - should soft delete stock', async () => {
      await request(app.getHttpServer())
        .delete(`/stocks/${testStock.symbol}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      const response = await request(app.getHttpServer())
        .get('/stocks')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      const deletedStock = response.body.find(
        (s: any) => s.symbol === testStock.symbol,
      );
      expect(deletedStock).toBeUndefined();
    });
  });
});
