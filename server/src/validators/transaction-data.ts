import {
    AgencyValidator,
    AgencyDigValidator,
    Number2Validator,
    NumberDigValidator,
    CPFValidator,
    AmountValidator,
    PasswordValidator
} from ".";

import { Transaction } from "../models";

class TransactionDataValidator
{
    public transaction: Partial<Transaction>;
    public errors: string;
 
    private agencyValidator = AgencyValidator;
    private agencyDigValidator = AgencyDigValidator;
    private numberValidator = Number2Validator;
    private numberDigValidator = NumberDigValidator;
    private cpfValidator = CPFValidator;
    private amountValidator = AmountValidator;
    private passwordValidator = PasswordValidator;
    private agencyDestValidator = AgencyValidator;
    private agencyDestDigValidator = AgencyDigValidator;
    private numberDestValidator = Number2Validator;
    private numberDestDigValidator = NumberDigValidator;
    private cpfDestValidator = CPFValidator;

    public constructor (transaction: Transaction)
    {
        this.errors = "";
        this.transaction = this.validate(transaction);
    }

    private validate (transaction: Transaction): Partial<Transaction>
    {
        
        const validAgency = new this.agencyValidator(transaction.agency);
        const validAgencyDig = new this.agencyDigValidator(transaction.agency_dig);
        const validNumber = new this.numberValidator(transaction.number);
        const validNumberDig = new this.numberDigValidator(transaction.number_dig);
        const validCPF = new this.cpfValidator(transaction.cpf);
        const validAmount = new this.amountValidator(transaction.amount);
        const validPassword = new this.passwordValidator(transaction.password);
        const validAgencyDest = new this.agencyDestValidator(transaction.agency_dest);
        const validAgencyDestDig = new this.agencyDestDigValidator(transaction.agency_dest_dig);
        const validNumberDest = new this.numberDestValidator(transaction.number_dest);
        const validNumberDestDig = new this.numberDestDigValidator(transaction.number_dest_dig);
        const validCPFDest = new this.cpfDestValidator(transaction.cpf_dest);
        
        this.errors = this.errors.concat(validAgency.errors, validAgencyDig.errors, validNumber.errors, validNumberDig.errors, validCPF.errors, validAmount.errors, validPassword.errors, validAgencyDest.errors, validAgencyDestDig.errors, validNumberDest.errors, validNumberDestDig.errors, validCPFDest.errors);

        const transactionData: Partial<Transaction> = {
            agency: validAgency.agency,
            agency_dig: validAgencyDig.agency_dig,
            number: validNumber.number,
            number_dig: validNumberDig.number_dig,
            cpf: validCPF.cpf,
            amount: validAmount.amount,
            password: validPassword.password,
            agency_dest: validAgencyDest.agency,
            agency_dest_dig: validAgencyDestDig.agency_dig,
            number_dest: validNumberDest.number,
            number_dest_dig: validNumberDestDig.number_dig,
            cpf_dest: validCPFDest.cpf
        };

        return transactionData;
    }
}

export { TransactionDataValidator };
