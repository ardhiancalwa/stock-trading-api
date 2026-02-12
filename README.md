# Simple Stock Trading API 🚀

Backend service untuk simulasi trading saham dengan implementasi **Modular Monolith** dan **ACID Transactions**.

## 🛠 Tech Stack
- **Framework:** NestJS (Express)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT (Passport)
- **Testing:** Jest & Supertest (E2E)

## 🏗 Architecture Decision
Project ini menggunakan pattern **Modular Monolith** dengan pendekatan **Service-Repository**.

### Mengapa Pattern ini?
1. **Modular Monolith:** Struktur aplikasi dibagi berdasarkan domain bisnis (`stocks`, `trade`, `watchlist`). Ini memudahkan *scalability* (misal: memisahkan service trade menjadi microservice) tanpa kerumitan infrastruktur di awal.
2. **Separation of Concerns:** Logika terpisah rapi antara Module, Controller, dan Service.
3. **Explicit Transaction Management (ACID):** Pada modul `trade`, kami menerapkan transaksi database atomik. Jika debit saldo berhasil tapi kredit saham gagal, seluruh operasi di-*rollback* untuk menjaga integritas data keuangan.

## 📂 Folder Structure
```
src/
├── app.module.ts
├── main.ts
├── common/
│   ├── decorators/     # Custom decorators (@CurrentUser)
│   └── guards/         # Auth guards (JwtAuthGuard)
├── prisma/             # Prisma Service
└── modules/
    ├── auth/           # Login & Register logic
    ├── stocks/         # Stock CRUD logic (Admin)
    ├── watchlist/      # Watchlist CRUD logic (User)
    ├── trade/          # Buy/Sell Transactional logic
    └── portfolio/      # Read-only portfolio view
```

## 🧪 Testing Strategy
Project ini dilengkapi E2E Testing yang mencakup:
- **Auth Flow:** Register & Login.
- **CRUD Operations:** Watchlist management (Create, Read, Update, Delete).
- **Transactional Logic:** Simulasi Buy/Sell saham dengan validasi saldo.

## 🚀 How to Run

### Prerequisites
- Node.js >= 18
- Docker Desktop (for PostgreSQL)

### Setup
1. Clone repository dan masuk ke folder:
   ```bash
   cd stock-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan PostgreSQL via Docker:
   ```bash
   docker-compose up -d
   ```

4. Jalankan migrasi database:
   ```bash
   npx prisma migrate dev
   ```

5. Jalankan development server:
   ```bash
   npm run start:dev
   ```

6. API akan berjalan di: `http://localhost:3000` (Database di port 5433)

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register user baru |
| POST | `/auth/login` | Login & dapat token |

### Stocks (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/stocks` | Tambah saham baru |
| GET | `/stocks` | Lihat semua saham |
| PATCH | `/stocks/:symbol` | Update saham |
| DELETE | `/stocks/:symbol` | Soft delete saham |

### Watchlist (User)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/watchlist` | Tambah ke watchlist |
| GET | `/watchlist` | Lihat watchlist user |
| PATCH | `/watchlist/:id` | Update target price |
| DELETE | `/watchlist/:id` | Hapus dari watchlist |

### Trade
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/trade/buy` | Beli saham |
| POST | `/trade/sell` | Jual saham |
| GET | `/portfolio` | Lihat saldo & aset |

## 🧪 Running Tests
```bash
# E2E Tests
npm run test:e2e
```

## 📋 Environment Variables
Copy `.env.example` ke `.env` dan sesuaikan:
```
DATABASE_URL="postgresql://postgres:123123@localhost:5433/stock_trading_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="24h"
```
