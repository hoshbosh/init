import express from "express";
import register from "../authentication/router";
import users from "../users/router";
import risas from "../campaign/router";

const router = express.Router();

export default (): express.Router => {
    register(router);
    // risas(router);
    users(router);

    return router;
};
