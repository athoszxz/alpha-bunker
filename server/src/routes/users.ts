import { CreateUser } from "../controllers";
import Router from "express";

const route = Router();

route.route("/users")
    .post(new CreateUser().handle.bind(new CreateUser()));

export default route;

/*
{
    "name": "Matheus Ferraz",
    "cpf": 45647855625,
    "email": "matheus@gmail.com",
    "birthdate": "2005-02-03",
    "password":"123456"
}
*/

/*
{
    "name": "Jorge Lual",
    "cpf": 78952866355,
    "email": "jorge@gmail.com",
    "birthdate": "1969-03-09",
    "password":"123456"
}
*/