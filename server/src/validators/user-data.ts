import {
    NameValidator,
    CPFValidator,
    EmailValidator,
    DateValidator,
    PasswordValidator,
} from ".";
import { User } from "../models";

class UserDataValidator
{
    public user: Partial<User>;
    public errors: string;
    
    private nameValidator = NameValidator;
    private cpfValidator = CPFValidator;
    private emailValidator = EmailValidator;
    private dateValidator = DateValidator;
    private passwordValidator = PasswordValidator;

    public constructor (user: User)
    {
        this.errors = "";
        this.user = this.validate(user);
    }

    private validate (user: User): Partial<User>
    {
        const validName = new this.nameValidator(user.name);
        const validCPF = new this.cpfValidator(user.cpf);
        const validEmail = new this.emailValidator(user.email);
        const validBirthdate = new this.dateValidator(user.birthdate);
        const validPassword = new this.passwordValidator(user.password);
    

        this.errors = this.errors.concat(`${validEmail.errors}${validName.errors}${validBirthdate.errors}${validCPF.errors}${validPassword.errors}`);

        const userData: Partial<User> = {
            name: validName.name,
            cpf: validCPF.cpf,
            email: validEmail.email,
            birthdate: validBirthdate.date,
            password: validPassword.password
        };

        return userData;
    }
}

export { UserDataValidator };
