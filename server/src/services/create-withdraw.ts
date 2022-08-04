import { APIResponse, Withdraw } from "../models";
import { ExceptionTreatment } from "../utils";
import { WithdrawDataValidator } from "../validators";
import { WithdrawTable } from "../clients/dao/postgres/withdrawts";
import { v4 } from "uuid";

class CreateWithdrawService
{
    private withdrawDataValidator = WithdrawDataValidator;
    private withdrawTable = WithdrawTable;

    public async execute (withdraw: Withdraw): Promise<APIResponse>
    {
        try
        {
            const validWithdrawData = new this.withdrawDataValidator(withdraw);

            if (validWithdrawData.errors)
            {
                throw new Error(`400: ${validWithdrawData.errors}`);
            }

            validWithdrawData.withdraw.id = v4();

            const createdWithdraw = await new this.withdrawTable().insert(validWithdrawData.withdraw as Withdraw);

            if (createdWithdraw)
            {
                return {
                    data: validWithdrawData.withdraw,
                    messages: []
                } as APIResponse;
            }

            return {
                data: [{"agency": validWithdrawData.withdraw.agency, "agency_dig": validWithdrawData.withdraw.agency_dig, "number": validWithdrawData.withdraw.number, "number_dig": validWithdrawData.withdraw.number_dig, "cpf": validWithdrawData.withdraw.cpf, "amount": validWithdrawData.withdraw.amount,  "fees": 4, "total_amount_with_fees": (validWithdrawData.withdraw.amount == undefined) ? 0 : (validWithdrawData.withdraw.amount + 4)}],
                messages: [ "" ]
            } as APIResponse;
        }
        catch (error: any)
        {
            throw new ExceptionTreatment(
                error as Error,
                500,
                error.message.split(":")[1] || ["Internal Server Error"] 
            );
        }
    }
}

export { CreateWithdrawService };
