class DateValidator
{
    public date: string;
    public errors: string;
    private regex = /^\d{4}-\d{2}-\d{2}$/;

    public constructor (date: string)
    {
        this.errors = "";
        this.date = this.validate(date);
        // birthdateregex
        //^(?:(?:(?:0?[1-9]|1\d|2[0-8])\/(?:0?[1-9]|1[0-2])\/(?:1\d{1,2}|2\d{1,3}))|(?:(?:29|30)\.(?:0?[13578]|1[02])\.\d{1,2})|(?:0?[1-9]|1\d|2[0-8])\.(?:29|30)\.(?:1\d{1,2}|2\d{1,3}))$
    }

    private validate (date: string): string
    {
        if (!date)
        {
            this.errors += "birthdate:birthdate required";

            return "";
        }

        if (!this.regex.test(date))
        {
            this.errors += "birthdate:invalid birthdate";

            return "";
        }

        if (!new Date(date).getTime())
        {
            this.errors += "birthdate:invalid date|";

            return "";
        }

        if(new Date(date).getTime() > new Date().getTime())
        {
            this.errors += "birthdate:date in the future|";

            return "";
        }

        if(new Date(date).getTime() < new Date("01/01/1900").getTime())
        {
            this.errors += "birthdate:date in the past only at 1900 maximum|";

            return "";
        }

        return date.trim();
    }
}

export { DateValidator };
