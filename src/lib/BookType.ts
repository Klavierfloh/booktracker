export type BookType = {
    BookId: number
    Name: string,
    Author_AuthorId?:number,
    PartOfSeries?:number,
    PageCount:number,
    CurrentPage:number,
    TimesRead?:number
};