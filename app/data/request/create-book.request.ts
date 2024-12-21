export type createBookRequest = {
    name: string;
    description: string;
    price: number;
    publisherID: number;
    authorIDs: number[];
}