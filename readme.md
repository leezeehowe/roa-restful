# roa-restful
使用Typescript实现的定义`Koa2`路由额`装饰器`集合。  
目的在于简化原生Koa2路由的定义方式。  
类`Spring Boot`的声明方式。


## 安装
```shell
npm i --save roa-restful
```

## 使用

```
const {
    Controller,
    Get,
    Post,
    Delete,
    Put
} =  require("roa-restful)

@Controller("/user")
export class UserController {

    @Get("/userInfo")
    async (ctx, next) => {
        // .....just like that
    }

}
```

## 限制
- 项目需是使用`Koa`
- 使用`koa-router`
- 该库使用`Typescript`