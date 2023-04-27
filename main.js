import './style.css';

import { App } from './src/todos/app';
import todoStore from './src/storage/todo.store';


todoStore.initStore();

App('#app');
