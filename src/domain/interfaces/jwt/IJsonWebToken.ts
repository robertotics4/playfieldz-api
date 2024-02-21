import { Jwt, Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';

export interface IJsonWebToken {
  sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: Secret,
    options?: SignOptions | undefined,
  ): string;
  verify(
    token: string,
    secretOrPublicKey: Secret,
    options: VerifyOptions & {
      complete: true;
    },
  ): Jwt;
  getTokenExpirationInSeconds(): number;
}
