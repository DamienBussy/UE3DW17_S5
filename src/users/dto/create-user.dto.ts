export class CreateUserDto {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role:string;
    createdAt: Date;
    updatedAt: Date;
}
