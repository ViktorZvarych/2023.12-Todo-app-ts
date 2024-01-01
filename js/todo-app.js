// -----------TodoApp object constructor------------
export default class TodoApp {
    constructor(todoAppName) {
        this.todoAppName = todoAppName;
        this._addNewArticleToDocBody();
        // console.log('constructor_addNewArticleToDocBody');
        this._initTodoApp();
        // console.log('constructor_initTodoApp');
    }
    // Initialize Todo App
    _initTodoApp() {
        // console.log('1_initTodoApp');
        this._initAddTodoForm();
        // console.log('1-2_initAddTodoForm');
        this._initTodoList();
        // console.log('1-3_initTodoList');
        this._getDeletedTodoListFromLS();
        // console.log('1-4_getDeletedTodoListFromLS');
        this._initDeletedTodoList();
        // console.log('1-5_initDeletedTodoList');
    }
    // Add new article element to document body
    _addNewArticleToDocBody() {
        const todoArticle = document.createElement('article');
        todoArticle.classList.add('todoArticle', 'card');
        todoArticle.id =
            'article' +
                '-' +
                this.todoAppName
                    .split(' ')
                    .map((word) => word.trim())
                    .join('');
        const todoH2 = document.createElement('h2');
        todoH2.classList.add('card-header');
        todoH2.innerText = 'Todo list: ' + this.todoAppName.toUpperCase();
        const todoForm = document.createElement('form');
        todoForm.name =
            'addTodo-form' +
                '_' +
                this.todoAppName
                    .split(' ')
                    .map((word) => word.trim())
                    .join('');
        const todoLabel = document.createElement('label');
        todoLabel.classList.add('flex');
        const todoInput = document.createElement('input');
        todoInput.classList.add('form-control', 'm-2');
        todoInput.setAttribute('name', 'addTodo-input');
        todoInput.setAttribute('placeholder', 'Task');
        todoInput.required = true;
        const todoAddTaskButton = document.createElement('button');
        todoAddTaskButton.classList.add('btn', 'btn-primary', 'm-2');
        todoAddTaskButton.style.width = '190px';
        todoAddTaskButton.type = 'submit';
        todoAddTaskButton.innerText = 'Add new task';
        todoLabel.append(todoInput, todoAddTaskButton);
        todoForm.appendChild(todoLabel);
        const todoDiv = document.createElement('div');
        const todoH3 = document.createElement('h3');
        todoH3.classList.add('card-header');
        todoH3.innerText = 'Your tasks:';
        const todoOl = document.createElement('ol');
        todoOl.id =
            'todo-ol' +
                '_' +
                this.todoAppName
                    .split(' ')
                    .map((word) => word.trim())
                    .join('');
        todoOl.classList.add('todo-list');
        todoDiv.append(todoH3, todoOl);
        const deletedTodoDiv = document.createElement('div');
        const deletedTodoH3 = document.createElement('h3');
        deletedTodoH3.classList.add('card-header');
        deletedTodoH3.innerText = 'Deleted tasks:';
        const deletedTodoOl = document.createElement('ol');
        deletedTodoOl.id =
            'deletedTodo-ol' +
                '_' +
                this.todoAppName
                    .split(' ')
                    .map((word) => word.trim())
                    .join('');
        deletedTodoOl.classList.add('todo-list');
        deletedTodoDiv.append(deletedTodoH3, deletedTodoOl);
        todoArticle.append(todoH2, todoForm, todoDiv, deletedTodoDiv);
        const articleSection = document.getElementById('articles-section');
        articleSection.appendChild(todoArticle);
    }
    //   Get a list of Active tasks from LS and set it to LS
    _getTodoListFromLS() {
        const todoListFromLS = localStorage.getItem(this.todoAppName);
        this._todoList = todoListFromLS !== null ? JSON.parse(todoListFromLS) : [];
    }
    _setTodoListToLS() {
        localStorage.setItem(this.todoAppName, JSON.stringify(this._todoList));
        this._initTodoApp();
    }
    //   Get a list of Deleted tasks from LS and set it to LS
    _getDeletedTodoListFromLS() {
        const deletedTodoListFromLS = localStorage.getItem(this.todoAppName + 'deleted');
        this._deletedTodoList =
            deletedTodoListFromLS !== null ? JSON.parse(deletedTodoListFromLS) : [];
    }
    _setDeletedTodoListToLS() {
        localStorage.setItem(this.todoAppName + 'deleted', JSON.stringify(this._deletedTodoList));
    }
    // Initialize tasks list
    _initTodoList() {
        this._getTodoListFromLS();
        const todoOl = document.getElementById('todo-ol' +
            '_' +
            this.todoAppName
                .split(' ')
                .map((word) => word.trim())
                .join(''));
        todoOl.innerHTML = '';
        this._todoList.forEach(({ id, title, addDate }) => {
            const todoLi = document.createElement('li');
            const todoItemContainer = document.createElement('div');
            todoItemContainer.classList.add('todoItem-container');
            const todoP = document.createElement('p');
            todoP.setAttribute('todoP-id', `${id}`);
            todoP.innerText = `${title}`;
            const todoAddDateP = document.createElement('p');
            todoAddDateP.innerText = `${addDate}`;
            const deleteTodoLiButton = document.createElement('button');
            deleteTodoLiButton.innerText = 'Delete';
            deleteTodoLiButton.classList.add('deleteTodoItem-button', 'btn', 'btn-primary');
            deleteTodoLiButton.addEventListener('click', () => {
                this._deletedTodoList.push(this._todoList.filter((item) => item.id === id)[0]);
                this._setDeletedTodoListToLS();
                this._todoList = this._todoList.filter((item) => item.id !== id);
                this._setTodoListToLS();
                console.log('delete task');
            });
            const editTodoLiButton = document.createElement('button');
            editTodoLiButton.innerText = 'Edit';
            editTodoLiButton.classList.add('editTodoItem-button', 'btn', 'btn-primary');
            editTodoLiButton.addEventListener('click', () => {
                const editTodoForm = document.createElement('form');
                const editTodoLabel = document.createElement('label');
                editTodoLabel.classList.add('flex');
                const editTodoInput = document.createElement('input');
                editTodoInput.classList.add('form-control', 'm-2');
                editTodoInput.setAttribute('name', 'editTodo-input');
                editTodoInput.setAttribute('placeholder', 'Task');
                editTodoInput.required = true;
                const saveEditTodoButton = document.createElement('button');
                saveEditTodoButton.classList.add('btn', 'btn-primary', 'm-2');
                saveEditTodoButton.type = 'submit';
                saveEditTodoButton.innerText = 'Save';
                const closeEditTodoButton = document.createElement('button');
                closeEditTodoButton.classList.add('btn', 'btn-primary', 'm-2');
                closeEditTodoButton.type = 'button';
                closeEditTodoButton.innerText = 'Close';
                closeEditTodoButton.onclick = () => editTodoForm.remove();
                editTodoLabel.append(editTodoInput, saveEditTodoButton, closeEditTodoButton);
                editTodoForm.appendChild(editTodoLabel);
                editTodoForm.onsubmit = (e) => {
                    e.preventDefault();
                    if (e.target !== null) {
                        const todoInput = e.target['editTodo-input'];
                        console.log(todoInput.value);
                        todoP.innerText = todoInput.value;
                        this._todoList.forEach((item) => (item.title = item.id === id ? todoInput.value : item.title));
                    }
                    this._setTodoListToLS();
                    console.log('edit task');
                    editTodoForm.remove();
                };
                todoLi.appendChild(editTodoForm);
            });
            // const saveEditTodoLiButton = document.getElementById(
            //   'saveEditTodoLiButton'
            // );
            todoItemContainer.append(todoP, todoAddDateP, deleteTodoLiButton, editTodoLiButton);
            todoLi.appendChild(todoItemContainer);
            todoOl.appendChild(todoLi);
        });
    }
    _initAddTodoForm() {
        const forms = document.forms;
        const todoForm = forms['addTodo-form' + '_' + this.todoAppName];
        todoForm.onsubmit = (e) => {
            var _a;
            e.preventDefault();
            this._getTodoListFromLS();
            if (e.target !== null) {
                const todoInput = e.target['addTodo-input'];
                const id = ((_a = this._todoList.slice(-1)[0]) === null || _a === void 0 ? void 0 : _a.id) + 1 || 1;
                const addDate = new Date().toLocaleDateString() +
                    ' ' +
                    new Date().toLocaleTimeString();
                const newTodo = { id, title: todoInput.value, addDate };
                this._todoList.push(newTodo);
                todoForm.reset();
                this._setTodoListToLS();
                console.log('add new task');
            }
        };
    }
    _initDeletedTodoList() {
        this._getDeletedTodoListFromLS();
        const deletedTodoOl = document.getElementById('deletedTodo-ol' +
            '_' +
            this.todoAppName
                .split(' ')
                .map((word) => word.trim())
                .join(''));
        deletedTodoOl.innerHTML = '';
        this._deletedTodoList.forEach(({ id, title }) => {
            const deletedTodoLi = document.createElement('li');
            const deletedTodoItemContainer = document.createElement('div');
            deletedTodoItemContainer.classList.add('todoItem-container');
            const deletedTodoP = document.createElement('p');
            deletedTodoP.innerText = `${title}`;
            deletedTodoP.classList.add('todoItem-deleted');
            const deletedTodoLiButtons = document.createElement('div');
            deletedTodoLiButtons.style.display = 'flex';
            // deletedTodoLiButtons.style.flexDirection = 'column';
            const restoreTodoLiButton = document.createElement('button');
            restoreTodoLiButton.innerText = 'Restore';
            restoreTodoLiButton.classList.add('todo-button', 'restoreTodoLi-button', 'btn', 'btn-primary');
            restoreTodoLiButton.onclick = () => {
                this._todoList.push(this._deletedTodoList.filter((item) => item.id === id)[0]);
                this._deletedTodoList = this._deletedTodoList.filter((item) => item.id !== id);
                this._setDeletedTodoListToLS();
                this._setTodoListToLS();
            };
            const removeTodoLiButton = document.createElement('button');
            removeTodoLiButton.innerText = 'Remove';
            removeTodoLiButton.classList.add('todo-button', 'removeTodoLi-button', 'btn', 'btn-primary');
            removeTodoLiButton.onclick = () => {
                this._deletedTodoList = this._deletedTodoList.filter((item) => item.id !== id);
                this._setDeletedTodoListToLS();
                this._setTodoListToLS();
            };
            deletedTodoLiButtons.append(restoreTodoLiButton, removeTodoLiButton);
            deletedTodoItemContainer.append(deletedTodoP, deletedTodoLiButtons);
            deletedTodoLi.appendChild(deletedTodoItemContainer);
            deletedTodoOl.appendChild(deletedTodoLi);
        });
    }
}
