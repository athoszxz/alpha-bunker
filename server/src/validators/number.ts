class NumberValidator
{
    public errors: string;
    public number: string;

    public constructor (number: string)
    {
        this.errors = "";
        this.number = this.validate(number);
    }

    private validate (number: string): string
    {
        if (!number)
        {
            this.errors += "number:field required|";

            return "";
        }

        // if (number.length < 3)
        // {
        //     this.errors += "number:number too short|";

        //     return "";
        // }

        return number;
    }
}

export { NumberValidator };