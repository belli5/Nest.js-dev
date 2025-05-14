import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-users.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService{

    constructor(private prisma: PrismaService){}


    async create({name, email, password}: CreateUserDTO){

        return await this.prisma.user.create({
            data: {
                name,
                email,
                password
            },
        });
    }

    async read(){

        return await this.prisma.user.findMany();
    }

    async readonly(id: number){

        return await this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }
}