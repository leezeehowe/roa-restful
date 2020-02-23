import * as Koa from "koa";
import { UserController } from "./controller/UserController"
import { HomeController } from "./controller/HomeController"

const app = new Koa();

app.use(UserController["router"].routes());
app.use(HomeController["router"].routes());

app.listen(3002);``

