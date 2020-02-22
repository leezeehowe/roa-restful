import Router = require("koa-router")

const CONTROLLER_MAP: Map<string, Router> = new Map<string, Router>();

const addController = (key: string, router: Router) => {
    console.log(
        "## add Controller to Roa-Store ##########################################\n\n" + 
        `key: ${key}\n` + 
        `routeMetadata:\n` + 
        `${JSON.stringify(router, null, "\t")}` + 
        "\n########################################################################\n"
    );

    CONTROLLER_MAP.set(key, router);
}

const getController = (key: string): Router => {
    let router = CONTROLLER_MAP.get(key);
    return router || new Router();
}

const Roa = {
    addController,
    getController
}

export {
    Roa
}