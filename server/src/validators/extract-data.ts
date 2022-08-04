import {
    AgencyValidator,
    AgencyDigValidator,
    Number2Validator,
    NumberDigValidator,
    CPFValidator,
} from ".";
import { Extract } from "../models";

class ExtractDataValidator
{
    public extract: Partial<Extract>;
    public errors: string;

    private agencyValidator = AgencyValidator;
    private agencyDigValidator = AgencyDigValidator;
    private numberValidator = Number2Validator;
    private numberDigValidator = NumberDigValidator;
    private cpfValidator = CPFValidator;

    public constructor (extract: Extract)
    {
        this.errors = "";
        this.extract = this.validate(extract);
    }

    private validate (extract: Extract): Partial<Extract>
    {
        const validAgency = new this.agencyValidator(extract.agency);
        const validAgencyDig = new this.agencyDigValidator(extract.agency_dig);
        const validNumber = new this.numberValidator(extract.number);
        const validNumberDig = new this.numberDigValidator(extract.number_dig);
        const validCPF = new this.cpfValidator(extract.cpf);

        

        this.errors = this.errors.concat(`${validAgency.errors}${validAgencyDig.errors}${validNumber.errors}${validNumberDig.errors}${validCPF.errors}`);

        const extractData: Partial<Extract> = {
            agency: validAgency.agency,
            agency_dig: validAgencyDig.agency_dig,
            number: validNumber.number,
            number_dig: validNumberDig.number_dig,
            cpf: validCPF.cpf
        };

        return extractData;
    }
}

export { ExtractDataValidator };
