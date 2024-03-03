import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default function (app: INestApplication) {
  const configService = app.get(ConfigService);
  const env = configService.get('ENV');

  if (env !== 'prd') {
    const httpAdapter = app.getHttpAdapter();
    const swaggerCredentials = {
      name: configService.get('SWAGGER_USER'),
      pass: configService.get('SWAGGER_PASS'),
    };

    httpAdapter.use('/api', (req, res, next) => {
      function parseAuthHeader(input: string): { name: string; pass: string } {
        const [, encodedPart] = input.split(' ');

        if (!encodedPart) {
          return { name: null, pass: null };
        }

        const buff = Buffer.from(encodedPart, 'base64');
        const text = buff.toString('ascii');
        const [name, pass] = text.split(':');

        return { name, pass };
      }

      function unauthorizedResponse(): void {
        if (httpAdapter.getType() === 'fastify') {
          res.statusCode = 401;
          res.setHeader('WWW-Authenticate', 'Basic');
        } else {
          res.status(401);
          res.set('WWW-Authenticate', 'Basic');
        }

        next();
      }

      if (!req.headers.authorization) {
        return unauthorizedResponse();
      }

      const credentials = parseAuthHeader(req.headers.authorization);

      if (
        credentials?.name !== swaggerCredentials.name ||
        credentials?.pass !== swaggerCredentials.pass
      ) {
        return unauthorizedResponse();
      }

      next();
    });

    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Order Manager API')
      .setDescription(
        'The Order Manager API is a RESTful API that allows you to manage orders.',
      )
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
  }
}
