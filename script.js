const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

let todos = [];

// When you refresh your browser
displayTodos();

// When you click Create Button ---> Create New Todo Data!
createBtn.addEventListener('click', createNewTodo);


// Create New Todo Data(obj)
function createNewTodo() {
    // 새로운 item 객체 생성
    const item = {
        id : new Date().getTime(),
        text : "",
        complete : false
    }

    // 배열 처음에 new item 추가
    todos.unshift(item);

    // Create HTML elements
    const {itemEl, inputEl, editBtnEl, removeBtnEl} = createTodoElement(item);
        // Prepend new todo item - list 안에 새로운 todo item 맨 위로 추가
    list.prepend(itemEl);

    inputEl.focus();

    // Save new item to LocalStorage
    saveToLocalStorage();
}

// Create Todo Element for HTML
function createTodoElement(item) {
    // class = "item"인 div 생성
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    // checkbox 생성
    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    if(item.complete) {
        itemEl.classList.add('complete');
    }

    // text input 생성
    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;

    // class = "actions"인 div 생성
    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    // Edit button 생성
    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    // Remove button 생성
    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = 'remove_circles';

    // Append created elements
    actionsEl.append(editBtnEl, removeBtnEl);
    itemEl.append(checkboxEl, inputEl, actionsEl);

    /* ----------------------- EventListeners ------------------------ */
    checkboxEl.addEventListener('change', () => {   // checkbox 체크/비체크
        item.complete = checkboxEl.checked;

        if (item.complete) {
            itemEl.classList.add('complete');
        }
        else {
            itemEl.classList.remove('complete');
        }
        saveToLocalStorage()
    })
    inputEl.addEventListener('input', () => {   // input 값 변경
        item.text = inputEl.value;
        saveToLocalStorage()
    })
    inputEl.addEventListener('blur', () => {    // input이 focus되지 않을 경우
        inputEl.setAttribute('disabled', '');
        saveToLocalStorage();
    })
    editBtnEl.addEventListener('click', () => {    // edit 버튼 클릭 시
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })
    removeBtnEl.addEventListener('click', () => {   // remove 버튼 클릭 시
        todos = todos.filter(t => t.id !== item.id);
        itemEl.remove();
        saveToLocalStorage();
    })
    /* --------------------------------------------------------------- */

    return {itemEl, inputEl, editBtnEl, removeBtnEl};
}

// Save to LocalStorage
function saveToLocalStorage() {
    const data = JSON.stringify(todos);
    localStorage.setItem('my_todos', data);
}

// Load from LocalStorage
function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos');
    if (data) {
        todos = JSON.parse(data);
    }
}

// Display existing todos on HTML
function displayTodos() {
    loadFromLocalStorage();

    for (i = 0; i < todos.length; i++) {
        const item = todos[i];
        const {itemEl} = createTodoElement(item);

        list.append(itemEl);
    }
}
