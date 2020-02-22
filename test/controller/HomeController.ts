import { Controller, Get, Post, Delete, Put } from "../../src/roa-resuful-decorator";
import { Context } from "koa";

@Controller("/home")
export class HomeController {

    @Get("/index")
    async index(ctx: Context, next: Function) {
        ctx.response.body = "here is index page!"
    }

    @Get("/nav")
    async getNav(ctx: Context, next: Function) {
        ctx.response.body = "here is nav data!"
    }

}
