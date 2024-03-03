import { INestApplication } from '@nestjs/common';

import cors from './cors';
import prefix from './prefix';
import helmet from './helmet';
import swagger from './swagger';

export function middlewares(app: INestApplication) {
  cors(app);
  helmet(app);
  prefix(app);
  swagger(app);
}
