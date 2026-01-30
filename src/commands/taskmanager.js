import {readTasks ,saveTasks} from '../db/store.js';
import chalk from 'chalk';
import inquirer from 'inquirer'; 


export const addTask = async(taskname)=>{
    const task = await readTasks ();
    task.push({id:Date.now(), task:taskname , completed:false});
    await saveTasks(task);
    console.log(chalk.green.bold("Task Added Succesfully !"));
} 

export const listTask = async()=>{
    const task = await readTasks();
    if (task.length === 0){
        console.log(chalk.yellow("Your today's Tasklist is empty ! "));
        return ;
    }
    task.forEach((t,i)=>{
        const status = t.completed ? chalk.green('[✔]') :chalk.red('[]');
        console.log(`${i + 1}. ${status} ${t.task}`);
    });
};

export const deleteTask = async(index)=>{
    const tasks = await readTasks();
    const taskIndex = parseInt(index)-1;

    if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
    console.log(chalk.red.bold('! Error: Invalid task number. Use "todo list" to see available numbers.'));
    return;
  }

  const [removedTask] = tasks.splice(taskIndex, 1);
  
  await saveTasks(tasks);
  
  console.log(chalk.magenta(` Removed task: "${removedTask.task}"`));

}

export const completeTask = async (index) => {
  const tasks = await readTasks();
  const taskIndex = parseInt(index) - 1;

  if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
    console.log(chalk.red.bold('! Error: Task not found. Check your list number.'));
    return;
  }
  tasks[taskIndex].completed = true;
  await saveTasks(tasks);
  console.log(
    chalk.cyan.bold(`Marked as done: `) + 
    chalk.strikethrough(tasks[taskIndex].task)
  );
};

export const clearTasks = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmClear',
      message: chalk.yellow('Are you absolutely sure you want to wipe your entire list?'),
      default: false, // Safer default
    },
  ]);

  if (answers.confirmClear) {
    await saveTasks([]);
    console.log(chalk.bgRed.white.bold(' CLEANED ') + chalk.red(' Your list is now empty.'));
  } else {
    console.log(chalk.blue('Operation cancelled. Your tasks are safe! '));
  }
};;

export const listPending = async () => {
  const tasks = await readTasks();
  const pending = tasks.filter((t) => !t.completed);

  if (pending.length === 0) {
    console.log(chalk.cyan('No pending tasks! You are all caught up. 🎉'));
    return;
  }

  console.log(chalk.underline.bold('\n Pending Tasks:'));
  pending.forEach((t, i) => {
    console.log(`${chalk.yellow(i + 1 + '.')} [ ] ${t.task}`);
  });
  console.log('\n');
};