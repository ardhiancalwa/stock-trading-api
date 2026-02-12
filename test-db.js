"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
async function main() {
    console.log('Testing connection...');
    try {
        await prisma.$connect();
        console.log('Connected successfully!');
        const count = await prisma.user.count();
        console.log(`User count: ${count}`);
    }
    catch (error) {
        console.error('Connection failed:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
