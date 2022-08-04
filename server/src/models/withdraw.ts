interface Withdraw
{
    id: string;
    agency: number;
    agency_dig: number;
    number: number;
    number_dig: number;
    cpf: number;
    amount: number;
    password: string;
}

export { Withdraw };

/*
{
    "agency": 444,
    "agency_dig": 4,
    "number": 44444,
    "number_dig": 4,
    "cpf": 78952866355,
    "amount": 200,
    "password": "123456"
}
*/