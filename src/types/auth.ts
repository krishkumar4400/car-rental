

export interface UserPayload {
    userId: string;
}

// Extends the default jsonwebtoken JwtPayload type
import { JwtPayload } from 'jsonwebtoken';
export interface CustomJwtPayload extends JwtPayload, UserPayload { }
