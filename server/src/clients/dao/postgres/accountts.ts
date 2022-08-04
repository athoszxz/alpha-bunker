import { PostgresDB } from ".";
import { Account } from "../../../models";

class AccountTable extends PostgresDB
{
    public async insert (account: Account): Promise<boolean>
    {
        try
        {
            this.client.connect();

            const insertUserQuery = `
                INSERT INTO accounts
                 VALUES (
                    $1,
                    7777,
                    0,
                    (SELECT id FROM users WHERE id = $2)
                )
            `;

            const result = await this.client.query(insertUserQuery, [
                account.number,
                account.userID
            ]);

            this.client.end();

            if (result.rows.length !== 0)
            {
                return true;
            }

            return false;
        }
        catch (error)
        {
            this.client.end();
            throw new Error(`Pamonha ${error}` );
        }
    }
}

export { AccountTable };