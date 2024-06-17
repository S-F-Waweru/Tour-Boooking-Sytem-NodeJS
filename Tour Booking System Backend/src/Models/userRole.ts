export interface UserRole{
    Id :string,
    UserId: string
    Role : string   
}

export enum Role{"ADMIN"="admin", "CUSTOMER" = "customer"}