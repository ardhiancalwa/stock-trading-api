import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma';
import { RegisterDto, LoginDto } from './dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        id: string;
        email: string;
        fullName: string;
        createdAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
