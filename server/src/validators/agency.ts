class AgencyValidator
{
    public errors: string;
    public agency: number;

    public constructor (agency: number)
    {
        this.errors = "";
        this.agency = this.validate(agency);
    }

    private validate (agency: number): number
    {
        if (!agency)
        {
            this.errors += "agency:field required|";

            return 0;
        }

        //only 4 digits
        if (agency < 1000 || agency > 9999)
        {
            this.errors += "agency:agency only 4 digits|";

            return 0;
        }

        return agency;
    }
}

export { AgencyValidator };