import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-users.dto";
import { UpdatePutUserDTO } from "./dto/update-pu-user.dto";
import { UpdatePatchDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{

    constructor(private userService: UserService){}


    @Post()
    async create(@Body() data: CreateUserDTO){
        
        return this.userService.create(data);
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
    async update(@Body() data : UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number){
        
        return this.userService.update(id, data);
    }

    @Patch(':id')
    async updatPartial(@Body() data: UpdatePatchDTO, @Param('id', ParseIntPipe) id:number){
        
        return this.userService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        this.userService.exists(id)
        return this.userService.delete(id);
    }
}