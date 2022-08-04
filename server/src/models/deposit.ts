interface Deposit
{
    id: string;
    id_account: string;
    agency: number;
    agency_dig: number;
    number: number;
    number_dig: number;
    cpf: number;
    amount: number;
}

export { Deposit };

/*
{
    "agency": 444,
    "agency_dig": 4,
    "number": 44444,
    "number_dig": 4,
    "cpf": 78952866355,
    "amount": 500
}
*/