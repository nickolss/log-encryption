import { Injectable } from '@nestjs/common';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'crypto';
import { DecryptLogDto } from './dto/decryptLog';

@Injectable()
export class LogService {
  private algorithm = 'aes-256-cbc';

  encryptLog(log: Record<string, any>, secret: string): string {
    const iv = randomBytes(16);
    const secretKey = scryptSync(secret, 'salt', 32);

    const cipher = createCipheriv(this.algorithm, secretKey, iv);
    const json = JSON.stringify(log);
    let encrypted = cipher.update(json, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  decryptLog(cryptLog: DecryptLogDto, secret: string): Record<string, any> {
    const [ivHex, encryptedLog] = cryptLog.encryptedLog.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const secretKey = scryptSync(secret, 'salt', 32);

    const decipher = createDecipheriv(this.algorithm, secretKey, iv);
    let decrypted = decipher.update(encryptedLog, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  }
}
