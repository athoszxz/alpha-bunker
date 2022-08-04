interface Transaction
{
    id: string;
    agency: number;
    agency_dig: number;
    number: number;
    number_dig: number;
    cpf: number;
    password: string;
    agency_dest: number;
    agency_dest_dig: number;
    number_dest: number;
    number_dest_dig: number;
    cpf_dest: number;
    amount: number;
}

export { Transaction };

/*{
    "agency": 444,
    "agency_dig": 4,
    "number": 44444,
    "number_dig": 4,
    "cpf": 78952866355,
    "password": "123456",
    "agency_dest": 566,
    "agency_dest_dig": 8,
    "number_dest": 75856,
    "number_dest_dig": 9,
    "cpf_dest": 22227855966,
    "amount": 200,
}*/