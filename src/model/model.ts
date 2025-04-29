export interface Task {
    id:number|null;
    title: string;
    description : string;
    completed : boolean;
    user: User;
}

export interface User {
    id: number|null;
    username?: string;
    role  ?: string;
    email ?: string;
    enabled ?: boolean;
    password ?: string;
    tasks ?: Task[];
}
export interface TokenM {
    access_expires_in_hours: number
    access_generate_at: string
    access_token:string
}
export type JwtPayload = {
    sub: string;
    exp: number;
    iat: number;
    // ajoute tes claims custom ici si tu en as
    roles?: string[];
    user?: User;
};
