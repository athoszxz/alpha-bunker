import { CreateWithdraw } from "../controllers";
import Router from "express";

const route = Router();

route.route("/withdraws")
    .post(new CreateWithdraw().handle.bind(new CreateWithdraw()));

export default route;

/*

Jorge Lual
{
    "agency": 444,
    "agency_dig": 4,
    "number": 44444,
    "number_dig": 4,
    "cpf": 78952866355,
    "amount": 200,
    "password": "123456"
}

Matheus Ferraz
{
    "agency": 123,
    "agency_dig": 4,
    "number": 45678,
    "number_dig": 9,
    "cpf": 45647855625,
    "amount": 200,
    "password": "123456"
}
*/