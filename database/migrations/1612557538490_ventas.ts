import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Ventas extends BaseSchema {
  protected tableName = "ventas";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("cliente_id").unsigned();
      table.foreign("cliente_id").references("id").inTable("clientes");
      table.date("fecha");
      table.float("total");
      table.float("sub_total");
      table.float("iva");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
