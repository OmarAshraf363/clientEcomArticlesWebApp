export interface Category {
  id: number;
  createdAt: Date;
  name: string;
  description: string;
}
export interface CreateCategory {
  name: string;
  description: string;
}
export interface UpdtaeCategory {
  id: number;
  name: string;
  description: string;
}
