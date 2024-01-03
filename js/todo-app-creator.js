import TodoApp from './todo-app.js';
const TodoAppCreator = () => {
    // Form for adding new Todo articles
    const addTodoArticleForm = document.forms['addTodoArticle-form'];
    addTodoArticleForm.onsubmit = addNewTodoArticleFormHandler;
    const todoArticlesTBody = document.getElementById('todo-articles');
    let todoArticles;
    // Get or init list of Todo Articles
    function getTodoArticlesFromLS() {
        const todoArticlesJSON = localStorage.getItem('todo-articles');
        todoArticles =
            todoArticlesJSON !== null ? JSON.parse(todoArticlesJSON) : [];
    }
    getTodoArticlesFromLS();
    // Handler for adding new Todo articles
    function addNewTodoArticleFormHandler(e) {
        e.preventDefault();
        getTodoArticlesFromLS();
        if (e.target !== null) {
            const todoInput = e.target['addTodoArticle-input'];
            const todoArticleTitle = todoInput.value
                .split(' ')
                .map((word) => word.trim())
                .join('_');
            for (const todoArticle of todoArticles) {
                if (todoArticle.title === todoArticleTitle) {
                    return alert('Choose another Todo list title');
                }
            }
            todoArticles.push({ title: todoArticleTitle, shown: true });
            localStorage.setItem('todo-articles', JSON.stringify(todoArticles));
            getTodoArticlesFromLS();
            addTodoArticleForm.reset();
            initTodoArticlesList();
        }
    }
    // Handler for deleting Todo articles
    function deleteTodoArticleFormHandler(e) {
        getTodoArticlesFromLS();
        const deleteButton = e.target;
        const newTodoArticles = todoArticles.filter((article) => article.title !== deleteButton.id);
        localStorage.setItem('todo-articles', JSON.stringify(newTodoArticles));
        initTodoArticlesList();
        const deletedArticle = document.getElementById('article' + '-' + deleteButton.id);
        deletedArticle === null || deletedArticle === void 0 ? void 0 : deletedArticle.remove();
        localStorage.removeItem(deleteButton.id);
        localStorage.removeItem(deleteButton.id + 'deleted');
    }
    // Initialize todo articles list
    function initTodoArticlesList() {
        getTodoArticlesFromLS();
        const articleElements = document.body.querySelectorAll('.todoArticle');
        articleElements.forEach((article) => article.remove());
        todoArticlesTBody.innerHTML = '';
        todoArticles.forEach((todoArticle) => {
            const todoArticleTr = document.createElement('tr');
            const todoArticleTd1 = document.createElement('td');
            todoArticleTd1.innerText = todoArticle.title.toUpperCase();
            const todoArticleTd2 = document.createElement('td');
            const deleteTodoArticleButton = document.createElement('button');
            deleteTodoArticleButton.innerText = 'Delete';
            deleteTodoArticleButton.classList.add('deleteTodoItem-button', 'btn', 'btn-primary');
            deleteTodoArticleButton.id = todoArticle.title;
            deleteTodoArticleButton.onclick = deleteTodoArticleFormHandler;
            todoArticleTd2.appendChild(deleteTodoArticleButton);
            const todoArticleTd3 = document.createElement('td');
            todoArticleTd3.style.width = '120px';
            const todoArticleTd3Div = document.createElement('div');
            todoArticleTd3Div.classList.add('form-check', 'form-switch', 'theme-toggle');
            const todoArticleTd3Input = document.createElement('input');
            todoArticleTd3Input.classList.add('form-check-input');
            todoArticleTd3Input.setAttribute('type', 'checkbox');
            todoArticleTd3Input.setAttribute('role', 'switch');
            todoArticleTd3Input.setAttribute('id', todoArticle.title + 'switchTodoListInput');
            todoArticleTd3Input.checked = true;
            const todoArticleTd3Label = document.createElement('label');
            todoArticleTd3Label.classList.add('form-check-label');
            todoArticleTd3Label.setAttribute('for', todoArticle.title + 'switchTodoListInput');
            todoArticleTd3Label.setAttribute('id', todoArticle.title + 'switchTodoListLabel');
            todoArticleTd3Div.onclick = () => {
                const todoList = document.getElementById('article-' + todoArticle.title);
                todoArticleTd3Label.innerHTML = todoArticleTd3Input.checked
                    ? 'Hide'
                    : 'Show';
                for (const aricle of todoArticles) {
                    if (aricle.title === todoArticle.title) {
                        todoArticle.shown = todoArticleTd3Input.checked ? true : false;
                    }
                }
                localStorage.setItem('todo-articles', JSON.stringify(todoArticles));
                getTodoArticlesFromLS();
                console.log(todoArticle.shown);
                todoList.style.display = todoArticle.shown ? 'block' : 'none';
                console.log(todoList);
            };
            todoArticleTd3Div.append(todoArticleTd3Input, todoArticleTd3Label);
            todoArticleTd3.appendChild(todoArticleTd3Div);
            todoArticleTr.append(todoArticleTd1, todoArticleTd2, todoArticleTd3);
            todoArticlesTBody.appendChild(todoArticleTr);
            // Create todo list
            new TodoApp(todoArticle.title);
            // check if DOM has to display todo list
            todoArticleTd3Input.checked = todoArticle.shown ? true : false;
            todoArticleTd3Label.innerHTML = todoArticle.shown ? 'Hide' : 'Show';
            //set display style for todo list article
            const todoList = document.getElementById('article-' + todoArticle.title);
            todoList.style.display = todoArticle.shown ? 'block' : 'none';
        });
    }
    initTodoArticlesList();
};
export default TodoAppCreator;
