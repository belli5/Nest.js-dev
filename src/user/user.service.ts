import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-users.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-pu-user.dto";
import { UpdatePatchDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService{

    constructor(private prisma: PrismaService){}


    async create({name, email, password}: CreateUserDTO){

        return await this.prisma.user.create({
            data: {
                name,
                email,
                password,
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

    async update(id: number, {email, name, password, atbirth}: UpdatePutUserDTO){

        await this.exists(id);

        return this.prisma.user.update({
            data: {
                email, 
                name, 
                password, 
                atbirth: atbirth ? new Date(atbirth) : null
            },
            where:{
                id
            }
        });
    }

    async updatePartial(id: number, {email, name, password, atbirth}: UpdatePatchDTO){
        
        await this.exists(id);

        const data: any = {}

        if (atbirth){
            data.atbirth = new Date(atbirth)
        }

        if(email){
            data.email = email;
        }

        if(name){
            data.name = name;
        }

        if(password){
            data.password = password;
        }

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        });
    }

    async delete(id: number){

        await this.exists(id);

        return this.prisma.user.delete({
            where:{
                id
            }
        })
    }

    async exists(id: number){

        if(!(await this.readonly(id))){
            throw new NotFoundException(`the user ${id} not exist`);
        }
    }
}