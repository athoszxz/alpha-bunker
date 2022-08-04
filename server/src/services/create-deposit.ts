import { APIResponse, Deposit } from "../models";
import { ExceptionTreatment } from "../utils";
import { DepositDataValidator } from "../validators";
import { DepositTable } from "../clients/dao/postgres/depositts";
import { v4 } from "uuid";

class CreateDepositService
{
    private depositDataValidator = DepositDataValidator;
    private depositTable = DepositTable;

    public async execute (deposit: Deposit): Promise<APIResponse>
    {
        try
        {
            const validDepositData = new this.depositDataValidator(deposit);

            if (validDepositData.errors)
            {
                throw new Error(`400: ${validDepositData.errors}`);
            }

            validDepositData.deposit.id = v4();

            const createdDeposit = await new this.depositTable().insert(validDepositData.deposit as Deposit);

            if (createdDeposit)
            {
                return {
                    data: validDepositData.deposit,
                    messages: []
                } as APIResponse;
            }

            return {
                data: [validDepositData.deposit,
                    {"fees": (validDepositData.deposit.amount == undefined) ? 0 : validDepositData.deposit.amount * 0.01,"totalAmout": (validDepositData.deposit.amount == undefined) ? 0 : validDepositData.deposit.amount - (validDepositData.deposit.amount * 0.01)}],
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

export { CreateDepositService };
