import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Post()
    createUsers(@Body() user: { name: string; email: string }) {
        return this.usersService.createUsers(user.name, user.email);
    }
}
