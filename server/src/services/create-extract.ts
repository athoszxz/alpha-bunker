import { APIResponse, Extract } from "../models";
import { ExceptionTreatment } from "../utils";
import { ExtractDataValidator } from "../validators";
import { ExtractTable } from "../clients/dao/postgres/extractts";

class CreateExtractService
{
    private extractDataValidator = ExtractDataValidator;
    private extractTable = ExtractTable;

    public async execute (extract: Extract): Promise<APIResponse>
    {
        try
        {
            const validExtractData = new this.extractDataValidator(extract);

            if (validExtractData.errors)
            {
                throw new Error(`400: ${validExtractData.errors}`);
            }

            const createdExtract = await new this.extractTable().insert(validExtractData.extract as Extract);

            const get = await new this.extractTable().insert(validExtractData.extract as Extract);


            if (createdExtract)
            {
                return {
                    data: [{"user": get.user}, 
                    {"account": {
                        "id": get.account.id,
                        "id_costumer": get.account.id_costumer,
                        "agency": get.account.agency,
                        "agency_dig": get.account.agency_dig,
                        "number": get.account.number,
                        "number_dig": get.account.number_dig,
                        "balance": get.account.balance
                    }}, 
                    {"transactions": get.transactions}],
                    messages: [""]
                } as APIResponse;
            }
            
            return {
                data: [],
                messages: [ "Error" ]
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

export { CreateExtractService };
