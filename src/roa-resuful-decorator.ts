import "reflect-metadata";
import * as Router from "koa-router";
import { Roa } from "./roa-store";

const ROUTEMETADATA_KEY = Symbol("routeMetadatas");

enum HTTP_METHOD {
    GET = "get",
    POST = "post",
    DELETE = "delete",
    PUT = "put"
}

class RouteMetadata {
    function_name: string
    url: string
    http_method: HTTP_METHOD

    constructor(function_name: string, url: string, http_method: HTTP_METHOD) {
        this.function_name = function_name;
        this.url = url;
        this.http_method = http_method;
    }
}

function setRouteMetadata(metadata: RouteMetadata, target: any, key: Symbol = ROUTEMETADATA_KEY): void {
    let metadata_set = Reflect.getMetadata(key, target);
    if (!Reflect.hasMetadata(key, target)) {
        metadata_set = new Set<RouteMetadata>([metadata]);
    }
    else {
        (<Set<RouteMetadata>>metadata_set).add(metadata);
    }
    Reflect.defineMetadata(key, metadata_set, target);
}

function Get(url: string = "") {
    return function (target: any, propertyKey: string, descriptor: object) {
        const metadata = new RouteMetadata(propertyKey, url, HTTP_METHOD.GET);
        setRouteMetadata(metadata, target);
    }
}

function Post(url: string) {
    return function (target: any, propertyKey: string, descriptor: object) {
        const metadata = new RouteMetadata(propertyKey, url, HTTP_METHOD.POST);
        setRouteMetadata(metadata, target);
    }
}

function Delete(url: string) {
    return function (target: any, propertyKey: string, descriptor: object) {
        const metadata = new RouteMetadata(propertyKey, url, HTTP_METHOD.DELETE);
        setRouteMetadata(metadata, target);
    }
}

function Put(url: string) {
    return function (target: any, propertyKey: string, descriptor: object) {
        const metadata = new RouteMetadata(propertyKey, url, HTTP_METHOD.PUT);
        setRouteMetadata(metadata, target);
    }
}

/**
 * 
 * @param prefix 前缀URL
 * @param config koa-router配置
 */
function Controller(prefix?: string, config = {}) {
    prefix ? config["prefix"] = prefix : null;
    const router = new Router(config);
    
    return function (target: { prototype: object, name: string }) {
        // 控制器类名
        const controller_name = target.name;

        const metadata_set: Set<RouteMetadata> = Reflect.getMetadata(ROUTEMETADATA_KEY, target.prototype);

        const functions = Object.getOwnPropertyDescriptors(target.prototype);

        metadata_set.forEach((routeMetadata: RouteMetadata): void => {
            router[routeMetadata.http_method](routeMetadata.url, functions[routeMetadata.function_name].value);
        })

        Object.defineProperty(target, "router", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: router
        });

        Roa.addController(controller_name, router);
    }
}


export {
    Controller,
    Get,
    Post,
    Delete,
    Put
}
