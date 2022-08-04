import { CreateExtract } from "../controllers";
import Router from "express";

const route = Router();

route.route("/extracts")
    .post(new CreateExtract().handle.bind(new CreateExtract()));

export default route;

/*
{
    "agency": 444,
    "agency_dig": 4,
    "number": 44444,
    "number_dig": 4,
    "cpf": 78952866355
}

{
    "agency": 123,
    "agency_dig": 4,
    "number": 45678,
    "number_dig": 9,
    "cpf": 45647855625
}

Obs: Não aparece todas as contas, pois a conta espcífica já é enviada no request como solicitado no pdf*/