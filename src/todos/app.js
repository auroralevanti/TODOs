import html from './app.html?raw';
import todoStore, { Filters } from '../storage/todo.store';
import { renderPending, renderTodos } from './use-cases';


const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}


/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {

        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
        
    }

    const updatePendingCount = () => {
        renderPending( ElementIDs.PendingCountLabel );
       
    }

    (() =>{

        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector( elementId ).append( app );
        displayTodos();
        
    }
    
    )();

    //Referencia HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const element = document.querySelector(ElementIDs.TodoList); //Sirve para toggle y deleteTodo
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );
    

    //Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
       
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
        updatePendingCount();
        
        

    });

    element.addEventListener('click', (event) => {
        
        const li = event.target.closest('[data-id]');
        todoStore.toggleTodo(li.getAttribute('data-id'));
        displayTodos();
        updatePendingCount();

    });

    element.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
            if (!isDestroyElement) return;

        const element = event.target.closest('[data-id]');
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
        updatePendingCount();

    });

    clearCompletedButton.addEventListener('click', ( event ) => {
        const notDelete = event.target.className ==='complete';
            if (notDelete) return;

        todoStore.deleteCompleted();
        displayTodos();
        updatePendingCount();
        

    });

    filtersLIs.forEach( element => {
        element.addEventListener('click', (element => {
            filtersLIs.forEach( el => el.classList.remove('selected') );
            element.target.classList.add('selected');

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                    break;

                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                    break;

                case 'Completados':
                    todoStore.setFilter(Filters.Completed );
                    break;
            };
            
            displayTodos();
            updatePendingCount();

        }))
    })

    
  
}