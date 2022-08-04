import { PostgresDB } from ".";
import { Withdraw } from "../../../models";
import bcrypt from 'bcrypt';

class WithdrawTable extends PostgresDB
{
    public async insert (withdraw: Withdraw): Promise<any>
    {
        try
        {
            this.client.connect();

            const selectIDUserQuery = `
                SELECT id FROM users WHERE cpf = $1
            `;

            const resultSelectIDUser = await this.client.query(selectIDUserQuery, [withdraw.cpf]);

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
                throw new Error("Account not found with this cpf");
            }

            const selectNumberAccountQuery = `
            SELECT number FROM accounts where id_costumer = $1
        `;

            const resultSelectNumberAccount = await this.client.query(selectNumberAccountQuery, [resultSelectIDUser.rows[0].id]);

            if (resultSelectNumberAccount.rows.map(row => row.number).indexOf(withdraw.number) == -1)
            {
                this.client.end();
                throw new Error("Don't exist account corresponding to this cpf");
            }

            const selectPasswordAccountQuery = `
                SELECT password FROM accounts WHERE id_costumer = $1
            `;

            const resultSelectPasswordAccount = await this.client.query(selectPasswordAccountQuery, [resultSelectIDUser.rows[0].id]);

            if (bcrypt.compareSync(withdraw.password, resultSelectPasswordAccount.rows[0].password) == false)
            {
                this.client.end();
                throw new Error("Password incorrect");
            }

            const insertWithdrawQuery = `
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
                'saque',
                $4
            ) RETURNING id_account;
            `;

            const result = await this.client.query(insertWithdrawQuery, [
                withdraw.id,
                resultSelectIDAccount.rows[0].id,
                withdraw.amount + 4,
                4
            ]);

            const selectAmountQuery = `
                SELECT balance FROM accounts WHERE id = $1
            `;

            const resultSelectAmount = await this.client.query(selectAmountQuery, [resultSelectIDAccount.rows[0].id]);

            if(Number.parseFloat(resultSelectAmount.rows[0].balance) < (withdraw.amount + 4))
            {
                this.client.end();
                throw new Error("Insufficient funds");
            }

            const updateAmountQuery = `
                UPDATE accounts SET balance = $1 WHERE id = $2;
            `;

            const result2 = await this.client.query(updateAmountQuery, [
                Number.parseFloat(resultSelectAmount.rows[0].balance) - (withdraw.amount + 4),
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

export { WithdrawTable };
