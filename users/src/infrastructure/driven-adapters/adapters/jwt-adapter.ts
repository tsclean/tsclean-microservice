import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import {IEncryptRepository} from "@/domain/models/contracts/encrypt-repository";

dotenv.config({ path: ".env" });

export class JwtAdapter implements IEncryptRepository {
    async encrypt(text: string | number): Promise<string> {
        return jwt.sign({id: text}, process.env.JWT_SECRET);
    }
}