import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-users.dto";
import { UpdatePutUserDTO } from "./dto/update-pu-user.dto";
import { UpdatePatchDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{

    constructor(private userService: UserService){}


    @Post()
    async create(@Body() {name, email, password}: CreateUserDTO){
        
        return this.userService.create({
            name, 
            email, 
            password
        });
    }

    @Get()
    async read(){
        
        return this.userService.read();
    }

    @Get(':id')
    async readonly(@Param('id', ParseIntPipe) id: number){
        
        return this.userService.readonly(id);
    }

    @Put(':id')
    async update(@Body() {email, name, password}: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number){
        return {
            mathod: 'put',
            email, name, password, 
            id
        }
    }

    @Patch(':id')
    async updatPartial(@Body() {name, email, password}: UpdatePatchDTO, @Param('id', ParseIntPipe) id:number){
        return {
            mathod: 'patch',
            name, email, password,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return {
            id
        }
    }
}