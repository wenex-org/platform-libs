import { AES_SECRET } from '../configs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CryptoJS = require('crypto-js');

export class AES {
  static encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, AES_SECRET()).toString();
  }

  static decrypt(cipherText: string): string {
    return CryptoJS.AES.decrypt(cipherText, AES_SECRET()).toString(
      CryptoJS.enc.Utf8,
    );
  }

  static verify(cipherText: string, text: string): boolean {
    return AES.decrypt(cipherText) === text;
  }
}
