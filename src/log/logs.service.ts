import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'crypto';

@Injectable()
export class LogService {
  private algorithm = 'aes-256-cbc';
  private secretKey: Buffer;
  private iv = randomBytes(16);

  constructor(private configService: ConfigService) {
    const secret = this.configService.get<string>('SECRET_KEY');
    if (!secret) {
      throw new Error('Secret key not found');
    }

    this.secretKey = scryptSync(secret, 'salt', 32);
  }

  encryptLog(log: Record<string, any>): string {
    const cipher = createCipheriv(this.algorithm, this.secretKey, this.iv);
    const json = JSON.stringify(log);
    let encrypted = cipher.update(json, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decryptLog(cryptLog: Record<string, string>): Record<string, any> {
    const decipher = createDecipheriv(this.algorithm, this.secretKey, this.iv);
    let decrypted = decipher.update(cryptLog.encryptedLog, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  }
}
