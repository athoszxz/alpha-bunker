import { PostgresDB } from ".";
import { Extract } from "../../../models";

class ExtractTable extends PostgresDB
{
    public async insert (extract: Extract): Promise<any>
    {
        try
        {
            this.client.connect();

            const selectIDUserQuery = `
                SELECT id FROM users where cpf = $1
            `;

            const resultselectIDUser = await this.client.query(selectIDUserQuery, [extract.cpf]);

            if (resultselectIDUser.rowCount == 0)
            {
                this.client.end();
                throw new Error("User not found with this cpf");
            }

            const selectIDAccountQuery = `
                SELECT id FROM accounts where id_costumer = $1
            `;

            const resultselectIDAccount = await this.client.query(selectIDAccountQuery, [resultselectIDUser.rows[0].id]);

            const selectNumberAccountQuery = `
                SELECT number FROM accounts where id_costumer = $1
            `;

            const resultSelectNumberAccount = await this.client.query(selectNumberAccountQuery, [resultselectIDUser.rows[0].id]);

            if (resultSelectNumberAccount.rows.map(row => row.number).indexOf(extract.number) == -1)
            {
                this.client.end();
                throw new Error("Don't exist account corresponding to this cpf");
            }

            const selectUserDataQuery = `
                SELECT * FROM users where cpf = $1
            `;

            const resultSelectUserData = await this.client.query(selectUserDataQuery, [extract.cpf]);

            const selectAccountDataQuery = `
                SELECT * 
                FROM accounts 
                WHERE id_costumer = $1
                AND number in ($2);
            `;

            const resultSelectAccountData = await this.client.query(selectAccountDataQuery, [resultselectIDUser.rows[0].id, extract.number]);

            const selectTransactionDataQuery = `
                SELECT *
                FROM transactions
                WHERE id_account = $1
            `;

            const resultSelectTransactionData = await this.client.query(selectTransactionDataQuery, [resultselectIDAccount.rows[0].id]);

            const result = {
                user: resultSelectUserData.rows[0],
                account: resultSelectAccountData.rows[0],
                transactions: resultSelectTransactionData.rows
            };


            this.client.end();

            if (result.transactions.length != 0)
            {
                return result;
            }

            return false;
        }
        catch (error: any)
        {
            this.client.end();
            throw new Error(`Error: ${error.message}` );
        }
    }
}

export { ExtractTable };
