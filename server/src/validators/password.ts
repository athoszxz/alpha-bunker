class PasswordValidator
{
    public errors: string;
    public password: string;

    public constructor (password: string)
    {
        this.errors = "";
        this.password = this.validate(password);
    }

    private validate (password: string): string
    {
        if (!password)
        {
            this.errors += "password:field required|";

            return "";
        }

        if (password.length < 4)
        {
            this.errors += "password:password minimum 4 digits|";

            return "";
        }

        if (!password.trim())
        {
            this.errors += "password:cannot be only space characters|";
            
            return "";
        }

        if (!password.match(/^[0-9]+$/))
        {
            this.errors += "password:password only numbers|";
            
            return "";
        }

        return password;
    }
}

export { PasswordValidator };