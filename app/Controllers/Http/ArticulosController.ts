import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Articulo from "App/Models/Articulo";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class ArticulosController {
  public async index({ response }: HttpContextContract) {
    const articles = await Articulo.query().paginate(1, 10);
    return response.status(200).json(articles);
  }

  public async store({ request, response }: HttpContextContract) {
    //Creating request schema
    const postSchema = schema.create({
      nombre: schema.string(),
      precio: schema.number(),
    });
    //Validating request schema
    const validatedData = await request.validate({ schema: postSchema });

    const article = await Articulo.create({
      nombre: validatedData.nombre,
      precio: validatedData.precio,
    });

    return response.status(200).json({
      message: "Articulo creado",
      data: article,
    });
  }

  public async show({ response, params }: HttpContextContract) {
    const id = params.id;
    const article = await Articulo.findOrFail(id);

    return response.status(200).json({
      message: "OK",
      data: article,
    });
  }

  public async update({ request, response, params }: HttpContextContract) {
    //Creating request schema
    const postSchema = schema.create({
      nombre: schema.string(),
      precio: schema.number(),
    });
    //Validating request schema
    const validatedData = await request.validate({ schema: postSchema });

    const article = await Articulo.findOrFail(params.id);
    article.nombre = validatedData.nombre;
    article.precio = validatedData.precio;
    article.save();

    return response.status(200).json({
      message: "Articulo modificado",
      data: article,
    });
  }

  public async destroy({ response, params }: HttpContextContract) {
    const article = await Articulo.findOrFail(params.id);
    article.delete();

    return response.json({
      message: "Articulo eliminado",
    });
  }
}
