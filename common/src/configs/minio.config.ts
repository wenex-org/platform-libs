import { S3Client } from '@aws-sdk/client-s3';
import { AUTO_CONTENT_TYPE } from 'multer-s3';
import * as crypto from 'crypto';
import { extname } from 'path';

export function MINIO_OPTIONS() {
  const region = 'us-east-1';
  const host = process.env.MINIO_HOST ?? 'localhost';
  const port = parseInt(process.env.MINIO_PORT ?? '9000');
  const ssl = process.env.MINIO_SSL?.toLowerCase() === 'true';
  const accessKeyId = process.env.MINIO_ACCESS_KEY ?? 'minioadmin';
  const secretAccessKey = process.env.MINIO_SECRET_KEY ?? 'minioadmin';

  const url = `http${ssl ? 's' : ''}://${host}:${port}`;

  const s3 = new S3Client({
    apiVersion: 'v4',
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: true,
    endpoint: url,
    region,
  });

  const key = (
    request: any,
    file: Express.Multer.File,
    cb: (err: any, mime?: string, stream?: any) => void,
  ) => {
    const { uid, cid } = request.token;

    const suffix = crypto.randomInt(1e9);
    const prefix = uid ? [cid, uid].join('/') : cid;

    const fileName = `${prefix}/${crypto.randomUUID()}-${
      suffix + extname(file.originalname)
    }`;

    cb(null, fileName);
  };

  return {
    region,
    CONFIG: { ssl, host, port, accessKeyId, secretAccessKey, url },
    PRIVATE_STORAGE: {
      s3,
      key,
      acl: 'private',
      contentType: AUTO_CONTENT_TYPE,
      bucket: process.env.MINIO_PRIVATE_BUCKET ?? 'private',
    },
    PUBLIC_STORAGE: {
      s3,
      key,
      acl: 'public-read',
      contentType: AUTO_CONTENT_TYPE,
      bucket: process.env.MINIO_PUBLIC_BUCKET ?? 'public',
    },
  };
}
