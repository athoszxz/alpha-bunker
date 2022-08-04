import {
    AgencyValidator,
    AgencyDigValidator,
    Number2Validator,
    NumberDigValidator,
    CPFValidator,
    AmountValidator,
    PasswordValidator
} from ".";

import { Withdraw } from "../models";

class WithdrawDataValidator
{
    public withdraw: Partial<Withdraw>;
    public errors: string;
 
    private agencyValidator = AgencyValidator;
    private agencyDigValidator = AgencyDigValidator;
    private numberValidator = Number2Validator;
    private numberDigValidator = NumberDigValidator;
    private cpfValidator = CPFValidator;
    private amountValidator = AmountValidator;
    private passwordValidator = PasswordValidator;

    public constructor (withdraw: Withdraw)
    {
        this.errors = "";
        this.withdraw = this.validate(withdraw);
    }

    private validate (withdraw: Withdraw): Partial<Withdraw>
    {
        
        const validAgency = new this.agencyValidator(withdraw.agency);
        const validAgencyDig = new this.agencyDigValidator(withdraw.agency_dig);
        const validNumber = new this.numberValidator(withdraw.number);
        const validNumberDig = new this.numberDigValidator(withdraw.number_dig);
        const validCPF = new this.cpfValidator(withdraw.cpf);
        const validAmount = new this.amountValidator(withdraw.amount);
        const validPassword = new this.passwordValidator(withdraw.password);

        this.errors = this.errors.concat(`${validAgency.errors}${validAgencyDig.errors}${validNumber.errors}${validNumberDig.errors}${validCPF.errors}${validAmount.errors}${validPassword.errors}`);

        const withdrawData: Partial<Withdraw> = {
            agency: validAgency.agency,
            agency_dig: validAgencyDig.agency_dig,
            number: validNumber.number,
            number_dig: validNumberDig.number_dig,
            cpf: validCPF.cpf,
            amount: validAmount.amount,
            password: validPassword.password
        };

        return withdrawData;
    }
}

export { WithdrawDataValidator };
