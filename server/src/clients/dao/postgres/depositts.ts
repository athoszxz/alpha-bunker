import { PostgresDB } from ".";
import { Deposit } from "../../../models";

class DepositTable extends PostgresDB
{
    public async insert (deposit: Deposit): Promise<any>
    {
        try
        {
            this.client.connect();

            const selectIDUserQuery = `
                SELECT id FROM users WHERE cpf = $1
            `;

            const resultSelectIDUser = await this.client.query(selectIDUserQuery, [deposit.cpf]);

            if (resultSelectIDUser.rowCount == 0)
            {
                this.client.end();
                throw new Error("User not found with this cpf");
            }

            const selectIDAccountQuery = `
                SELECT id FROM accounts WHERE id_costumer = $1
            `;

            const resultSelectIDAccount = await this.client.query(selectIDAccountQuery, [resultSelectIDUser.rows[0].id]);

            if (resultSelectIDAccount.rowCount == 0)
            {
                this.client.end();
                throw new Error("Account not found");
            }

            const selectNumberAccountQuery = `
            SELECT number FROM accounts where id_costumer = $1
        `;

            const resultSelectNumberAccount = await this.client.query(selectNumberAccountQuery, [resultSelectIDUser.rows[0].id]);

            if (resultSelectNumberAccount.rows.map(row => row.number).indexOf(deposit.number) == -1)
            {
                this.client.end();
                throw new Error("Don't exist account corresponding to this cpf");
            }


            const insertTransactionQuery = `
            INSERT INTO transactions (
                id,
                id_account,
                amount,
                date,
                type,
                fees
            ) VALUES (
                $1,
                $2,
                $3,
                NOW(),
                'deposito',
                $4
            ) RETURNING id_account;
            `;

            const result = await this.client.query(insertTransactionQuery, [
                deposit.id,
                resultSelectIDAccount.rows[0].id,
                (deposit.amount - (deposit.amount * 0.01)),
                (deposit.amount * 0.01)
            ]);

            const selectAmountQuery = `
                SELECT balance FROM accounts WHERE id = $1
            `;

            const resultSelectAmount = await this.client.query(selectAmountQuery, [resultSelectIDAccount.rows[0].id]);

            const updateAmountQuery = `
                UPDATE accounts SET balance = $1 WHERE id = $2;
            `;

            const result2 = await this.client.query(updateAmountQuery, [
                Number.parseFloat(resultSelectAmount.rows[0].balance) + deposit.amount - (deposit.amount * 0.01),
                resultSelectIDAccount.rows[0].id,
            ]);

            this.client.end();

            if (result.rows.length !== 0 && result2.rows.length !== 0)
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

export { DepositTable };
