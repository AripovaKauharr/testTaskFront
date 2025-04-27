export interface User {
  userName: string
  email: string
  role: string
}
export interface CreateUser {
  userName: string
  email: string
  roleId: number 
}