import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1687765522028 implements MigrationInterface {
  name = 'Auto1687765522028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "isStopLesson" SET DEFAULT 'false'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "isStopLesson" SET DEFAULT false`);
  }
}
