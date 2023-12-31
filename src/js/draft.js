// Version1
const todoArticle = document.createElement('article');

const todoH2 = document.createElement('h2');
todoH2.innerText = 'Todo list:' + this.todoAppName;

const todoForm = document.createElement('form');
todoForm.name = 'addTodo-form' + '_' + this.todoAppName;
const todoLabel = document.createElement('label');
const todoInput = document.createElement('input');
todoInput.setAttribute('name', 'addTodo-input');
todoInput.setAttribute('placeholder', 'Task');
todoInput.required = true;
const todoAddTaskButton = document.createElement('button');
todoAddTaskButton.type = 'submit';
todoAddTaskButton.innerText = 'Add new task';
todoLabel.append(todoInput, todoAddTaskButton);
todoForm.appendChild(todoLabel);

const todoDiv = document.createElement('div');
const todoH3 = document.createElement('h3');
todoH3.innerText = 'New tasks:';
const todoOl = document.createElement('ol');
todoOl.id = 'todo-ol' + '_' + this.todoAppName;
todoOl.classList.add('todo-list');
todoDiv.append(todoH3, todoOl);

const deletedTodoDiv = document.createElement('div');
const deletedTodoH3 = document.createElement('h3');
deletedTodoH3.innerText = 'New tasks:';
const deletedTodoOl = document.createElement('ol');
deletedTodoOl.id = 'deletedTodo-ol' + '_' + this.todoAppName;
deletedTodoOl.classList.add('todo-list');
deletedTodoDiv.append(todoH3, todoOl);

todoArticle.append(todoH2, todoForm, todoDiv, deletedTodoDiv);
document.body.appendChild(todoArticle);


// Version 2

const todoArticle2 = `<article id=${'article' + '-' + this.todoAppName
        .split(' ')
        .map((word) => word.trim())
        .join('')
    } class="article">
      <form name=${ 'addTodo-form' + '_' + this.todoAppName
          .split(' ')
          .map((word) => word.trim())
          .join('')
      }>
        <label>
          <input type="text" name="addTodo-input" placeholder="Task title" required
          />
          <button type="submit">Add new task</button>
        </label>
      </form>

    <div>
      <h3>New tasks</h3>
      <ol id=${'todo-ol' + '_' + this.todoAppName
          .split(' ')
          .map((word) => word.trim())
          .join('')
      } class="todo-list"></ol>
    </div>

    <div>
    <h3>New tasks</h3>
    <ol id=${'deletedTodo-ol' + '_' + this.todoAppName
        .split(' ')
        .map((word) => word.trim())
        .join('')
    } class="todo-list"></ol>
    </div>
    </article>`;