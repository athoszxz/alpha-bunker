class TypeValidator
{
    public errors: string;
    public type: string;

    public constructor (type: string)
    {
        this.errors = "";
        this.type = this.validate(type);
    }

    private validate (type: string): string
    {
        if (!type)
        {
            this.errors += "type:field required|";

            return "";
        }

        if(type !== "deposito" && type !== "saque" && type !== "transferencia")
        {
            this.errors += "type: this type don't exist|";
            
            return "";
        }
        // if (type.length < 3)
        // {
        //     this.errors += "type:type too short|";

        //     return "";
        // }

        // if (!type.trim())
        // {
        //     this.errors += "type:cannot be only space characters|";

        //     return "";
        // }

        return type.trim();
    }
}

export { TypeValidator };
