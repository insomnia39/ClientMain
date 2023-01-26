import { IProfilePicture } from "./IProfilePicture";

export interface IProfile{
    username?: string;
    id?: string;
    point?: number;
    profilePicture?: IProfilePicture
}