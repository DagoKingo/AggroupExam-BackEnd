import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const postSchema = schema.create({
      email: schema.string({}, [rules.email()]),
      password: schema.string({}, [rules.confirmed()]),
    });
    const validatedData = await request.validate({ schema: postSchema });

    const token = await auth
      .use("api")
      .attempt(validatedData.email, validatedData.password, {
        expiresIn: "1 hour",
      });

    return response.status(200).json({
      message: "Welcome!",
      token,
    });
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use("api").logout();

    return response.status(200).json({
      message: "See you!",
    });
  }

  public async register({}: HttpContextContract) {}
}
