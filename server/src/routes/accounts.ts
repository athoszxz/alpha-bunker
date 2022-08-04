import { CreateAccount } from "../controllers";
import Router from "express";

const route = Router();

route.route("/accounts")
    .post(new CreateAccount().handle.bind(new CreateAccount()));

export default route;