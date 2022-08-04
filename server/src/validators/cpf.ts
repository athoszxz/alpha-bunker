class CPFValidator
{
    public errors: string;
    public cpf: number;

    public constructor (cpf: number)
    {
        this.errors = "";
        this.cpf = this.validate(cpf);

    }

    private validate (cpf: number): number
    {
        if (!cpf)
        {
            this.errors += "cpf:field required|";

            return 0;
        }

        if (cpf.toString().length !== 11)
        {
            this.errors += "cpf:cpf only have 11 digits|";

            return 0;
        }

        return cpf;
    }
}

export { CPFValidator };