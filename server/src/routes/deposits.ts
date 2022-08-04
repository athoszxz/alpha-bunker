import { CreateDeposit } from "../controllers";
import Router from "express";

const route = Router();

route.route("/deposits")
    .post(new CreateDeposit().handle.bind(new CreateDeposit()));

export default route;

/* exemplo de requisição:
Jorge Lual
{
    "agency": 444,
    "agency_dig": 4,
    "number": 44444,
    "number_dig": 4,
    "cpf": 78952866355,
    "amount": 500
}

Matheus Ferraz
{
    "agency": 123,
    "agency_dig": 4,
    "number": 45678,
    "number_dig": 9,
    "cpf": 45647855625,
    "amount": 2000
}
*/