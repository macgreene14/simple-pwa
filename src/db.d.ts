declare module "./db" {
    export function addTodo(todo: { text: string; completed: boolean }): Promise<number>;
    export function getTodos(): Promise<{ id: number; text: string; completed: boolean }[]>;
    export function deleteTodo(id: number): Promise<void>;
    export function updateTodo(id: number, updates: Partial<{ text: string; completed: boolean }>): Promise<void>;
  }