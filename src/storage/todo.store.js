import { Todo } from "../todos/models/todos.model";

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}


const state = {
    todos: [
        new Todo('Piedra 1'),
        new Todo('piedra 2'),
        new Todo('Piedra 3'),
        new Todo('Piedra 4'),
        new Todo('Piedra 5')
    ],
    filters: Filters.All,

}

const initStore = () => {

    loadStore();
    console.log('initStore');
}

const loadStore = () => {
    if ( !localStorage.getItem( 'state' ) ) return;
    
    const { todos = [], filters= Filters.All } = JSON.parse( localStorage.getItem('state') );
        state.todos = todos;
        state.filters = filters;
}

const saveStateToLocalStorage = () => {

    localStorage.setItem( 'state', JSON.stringify( state ));
}

const getTodos = ( filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter( todos => todos.done === true );

        case Filters.Pending:
            return state.todos.filter( todos => todos.done === false );
            
    
        default:
            throw new Error (`This ${ filter } is not valid.`);
            
    }

}

/**
 * 
 * @param {String} description
 */
const addTodo = ( description ) => {
    if (!description) throw new Error ('Description is requiered');
    state.todos.push( new Todo( description));
    saveStateToLocalStorage();
    
}

const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if (todo.id === todoId ) {
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter( todos => todos.id !== todoId );
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todos => !todos.done );
    saveStateToLocalStorage();

}

const setFilter = ( newFilter = Filters.All ) => {
    state.filters = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filters;
}

export default {
    initStore,
    loadStore,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,}