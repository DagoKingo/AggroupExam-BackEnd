import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Cliente from "App/Models/Cliente";

export default class ClientesSeederSeeder extends BaseSeeder {
  public async run() {
    await Cliente.createMany([
      { nombre: "Juan", apellidos: "Perez" },
      { nombre: "Pedro", apellidos: "Pascal" },
      { nombre: "Ignacio", apellidos: "Zaragoza" },
    ]);
  }
}
