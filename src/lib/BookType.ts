export type BookType = {
    title: string,
    author?:string,
    partOfSeries?:boolean,
    wichPartOfSeries?:number,
    pages:number,
    currentPage:number,
    timesRead?:number
};