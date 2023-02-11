import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1676156187058 implements MigrationInterface {
  name = 'Seed1676156187058';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO \`user\` (\`id\`, \`email\`, \`password\`, \`name\`, \`age\`, \`location\`) VALUES
      (1,	'jhon@domain.com',	'$2b$10$OEn0DfewcNRvT13Ihll8Qu2T7ekUK8nHt/cWPUMZ0fviDbABDlIde',	'jhon',	22,	'united states'),
      (2,	'smith@domain.com',	'$2b$10$eiYn3nd/6jzUVMkgOpRbM.OqP5K9aJOl0TLcS6A9ykeSaNXbee5au',	'smith',	25,	'germoney'),
      (3,	'ali@domain.com',	'$2b$10$MtbQXoou93I8cYBfU5njHe2nsdTSfJbR7wD2m8aHxGBgsPnGsD3FW',	'ali',	26,	'pakistan')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`user\` WHERE id IN (1, 2, 3)`);
  }
}