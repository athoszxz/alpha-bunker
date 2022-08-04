import {
    NumberValidator,
    AgencyValidator,
    AmountValidator,
    UserIDValidator
} from ".";
import { Account } from "../models";

class AccountDataValidator
{
    public account: Partial<Account>;
    public errors: string;

    private numberValidator = NumberValidator;
    private agencyValidator = AgencyValidator;
    private amountValidator = AmountValidator;
    private userIDValidator = UserIDValidator;

    public constructor (account: Account)
    {
        this.errors = "";
        this.account = this.validate(account);
    }

    private validate (account: Account): Partial<Account>
    {
        const validNumber = new this.numberValidator(account.number);
        const validAgency = new this.agencyValidator(account.agency);
        const validAmount = new this.amountValidator(account.amount);
        const validUserID = new this.userIDValidator(account.userID);
        
        this.errors = this.errors.concat(`${validNumber.errors}${validAgency.errors}${validAmount.errors}${validUserID.errors}`);

        const accountData: Partial<Account> = {
            number: validNumber.number,
            agency: validAgency.agency,
            amount: validAmount.amount,
            userID: validUserID.userID
        };

        return accountData;
    }
}

export { AccountDataValidator };
