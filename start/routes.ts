/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { message: "Server API is running" };
});

Route.post("/login", "AuthController.login");
Route.post("/logout", "AuthController.logout").middleware("auth");

Route.group(() => {
  Route.resource("clientes", "ClientesController");
  Route.resource("articulos", "ArticulosController");
  Route.resource("ventas", "VentasController");
}).prefix("/v1");
