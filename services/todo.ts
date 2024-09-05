import axios from './api';
import {Todo} from './types';

interface TodoServiceInterface {
  TodoList(): Promise<Todo[]>;
//   getTodoDetail(id: number): Promise<Todo>;
//   updateTodoDetail(todo: Todo): Promise<Todo>;
//   deleteTodoDetail(id: number): Promise<void>;
}

class TodoService implements TodoServiceInterface {
//   getTodoDetail(id: number): Promise<Todo> {
//     throw new Error('Method not implemented.');
//   }
//   updateTodoDetail(todo: Todo): Promise<Todo> {
//     throw new Error('Method not implemented.');
//   }
//   deleteTodoDetail(id: number): Promise<void> {
//     throw new Error('Method not implemented.');
//   }
  TodoList(): Promise<Todo[]> {
    return axios.get('/api/v1/todo/').then(res => res.data);
  }
}

export default function TodoServiceAPI() {
  return new TodoService();
}
