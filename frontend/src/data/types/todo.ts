// types/todo.ts
export interface Todo {
  id: number;
  documentId: string;
  text: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}
