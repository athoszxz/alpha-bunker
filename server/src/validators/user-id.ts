class UserIDValidator
{
    public errors: string;
    public userID: string;

    public constructor (userID: string)
    {
        this.errors = "";
        this.userID = this.validate(userID);
    }

    private validate (userID: string): string
    {
        // const usersID = ["4337c027-6c63-40f1-801c-3643473976b2", "4337c027-6c63-40f1-801c-3643473976b2", "4337c027-6c63-40f1-801c-3643473976b2"];
        // if (!userID)
        // {
        //     this.errors += "userID:field required|";

        //     return "";
        // }

        // if (usersID.filter(user => user === userID).length === 0)
        // {
        //     this.errors += "userID:userID don't exist|";

        //     return "";
        // }

        return userID;
    }
}

export { UserIDValidator };