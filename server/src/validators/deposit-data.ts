import {
    AgencyValidator,
    AgencyDigValidator,
    Number2Validator,
    NumberDigValidator,
    CPFValidator,
    AmountValidator
} from ".";

import { Deposit } from "../models";

class DepositDataValidator
{
    public deposit: Partial<Deposit>;
    public errors: string;
 
    private agencyValidator = AgencyValidator;
    private agencyDigValidator = AgencyDigValidator;
    private numberValidator = Number2Validator;
    private numberDigValidator = NumberDigValidator;
    private cpfValidator = CPFValidator;
    private amountValidator = AmountValidator;

    public constructor (deposit: Deposit)
    {
        this.errors = "";
        this.deposit = this.validate(deposit);
    }

    private validate (deposit: Deposit): Partial<Deposit>
    {
        
        const validAgency = new this.agencyValidator(deposit.agency);
        const validAgencyDig = new this.agencyDigValidator(deposit.agency_dig);
        const validNumber = new this.numberValidator(deposit.number);
        const validNumberDig = new this.numberDigValidator(deposit.number_dig);
        const validCPF = new this.cpfValidator(deposit.cpf);
        const validAmount = new this.amountValidator(deposit.amount);

        this.errors = this.errors.concat(`${validAgency.errors}${validAgencyDig.errors}${validNumber.errors}${validNumberDig.errors}${validCPF.errors}${validAmount.errors}`);

        const depositData: Partial<Deposit> = {
            agency: validAgency.agency,
            agency_dig: validAgencyDig.agency_dig,
            number: validNumber.number,
            number_dig: validNumberDig.number_dig,
            cpf: validCPF.cpf,
            amount: validAmount.amount
        };

        return depositData;
    }
}

export { DepositDataValidator };
