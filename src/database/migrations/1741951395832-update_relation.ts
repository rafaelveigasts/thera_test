import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "products" (
        "id" SERIAL PRIMARY KEY,
        "nome" VARCHAR NOT NULL,
        "categoria" VARCHAR NOT NULL,
        "descricao" VARCHAR NOT NULL,
        "preco" FLOAT NOT NULL,
        "quantidade_estoque" INT NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "orders" (
        "id" SERIAL PRIMARY KEY,
        "total_pedido" FLOAT NOT NULL,
        "status" VARCHAR NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "orders_products" (
        "order_id" INT NOT NULL,
        "product_id" INT NOT NULL,
        PRIMARY KEY ("order_id", "product_id"),
        CONSTRAINT "fk_order" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE,
        CONSTRAINT "fk_product" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "orders_products"');
    await queryRunner.query('DROP TABLE "orders"');
    await queryRunner.query('DROP TABLE "products"');
  }
}
