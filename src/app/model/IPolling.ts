import { IContent } from "./IContent";

export interface IPolling {
    id: string;
    title: string;
    optionNumber: number;
    content: IContent;
    totalPoint: number;
    isWin: boolean;
}