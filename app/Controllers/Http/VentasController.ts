import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import Venta from "App/Models/Venta";
import VentaArticulo from "App/Models/VentaArticulo";

export default class VentasController {
  public async index({ response }: HttpContextContract) {
    const ventas = await Venta.query()
      .preload("cliente")
      .preload("articulos")
      .paginate(1, 10);
    return response.status(200).json(ventas);
  }

  public async store({ request, response }: HttpContextContract) {
    //Creating request schema
    const postSchema = schema.create({
      cliente_id: schema.number(),
      articulos: schema.array().members(
        schema.object().members({
          id: schema.number(),
          nombre: schema.string(),
          precio: schema.number(),
          marca: schema.string(),
          pivot: schema
            .object()
            .members({ cantidad: schema.number(), importe: schema.number() }),
        })
      ),
    });
    //Validating request schema
    const validatedData = await request.validate({ schema: postSchema });

    const venta = new Venta();
    venta.cliente_id = validatedData.cliente_id;
    venta.fecha = new Date();
    venta.sub_total = validatedData.articulos.reduce(
      (total, article) => total + article.pivot.importe,
      0
    );
    venta.iva = venta.sub_total * 0.16;
    venta.total = venta.sub_total + venta.iva;
    await venta.save();

    await Promise.all(
      validatedData.articulos.map((articulo) =>
        VentaArticulo.create({
          venta_id: venta.id,
          articulo_id: articulo.id,
          cantidad: articulo.pivot.cantidad,
          importe: articulo.pivot.importe,
        })
      )
    );

    return response.json({
      message: "OK",
      data: await Venta.query()
        .preload("cliente")
        .preload("articulos")
        .where({ id: venta.id })
        .firstOrFail(),
    });
  }

  public async show({ response, params }: HttpContextContract) {
    const venta = await Venta.query()
      .preload("cliente")
      .preload("articulos")
      .where({ id: params.id })
      .firstOrFail();

    return response.status(200).json({
      message: "OK",
      data: venta,
    });
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
