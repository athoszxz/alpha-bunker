class Number2Validator
{
    public errors: string;
    public number: number;

    public constructor (number: number)
    {
        this.errors = "";
        this.number = this.validate(number);
    }

    private validate (number: number): number
    {
        if (!number)
        {
            this.errors += "number:field required|";

            return 0;
        }

        if (number < 10000 || number > 99999)
        {
            this.errors += "number:number only 5 digits|";

            return 0;
        }

        return number;
    }
}

export { Number2Validator };