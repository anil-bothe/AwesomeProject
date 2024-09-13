import axios from './api';
import {Todo} from './types';

interface TodoServiceInterface {
  TodoList(): Promise<Todo[]>;
  UpdateTodo(todo: Todo): Promise<Todo>;
  DeleteTodo(id: number): Promise<void>;
  AddTodo(todo: Todo): Promise<Todo>;
}

class TodoService implements TodoServiceInterface {
  AddTodo(todo: Todo): Promise<Todo> {
    return axios.post('/api/v1/todo/', todo).then(res => res.data);
  }
  DeleteTodo(id: number): Promise<void> {
    return axios.delete(`/api/v1/todo/${id}/`);
  }
  UpdateTodo(todo: Todo): Promise<Todo> {
    return axios.put(`/api/v1/todo/${todo.id}/`, todo).then(res => res.data);
  }
  TodoList(): Promise<Todo[]> {
    return axios.get('/api/v1/todo/').then(res => res.data);
  }
}

export default function TodoServiceAPI() {
  return new TodoService();
}
