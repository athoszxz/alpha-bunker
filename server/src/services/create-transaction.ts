import { APIResponse, Transaction } from "../models";
import { ExceptionTreatment } from "../utils";
import { TransactionDataValidator } from "../validators";
import { TransactionTable } from "../clients/dao/postgres/transactionsts";
import { v4 } from "uuid";

class CreateTransactionService
{
    private transactionDataValidator = TransactionDataValidator;
    private transactionTable = TransactionTable;

    public async execute (transaction: Transaction): Promise<APIResponse>
    {
        try
        {
            const validTransactionData = new this.transactionDataValidator(transaction);

            if (validTransactionData.errors)
            {
                throw new Error(`400: ${validTransactionData.errors}`);
            }

            validTransactionData.transaction.id = v4();

            const createdTransaction = await new this.transactionTable().insert(validTransactionData.transaction as Transaction);

            if (createdTransaction)
            {
                return {
                    data: validTransactionData.transaction,
                    messages: []
                } as APIResponse;
            }

            return {
                data: [{"agency": validTransactionData.transaction.agency, 
                        "agency_dig": validTransactionData.transaction.agency_dig, 
                        "number": validTransactionData.transaction.number,
                        "number_dig": validTransactionData.transaction.number_dig,
                        "cpf": validTransactionData.transaction.cpf,
                        "agency_dest": validTransactionData.transaction.agency_dest,
                        "agency_dest_dig": validTransactionData.transaction.agency_dest_dig,
                        "number_dest": validTransactionData.transaction.number_dest,
                        "number_dest_dig": validTransactionData.transaction.number_dest_dig,
                        "cpf_dest": validTransactionData.transaction.cpf_dest,
                        "amount": validTransactionData.transaction.amount,
                        "fees": (validTransactionData.transaction.amount == undefined) ? 0 : 1,
                        "final_amount": (validTransactionData.transaction.amount == undefined) ? 0 : validTransactionData.transaction.amount + 1}],
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

export { CreateTransactionService };
