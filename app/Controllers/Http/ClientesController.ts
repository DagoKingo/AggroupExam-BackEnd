import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Cliente from "App/Models/Cliente";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class ClientesController {
  public async index({ response }: HttpContextContract) {
    const users = await Cliente.query().paginate(1, 10);
    return response.status(200).json(users);
  }

  public async store({ request, response }: HttpContextContract) {
    //Creating request schema
    const postSchema = schema.create({
      nombre: schema.string(),
      apellidos: schema.string(),
    });
    //Validating request schema
    const validatedData = await request.validate({ schema: postSchema });

    const client = await Cliente.create({
      nombre: validatedData.nombre,
      apellidos: validatedData.apellidos,
    });

    return response.status(200).json({
      message: "OK",
      client,
    });
  }

  public async show({ response, params }: HttpContextContract) {
    const id = params.id;
    const cliente = await Cliente.findOrFail(id);

    return response.json({
      message: "OK",
      data: cliente,
    });
  }

  public async update({ request, response, params }: HttpContextContract) {
    //Creating request schema
    const putSchema = schema.create({
      nombre: schema.string(),
      apellidos: schema.string(),
    });
    //Validating request schema
    const validatedData = await request.validate({ schema: putSchema });

    const client = await Cliente.findOrFail(params.id);
    client.nombre = validatedData.nombre;
    client.apellidos = validatedData.apellidos;
    client.save();

    return response.status(200).json({
      message: "Client modified",
      data: client,
    });
  }

  public async destroy({ response, params }: HttpContextContract) {
    const client = await Cliente.findOrFail(params.id);
    await client.delete();

    return response.json({
      message: "Client deleted",
    });
  }
}
