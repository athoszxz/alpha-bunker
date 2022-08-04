class NumberDigValidator
{
    public errors: string;
    public number_dig: number;

    public constructor (number_dig: number)
    {
        this.errors = "";
        this.number_dig = this.validate(number_dig);
    }

    private validate (number_dig: number): number
    {
        if (!number_dig)
        {
            this.errors += "number_dig:field required|";

            return 0;
        }

        if (number_dig < 0 || number_dig > 9)
        {
            this.errors += "number_dig:number only 0-9|";

            return 0;
        }

        return number_dig;
    }
}

export { NumberDigValidator };