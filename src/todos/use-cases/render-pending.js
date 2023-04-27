import todoStore, { Filters } from "../../storage/todo.store";


let element

export const renderPending = ( elementId ) => {

    if ( !element )
        element = document.querySelector( elementId );

    if ( !element )
        throw new Error (`Element ${ elementId } not found` );

    element.innerHTML = todoStore.getTodos( Filters.Pending ).length;

}