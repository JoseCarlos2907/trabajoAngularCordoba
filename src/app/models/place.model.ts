export class PlaceModel{
    constructor(
        public id: string,
        public name: string,
        public smallParagraph: string,
        public allParagraphs: string,
        public rating: Array<string>,
        public images: Array<string>,
        
    ){}
}

