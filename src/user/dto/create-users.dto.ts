import { IsDate, IsDateString, IsEmail, IsOptional, IsString, IsStrongPassword, minLength } from "class-validator";

export class CreateUserDTO{

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0,
        minLowercase: 0,
    })
    password: string;

    @IsOptional()
    @IsDateString()
    atbirth?: string;

}