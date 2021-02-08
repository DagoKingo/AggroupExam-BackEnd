import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Articulos extends BaseSchema {
  protected tableName = "articulos";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("nombre");
      table.string("marca");
      table.float("precio");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
