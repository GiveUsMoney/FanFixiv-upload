import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { api } from '../utils/api';
import { Profile } from '@src/dto/profile.dto';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Promise<Profile | null> => {
    const { authorization } = ctx.switchToHttp().getRequest<Request>().headers;

    if (authorization == null) return null;

    if (process.env.NODE_ENV === 'test') {
      return new Promise<Profile>((res) => {
        res({
          email: 'example@example.com',
          nickname: 'test',
          profile_img: null,
          descript: 'test',

          nn_md_date: '2022-10-17',
          birth: '2000-01-01',
          _tr: false,
        } as Profile);
      });
    }

    //TODO: 후일 localhost에서 인증서버의 주소로 변경할 것.
    return api<Profile>('http://localhost:8080/profile', {
      headers: { authorization },
    }).catch(() => null);
  },
);
