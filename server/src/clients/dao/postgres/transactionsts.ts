import { PostgresDB } from ".";
import { Transaction } from "../../../models";
import bcrypt from 'bcrypt';

class TransactionTable extends PostgresDB
{
    public async insert (transaction: Transaction): Promise<any>
    {
        try
        {
            this.client.connect();

            const selectIDUserQuery = `
                SELECT id FROM users WHERE cpf = $1
            `;

            const resultSelectIDUser = await this.client.query(selectIDUserQuery, [transaction.cpf]);

            if (resultSelectIDUser.rowCount == 0)
            {
                this.client.end();
                throw new Error("User not found");
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

            if (resultSelectNumberAccount.rows.map(row => row.number).indexOf(transaction.number) == -1)
            {
                this.client.end();
                throw new Error("Don't exist account corresponding to this cpf");
            }

            const selectPasswordAccountQuery = `
                SELECT password FROM accounts WHERE id_costumer = $1
            `;

            const resultSelectPasswordAccount = await this.client.query(selectPasswordAccountQuery, [resultSelectIDUser.rows[0].id]);

            if (bcrypt.compareSync(transaction.password, resultSelectPasswordAccount.rows[0].password) == false)
            {
                this.client.end();
                throw new Error("Password incorrect");
            }

            const selectIDUserDestQuery = `
                SELECT id FROM users WHERE cpf = $1
            `;

            const resultSelectIDUserDest = await this.client.query(selectIDUserDestQuery, [transaction.cpf_dest]);

            if (resultSelectIDUserDest.rowCount == 0)
            {
                this.client.end();
                throw new Error("Destiny User not found");
            }
            
            const selectIDAccountDestQuery = `
                SELECT id FROM accounts WHERE id_costumer = $1
            `;

            const resultSelectIDAccountDest = await this.client.query(selectIDAccountDestQuery, [resultSelectIDUserDest.rows[0].id]);

            if (resultSelectIDAccountDest.rowCount == 0)
            {
                this.client.end();
                throw new Error("Destiny Account not found");
            }

            const selectNumberAccountDestQuery = `
            SELECT number FROM accounts where id_costumer = $1
            `;
            
            const resultSelectNumberAccountDest = await this.client.query(selectNumberAccountDestQuery, [resultSelectIDUserDest.rows[0].id]);

            if (resultSelectNumberAccountDest.rows.map(row => row.number).indexOf(transaction.number_dest) == -1)
            {
                this.client.end();
                throw new Error("Don't exist destiny account corresponding to this cpf");
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
                'transferencia',
                $4
            ) RETURNING id_account;
            `;

            const result = await this.client.query(insertTransactionQuery, [
                transaction.id,
                resultSelectIDAccount.rows[0].id,
                transaction.amount,
                1
            ]);

            const selectAmountQuery = `
                SELECT balance FROM accounts WHERE id = $1
            `;

            const resultSelectAmount = await this.client.query(selectAmountQuery, [resultSelectIDAccount.rows[0].id]);

            const updateAmountQuery = `
                UPDATE accounts SET balance = $1 WHERE id = $2
            `;

            if(Number.parseFloat(resultSelectAmount.rows[0].balance) < (transaction.amount + 1))
            {
                this.client.end();
                throw new Error("Insufficient funds");
            }

            const resultUpdateAmount = await this.client.query(updateAmountQuery, [
                resultSelectAmount.rows[0].balance - (transaction.amount + 1),
                resultSelectIDAccount.rows[0].id
            ]);

            const selectAmountDestQuery = `
                SELECT balance FROM accounts WHERE id = $1
            `;

            const resultSelectAmountDest = await this.client.query(selectAmountDestQuery, [resultSelectIDAccountDest.rows[0].id]);

            const updateAmountDestQuery = `
                UPDATE accounts SET balance = $1 WHERE id = $2;
            `;

            const resultUpdateAmountDest = await this.client.query(updateAmountDestQuery, [
                Number.parseFloat(resultSelectAmountDest.rows[0].balance) + transaction.amount,
                resultSelectIDAccountDest.rows[0].id,
            ]);

            this.client.end();

            if (result.rows.length !== 0 && resultUpdateAmountDest.rows.length !== 0 && resultUpdateAmount.rows.length !== 0)
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

export { TransactionTable };
