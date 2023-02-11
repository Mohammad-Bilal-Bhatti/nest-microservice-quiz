import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1676156897007 implements MigrationInterface {
  name = 'Seed1676156897007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO \`flim\` (\`id\`, \`title\`, \`director\`, \`release_year\`, \`actors\`) VALUES
      (1,	'SpiderMan',	'Bruce',	1880,	'Tom,Herry'),
      (2,	'Age of Tomorrow',	'Ben',	1980,	'Tom,Cruse'),
      (3,	'King Kong',	'Denny',	2010,	'Kem,Jason')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`flim\` WHERE id IN (1, 2, 3)`);
  }
}