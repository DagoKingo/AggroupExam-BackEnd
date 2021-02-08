import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class VentasArticulos extends BaseSchema {
  protected tableName = "ventas_articulos";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("venta_id").unsigned();
      table.foreign("venta_id").references("id").inTable("ventas");
      table.integer("articulo_id").unsigned();
      table.foreign("articulo_id").references("id").inTable("articulos");
      table.integer("cantidad");
      table.float("importe");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
