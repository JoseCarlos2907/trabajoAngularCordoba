export class UserModel{

    constructor(
        public id: number,
        public role: string,
        public firstName: string,
        public lastName: string,
        public birthdayDate: Date | null,
        public email: string,
        public phoneNumber: string,
        public gender: string,
        public comunity: string,
        public password: string,
        public token: string
    ){}

}