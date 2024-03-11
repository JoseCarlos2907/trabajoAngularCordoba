export class RatingsModel{

    constructor(
        public id: string,
        public idUser: string,
        public idPlace: string,
        public rating: string,
        public comment: string,
    ){}
}