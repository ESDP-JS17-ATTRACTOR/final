import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1685105918455 implements MigrationInterface {
  name = 'Auto1685105918455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "facebookId" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" character varying`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "country" character varying`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_a854e557b1b14814750c7c7b0c9"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "token" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "googleId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "googleId" character varying`);
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "video" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "isStopLesson" SET DEFAULT 'false'`);
    await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "purchase" ALTER COLUMN "purchasedAt" SET DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "purchase" ALTER COLUMN "purchasedAt" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "createdAt" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "isStopLesson" SET DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "lesson" ALTER COLUMN "video" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "googleId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "googleId" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "token" character varying(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_a854e557b1b14814750c7c7b0c9" UNIQUE ("token")`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "country" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookId"`);
  }
}
