import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { id: '1', name: 'Usuario 1', email: 'user1@example.com' }
    ];

    getUsers() {
        return this.users;
    }

    createUsers(name: string, email: string) {
        const user = {
            id: String(this.users.length + 1),
            name,
            email
        };
        this.users.push(user);
        return user;
    }
}
