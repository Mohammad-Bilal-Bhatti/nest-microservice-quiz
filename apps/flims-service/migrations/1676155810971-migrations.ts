import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1676155810971 implements MigrationInterface {
    name = 'migrations1676155810971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`flim\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`director\` varchar(255) NOT NULL, \`release_year\` int NOT NULL, \`actors\` text NOT NULL, UNIQUE INDEX \`IDX_e0ff0e40107fc3c04e0526bd07\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e0ff0e40107fc3c04e0526bd07\` ON \`flim\``);
        await queryRunner.query(`DROP TABLE \`flim\``);
    }

}
