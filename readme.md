# roa-restful
实现基于`装饰器`的`koa-router`路由定义。
类似基于`JAVA`的**使用注解编程**。:smile:



## 安装

```shell
npm i --save roa-restful
```



## 使用

首先定义一个控制器类，对应着`koa-router`的`Router`。
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
你可以在项目的任何地方导入你的控制器类，当装饰器运行时，会往控制器类的`prototype`上添加一个`Router`实例属性。
```
const router: Router = UserController["router"];
```
取得router后，你便可以向往常一样使用koa-router的方式
```
app.use(router.routes());
// or
app.use(UserController["router"].routes());
```



## Doucuments

### @Controller

对应`koa-router`的`Router`。

#### 参数

| param  | type   | description             | default |
| ------ | ------ | ----------------------- | ------- |
| prefix | string | 该`Router`的前缀/根路径 | ""      |
| config | object | 对应`Router`的[opts]    | {}      |



### @Get、Post、Delete、Put

#### 参数

| param | type   | description | default |
| ----- | ------ | ----------- | ------- |
| url   | string | 路径表达式  | "/"     |



## 后续更新

- [ ] 实现`koa-router`的__Named routes__。

- [ ] 实现`koa-router`的__Multiple middleware__。

- [ ] 添加`Typescript`的声明文件。

  


## 要求
- 项目需是使用`Koa`
- 使用`koa-router`
