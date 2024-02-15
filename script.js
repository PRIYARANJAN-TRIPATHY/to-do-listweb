document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="${task.completed ? 'completed' : ''}" data-index="${index}">${task.name}</span>
          <input type="text" class="edit-input" data-index="${index}" value="${task.name}" style="display: none;">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
          <button class="complete-btn">${task.completed ? 'Uncomplete' : 'Complete'}</button>
        `;
        li.querySelector('.edit-btn').addEventListener('click', () => editTask(li));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
        li.querySelector('.complete-btn').addEventListener('click', () => toggleTask(index));
        taskList.appendChild(li);
      });
    };
  
    const addTask = () => {
      const taskName = taskInput.value.trim();
      if (taskName) {
        tasks.push({ name: taskName, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
      }
    };
  
    const editTask = (li) => {
      const span = li.querySelector('span');
      const input = li.querySelector('.edit-input');
      const editBtn = li.querySelector('.edit-btn');
      if (input.style.display === 'none') {
        span.style.display = 'none';
        input.style.display = 'inline-block';
        input.focus();
        editBtn.textContent = 'Save';
      } else {
        const index = input.dataset.index;
        tasks[index].name = input.value.trim();
        saveTasks();
        renderTasks();
      }
    };
  
    const toggleTask = (index) => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };
  
    const deleteTask = (index) => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
  
    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    addTaskBtn.addEventListener('click', addTask);
  
    renderTasks();
  });
  