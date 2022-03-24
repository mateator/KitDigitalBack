import config from 'config';
import { sign } from 'jsonwebtoken';
import { HttpException } from 'exceptions/HttpException';
import { DataStoredInToken, TokenData } from 'interfaces/auth.interface';
import { isEmpty } from 'utils/util';
import prisma from 'prisma';
import { UserDTO } from 'dtos/user.dto';

class AuthService {
  public users = prisma.user;

  public async login(userData: UserDTO): Promise<{ cookie: string; findUser }> {
    if (isEmpty(userData)) throw new HttpException(401, 'no se han recibido datos');

    const findUser = await this.users.findMany({
      where: { email: userData.email, password: userData.password },
      select: {
        rol: true,
        delegacionId: true,
      },
    });

    if (isEmpty(findUser)) throw new HttpException(401, 'login incorrecto');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public createToken(user): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    // return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    return `${tokenData.token}`;
  }
}

export default AuthService;
