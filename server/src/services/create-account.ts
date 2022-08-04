import { APIResponse, Account } from "../models";
import { ExceptionTreatment } from "../utils";
import { AccountDataValidator } from "../validators";
import { AccountTable } from "../clients/dao/postgres/accountts";

class CreateAccountService
{
    private accountDataValidator = AccountDataValidator;
    private accountTable = AccountTable;

    public async execute (account: Account): Promise<APIResponse>
    {
        try
        {
            const validAccountData = new this.accountDataValidator(account);

            if (validAccountData.errors)
            {
                throw new Error(`400: ${validAccountData.errors}`);
            }

            const createdAccount = await new this.accountTable().insert(validAccountData.account as Account);

            const get = await new this.accountTable().insert(validAccountData.account as Account);


            if (createdAccount)
            {
                return {
                    data: [get],
                    messages: []
                } as APIResponse;
            }

            return {
                data: {},
                messages: [ "" ]
            } as APIResponse;
        }
        catch (error: any)
        {
            throw new ExceptionTreatment(
                error as Error,
                500,
                error.message     
            );
        }
    }
}

export { CreateAccountService };
