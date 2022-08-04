import { APIResponse, User } from "../models";
import { ExceptionTreatment } from "../utils";
import { UserDataValidator } from "../validators";
import { UsersTable } from "../clients/dao/postgres/userts";
import { v4 } from "uuid";

class CreateUserService
{
    private userDataValidator = UserDataValidator;
    private usersTable = UsersTable;

    private generateRandomCode( quantity: number ) : number {
        let code = '';
    
        for (let i: number = 0; i < quantity; i++) {
          let x = Math.floor(10 * Math.random()+1);
          if (x == 10) {
            x -= 1 ;
          }
          code += x;
        }
    
        return Number(code);
    }

    public async execute (user: User): Promise<APIResponse>
    {
        try
        {
            const validUserData = new this.userDataValidator(user);

            if (validUserData.errors)
            {
                throw new Error(`400: ${validUserData.errors}`);
            }

            validUserData.user.id = v4();
            validUserData.user.id_account = v4();
            validUserData.user.agency = this.generateRandomCode(4);
            validUserData.user.agency_dig = this.generateRandomCode(1);
            validUserData.user.number = this.generateRandomCode(5);
            validUserData.user.number_dig = this.generateRandomCode(1);

            const insertedUser = await new this.usersTable().insert(validUserData.user as User);

            if (insertedUser)
            {
                return {
                    data: [{"name": validUserData.user.name, "cpf": validUserData.user.cpf, "email": validUserData.user.email, "birthdate": validUserData.user.birthdate, "agency": validUserData.user.agency, "agency_dig": validUserData.user.agency_dig, "number": validUserData.user.number, "number_dig": validUserData.user.number_dig}],
                    messages: [""]
                } as APIResponse;
            }

            return {
                data: {},
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

export { CreateUserService };
