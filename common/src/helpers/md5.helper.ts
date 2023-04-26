// eslint-disable-next-line @typescript-eslint/no-var-requires
const CryptoJS = require('crypto-js');

export class MD5 {
  static hash(text: string): string {
    return CryptoJS.MD5(text).toString();
  }
}
