import {MigrationInterface, QueryRunner} from "typeorm";

export class BaseMigrations1663419097087 implements MigrationInterface {
    name = 'BaseMigrations1663419097087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "nickname" character varying(30) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "refresh_token" character varying, "refresh_token_expires" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname"), CONSTRAINT "PK_6e20ce1edf0678a09f1963f9587" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, "sortOrder" integer NOT NULL DEFAULT '0', "creatorUid" uuid, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_tags_tags" ("usersUid" uuid NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_03f9bd1d83d678405758e898305" PRIMARY KEY ("usersUid", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_885173c25dbb21898a9b869f4a" ON "users_tags_tags" ("usersUid") `);
        await queryRunner.query(`CREATE INDEX "IDX_9de46fe02d9d7488f92bedf417" ON "users_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_23e538a96d00b0171429673b44a" FOREIGN KEY ("creatorUid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_tags_tags" ADD CONSTRAINT "FK_885173c25dbb21898a9b869f4ae" FOREIGN KEY ("usersUid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_tags_tags" ADD CONSTRAINT "FK_9de46fe02d9d7488f92bedf4176" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_tags_tags" DROP CONSTRAINT "FK_9de46fe02d9d7488f92bedf4176"`);
        await queryRunner.query(`ALTER TABLE "users_tags_tags" DROP CONSTRAINT "FK_885173c25dbb21898a9b869f4ae"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_23e538a96d00b0171429673b44a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9de46fe02d9d7488f92bedf417"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_885173c25dbb21898a9b869f4a"`);
        await queryRunner.query(`DROP TABLE "users_tags_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
