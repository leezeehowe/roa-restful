import { Controller, Get, Post, Delete, Put } from "../../src/roa-resuful-decorator";
import { Context } from "koa";

@Controller("/user")
export class UserController {

    @Get("/info")
    async index(ctx: Context, next: Function) {
        ctx.response.body = "here is userInfo";
    }

    @Post("")
    async getNav(ctx: Context, next: Function) {

    }

}
