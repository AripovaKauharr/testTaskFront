export interface Calls {
  userName: string
  email: string
  role: string
}
export interface Pages {
  lastPage: number
  page: number
  total: number
}
export interface GetCalls extends Pages{
  data: Calls[]
}