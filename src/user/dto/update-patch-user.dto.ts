import { CreateUserDTO } from "./create-users.dto";
import {PartialType} from '@nestjs/mapped-types';

export class UpdatePatchDTO extends PartialType(CreateUserDTO){

}