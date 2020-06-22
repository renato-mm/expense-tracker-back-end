const db = require("../models");
const Expense = db.expenses;
const Op = db.Sequelize.Op;

// Create and Save a new Expense
exports.create = (req, res) => {
  // Validate request
  if(!req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Expense
  const expense = {
    description: req.body.description,
    reference_month: req.body.reference_month,
    reference_year: req.body.reference_year,
    payment_date: req.body.payment_date,
    due_date: req.body.due_date,
    amount: req.body.amount
  }

  // Save Expense in the database
  Expense.create(expense)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Expense."
      });
    });
};

// Retrieve all Expenses from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Expense with an id
exports.findOne = (req, res) => {
  
};

// Update a Expense by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Expense with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Expenses from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Expenses
exports.findAllPublished = (req, res) => {
  
};
