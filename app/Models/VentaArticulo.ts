import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class VentaArticulo extends BaseModel {
  public static table = "ventas_articulos";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public venta_id: number;

  @column()
  public articulo_id: number;

  @column()
  public cantidad: number;

  @column()
  public importe: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
