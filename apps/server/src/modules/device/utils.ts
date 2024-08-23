import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
@Injectable()
export class DeviceUtil {
  private keyEncryption = crypto.createHash('sha256').digest('hex'); // AES-256 requires a 32-byte key
  private iv = crypto.createHash('sha224').digest('hex'); // Initialization vector

  encrypt() {
    const combined = `${this.keyEncryption}:${this.iv}`;
    // Hash the combined string using a cryptographic hash function
    const hash = crypto.createHash('sha256').update(combined).digest('hex');

    // Convert the first part of the hash to a six-digit code
    const code = parseInt(hash.slice(0, 6), 16) % 1000000;
    // Ensure the code is six digits by padding with zeros if necessary
    return code.toString().padStart(6, '0');
  }

  decrypt(code: number) {
    return code == Number(this.encrypt());
  }
}
