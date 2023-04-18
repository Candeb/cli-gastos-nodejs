import { get, save } from './filesMethods.js';
import { promptNewExpense } from './expensePrompts.js';
import inquirer from 'inquirer';

const main = async () => {
  console.log('💸 Bienvenido a tu App de Gastos 💸');
  let run = true;
  while (run) {
    const action = await inquirer.prompt([
      {
        type: 'list',
        name: 'chosen',
        message: '¿Qué quieres hacer?',
        choices: [
          { value: 1, name: '👀 Ver todos los gastos' },
          { value: 2, name: '💲 Añadir nuevo gasto' },
          { value: 3, name: '⬅  Eliminar ultimo gasto' },
          { value: 99, name: '❌ SALIR' },
        ],
      },
    ]);
    switch (action.chosen) {
      case 1:
        await getAllExpense();
        break;
      case 2:
        await createNewExpense();
        break;
      case 3:
        await deleteLastExpense();
        break;
      case 99:
        run = false;
        break;
      default:
        run = false;
        break;
    }
  }
  console.log('Hasta la próxima! 👋');
};

main();

async function createNewExpense() {
  console.log('Añadiendo nuevo gasto...');
  const expenseData = await promptNewExpense();
  console.log('Nuevo gasto:', expenseData);

  const currentExpense = await get('expense');
  currentExpense.push(expenseData);
  await save('expense', currentExpense);
  console.log('Gasto guardado con éxito ✔');
}

async function getAllExpense() {
  const currentExpense = await get('expense');

  currentExpense.forEach((expense) => {
    console.log('El día: ', expense.date);
    console.log('Registraste un gasto llamado: ', expense.name);
    console.log('Con el monto de: $' + expense.number);
    console.log('De la categoría: ', expense.category);
    console.log('--------------------');
  });
  console.log('En total has registrado ' + currentExpense.length + ' gastos ✔');
}

async function deleteLastExpense() {
  console.log('Gasto eliminado con éxito ✔');

  const currentExpense = await get('expense');
  const deleted = currentExpense.pop();

  await save('expense', currentExpense);
}
