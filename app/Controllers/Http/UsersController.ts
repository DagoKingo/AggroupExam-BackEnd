import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.query().paginate(1, 10);
    return response.status(200).json(users);
  }

  public async store({ request, response }: HttpContextContract) {
    const postSchema = schema.create({
      email: schema.string({}, [rules.email()]),
      password: schema.string({}, [rules.confirmed()]),
    });
    const validatedData = await request.validate({ schema: postSchema });

    const user = await User.create({
      email: validatedData.email,
      password: validatedData.password,
    });

    return response.status(200).json(user);
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
