#!/usr/bin/env node
import { Command } from 'commander';
import { addTask, listTask ,deleteTask,completeTask,clearTasks ,listPending  } from '../src/commands/taskmanager.js';

const program = new Command();

program
  .name('todo-cli')
  .description('An industry-grade CLI to manage your daily grind')
  .version('1.0.0');


program
  .command('add <task>') //Add a task: todo add "Finish the Node project"
  .description('Add a new task')
  .action(addTask);

program
  .command('list')
  .description('List all tasks')
  .action(listTask); //See your list: todo list


program
  .command('delete <index>')
  .description('Delete a task by its list number ')
  .action(deleteTask); //Delete the first item: todo delete 1

program
  .command('done <index>')
  .description('Mark a task as completed')
  .action(completeTask); // todo done 1

program
  .command('clear')
  .description('Remove all tasks from your list (Permanent!)')
  .action(clearTasks); // todo clear 

program
  .command('pending')
  .description('Show only the tasks you still need to finish')
  .action(listPending); //todo pending

program.parse();