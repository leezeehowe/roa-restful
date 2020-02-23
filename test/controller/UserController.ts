import { Controller, Get, Post, Delete, Put } from "../../src/roa-resuful-decorator";
import { Context } from "koa";

@Controller("/user")
export class UserController {

    @Get("/:id")
    async index(ctx: Context, next: Function) {
        ctx.response.body = {
            id: ctx.params.id,
            name: "lee"
        };
    }

    @Post("")
    async getNav(ctx: Context, next: Function) {

    }

}
