export interface User {
    Id :string,
    Name : string,
    Email: string,
    Password : string,
    isEmailSent : number,
    isDeleted : number    
}

export interface Payload{
    Sub : string,
    Name : string
}