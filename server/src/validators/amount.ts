class AmountValidator
{
    public errors: string;
    public amount: number;

    public constructor (amount: number)
    {
        this.errors = "";
        this.amount = this.validate(amount);
    }

    private validate (amount: number): number
    {
        if (!amount)
        {
            this.errors += "amount:field required|";

            return 0;
        }

        if (amount <= 4)
        {
            this.errors += "amount:number too short|";

            return 0;
        }

        return amount;
    }
}

export { AmountValidator };