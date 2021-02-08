import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Articulo from "App/Models/Articulo";

export default class ArticulosSeederSeeder extends BaseSeeder {
  public async run() {
    await Articulo.createMany([
      { nombre: "A10", marca: "Samsung", precio: 2000 },
      { nombre: "iPhone 8", marca: "Apple", precio: 7000 },
      { nombre: "Redmi Note 8", marca: "Xiaomi", precio: 5000 },
    ]);
  }
}
