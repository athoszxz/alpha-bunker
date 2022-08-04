import { PostgresDB } from ".";
import { User } from "../../../models";
import bcrypt from 'bcrypt';
import { ExceptionTreatment } from "../../../utils";

class UsersTable extends PostgresDB
{
    public async insert (user: User): Promise<boolean>
    {
        try
        {
            this.client.connect();

            const selectNumberQuery = `
                SELECT number FROM accounts where number = $1 
            `;

            const resultSelectNumber = await this.client.query(selectNumberQuery, [user.number]);

            if (resultSelectNumber.rowCount > 0)
            {
                this.client.end();
                throw new Error("Account already exists");
            }

            const selectEmailQuery = `
                SELECT email FROM users where email = $1
            `;

            const resultSelectEmail = await this.client.query(selectEmailQuery, [user.email]);

            if (resultSelectEmail.rowCount > 0)
            {
                this.client.end();
                throw new Error("Email already exists");
            }
            
            const selectUserQuery = `
                SELECT * FROM users WHERE cpf = $1
            `;

            const resultSelectUser = await this.client.query(selectUserQuery, [user.cpf]);

            if (resultSelectUser.rowCount == 0)
            {
                const insertUserQuery = `
                    INSERT INTO users (
                        id,
                        name,
                        cpf,
                        email,
                        birthdate
                    ) VALUES (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5
                    ) RETURNING id;
                `;


                const resultInsertUserQuery = await this.client.query(insertUserQuery, [
                    user.id,
                    user.name,
                    user.cpf,
                    user.email,
                    user.birthdate
                ]);

                const insertAccountQuery = `
                INSERT INTO accounts (
                    id,
                    id_costumer,
                    agency,
                    agency_dig,
                    number,
                    number_dig,
                    balance,
                    password
                )
                VALUES ($1, $2, $3, $4, $5, $6, 0, $7) RETURNING id;
                `;

                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(user.password, salt);


                const ResultInsertAccountQuery = await this.client.query(insertAccountQuery, [
                user.id_account,
                user.id,
                user.agency,
                user.agency_dig,
                user.number,
                user.number_dig,
                hash
            ]);
                this.client.end();

                if (resultInsertUserQuery.rows.length == 0 && ResultInsertAccountQuery.rows.length == 0)
                {
                    return false;
                }
                return true;
            }
            else
            {
                
                const insertAccountQuery = `
                    INSERT INTO accounts (
                        id,
                        id_costumer,
                        agency,
                        agency_dig,
                        number,
                        number_dig,
                        balance,
                        password
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, 0, $7) RETURNING id;
                `;

                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(user.password, salt);
                const result2 = await this.client.query(insertAccountQuery, [
                    user.id_account,
                    resultSelectUser.rows[0].id,
                    user.agency,
                    user.agency_dig,
                    user.number,
                    user.number_dig,
                    hash
                ]);

                this.client.end();

                if (result2.rows.length !== 0)
                {
                    return true;
                }

                return false;
            }
        }
        catch (error: any)
        {
            this.client.end();
            throw new ExceptionTreatment(
                error as Error,
                500,
                error.message || ["Internal Server Error"]
            );
        }
    }
}

export { UsersTable };
