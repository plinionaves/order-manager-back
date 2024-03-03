import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/nest/app.module';
import { expectedAllocations } from '../mocks';

describe('AllocationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/allocations (GET)', () => {
    test('should return a empty list', async () => {
      return request(app.getHttpServer())
        .get('/allocations')
        .expect(HttpStatus.OK)
        .expect({
          data: [],
          meta: {
            hasNextPage: false,
            hasPreviousPage: false,
            total: 0,
          },
        });
    });

    test('should return a list of allocations', async () => {
      await request(app.getHttpServer())
        .post('/allocations')
        .expect(HttpStatus.CREATED);

      return request(app.getHttpServer())
        .get('/allocations')
        .query({ page: 1, pageSize: 10 })
        .expect(HttpStatus.OK)
        .expect({
          data: expectedAllocations,
          meta: {
            hasNextPage: false,
            hasPreviousPage: false,
            total: expectedAllocations.length,
          },
        });
    });
  });
});
