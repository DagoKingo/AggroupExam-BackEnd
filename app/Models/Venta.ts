import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Cliente from "./Cliente";
import Articulo from "./Articulo";

export default class Venta extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public cliente_id: number;

  @column()
  public total: number;

  @column()
  public sub_total: number;

  @column()
  public iva: number;

  @column()
  public fecha: Date;

  @belongsTo(() => Cliente, { foreignKey: "cliente_id" })
  public cliente: BelongsTo<typeof Cliente>;

  @manyToMany(() => Articulo, {
    pivotTable: "ventas_articulos",
    localKey: "id",
    pivotForeignKey: "venta_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "articulo_id",
  })
  public articulos: ManyToMany<typeof Articulo>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
