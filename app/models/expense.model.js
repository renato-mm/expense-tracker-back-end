const { sequelize } = require(".");
const { Sequelize } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
  const Expense = sequelize.define("expense", {
    description: {
      type: Sequelize.STRING
    },
    reference_month: {
      type: Sequelize.INTEGER
    },
    reference_year: {
      type: Sequelize.INTEGER
    },
    payment_date: {
      type: Sequelize.STRING
    },
    due_date: {
      type: Sequelize.STRING
    },
    amount: {
      type: Sequelize.FLOAT
    }
  });

  return Expense
};