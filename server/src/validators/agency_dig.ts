class AgencyDigValidator
{
    public errors: string;
    public agency_dig: number;

    public constructor (agency_dig: number)
    {
        this.errors = "";
        this.agency_dig = this.validate(agency_dig);
    }

    private validate (agency_dig: number): number
    {
        if (!agency_dig)
        {
            this.errors += "agency_dig:field required|";

            return 0;
        }

        //only 1 digits
        if (agency_dig.toString().length !== 1)
        {
            this.errors += "agency_dig:agency_dig only have 1 digit|";

            return 0;
        }

        return agency_dig;
    }
}

export { AgencyDigValidator };