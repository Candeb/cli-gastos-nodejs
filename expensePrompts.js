import inquirer from 'inquirer';
import DatePrompt from 'inquirer-date-prompt';

inquirer.registerPrompt('date', DatePrompt);

export async function promptNewExpense() {
  return await inquirer.prompt(expenseData);
}

const expenseData = [
  {
    type: 'input',
    name: 'number',
    message: 'Ingrese el importe del gasto',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Ingrese una descripción del gasto',
  },
  {
    type: 'date',
    name: 'date',
    message: 'Ingrese la fecha del gasto',
    locale: 'en-US',
    format: { month: 'short', hour: undefined, minute: undefined },
  },
  {
    type: 'list',
    name: 'category',
    message: 'Seleccione una categoria del gasto',
    choices: [
      'Alimentación',
      'Cuentas y pagos',
      'Casa',
      'Transporte',
      'Ropa',
      'Salud e Higine',
      'Otros',
    ],
  },
];
