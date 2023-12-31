import TodoApp from './todo-app.js';
import themeToggle from './theme-toggle.js';
// initiate theme toggle
themeToggle();
// Form for adding new Todo articles
const addTodoArticleForm = document.forms['addTodoArticle-form'];
addTodoArticleForm.onsubmit = addNewTodoArticleFormHandler;
const todoArticlesUl = document.getElementById('todo-articles');
let todoArticles;
// Get or init list of Todo Articles
function getTodoArticlesFromLS() {
    const todoArticlesJSON = localStorage.getItem('todo-articles');
    todoArticles = todoArticlesJSON !== null ? JSON.parse(todoArticlesJSON) : [];
}
getTodoArticlesFromLS();
// Handler for adding new Todo articles
function addNewTodoArticleFormHandler(e) {
    e.preventDefault();
    getTodoArticlesFromLS();
    if (e.target !== null) {
        const todoInput = e.target['addTodoArticle-input'];
        const todoAppName = todoInput.value
            .split(' ')
            .map((word) => word.trim())
            .join('');
        if (todoArticles.indexOf(todoAppName) !== -1) {
            return alert('Choose another Todo list title');
        }
        todoArticles.push(todoAppName);
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
    const newTodoArticles = todoArticles.filter((article) => article !== deleteButton.id);
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
    todoArticlesUl.innerHTML = '';
    todoArticles.forEach((todoArticle) => {
        const todoArticleLi = document.createElement('li');
        todoArticleLi.classList.add('flex');
        const todoArticleP = document.createElement('p');
        todoArticleP.innerText = todoArticle.toUpperCase();
        const deleteTodoArticleButton = document.createElement('button');
        deleteTodoArticleButton.innerText = 'Delete';
        deleteTodoArticleButton.classList.add('deleteTodoItem-button', 'btn', 'btn-primary');
        deleteTodoArticleButton.id = todoArticle;
        deleteTodoArticleButton.onclick = deleteTodoArticleFormHandler;
        todoArticleLi.append(todoArticleP, deleteTodoArticleButton);
        todoArticlesUl.appendChild(todoArticleLi);
        new TodoApp(todoArticle);
    });
}
initTodoArticlesList();
