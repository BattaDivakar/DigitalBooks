export class Book {
    id:number =0;
    authorId:number= 0;
    title:string = '';
    category:string = '';
    price: number = 0.00;
    content :string = "";
    publisher:string ="";
    publisherDate: Date =  new Date();
    chapters: string ="";
    filePath :string ="";
    active:boolean= true;
}