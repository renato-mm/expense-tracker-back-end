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
  var condition = !req.query ? null :
  Object.entries(req.query).map(e => ({ "key": e[0], "value": e[1] }))
  .reduce((acc, entry)=>{
    acc[entry.key] = { [Op.like]: `%${entry.value}%` };
    return acc;
  }, {});
  console.log(condition)

  Expense.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving the Expenses."
      });
    });
};

// Retrieve Expenses by date from the database.
exports.findByDate = (req, res) => {
  var condition = !req.query ? null :
  req.query.ty === req.query.by ?
  {
    reference_month: { [Op.between]: [req.query.bm, req.query.tm] },
    reference_year: { [Op.eq]: req.query.by }
  } : 
  {
    [Op.or]: [
      {
        reference_month: { [Op.gte]: req.query.bm },
        reference_year: { [Op.eq]: req.query.by }
      },
      {
        reference_month: { [Op.lte]: req.query.tm },
        reference_year: { [Op.eq]: req.query.ty }
      }
    ]
  };

  Expense.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving the Expenses."
      });
    });
};

// Find a single Expense with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Expense.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err || "Error retrieving Expense with id=" + id
    });
  });
};

// Update a Expense by the id in the request
exports.update = (req, res) => {
  // Validate request
  if(!req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const id = req.params.id;

  // Create a Expense
  const expense = {
    description: req.body.description,
    reference_month: req.body.reference_month,
    reference_year: req.body.reference_year,
    payment_date: req.body.payment_date,
    due_date: req.body.due_date,
    amount: req.body.amount
  }

  // Update Expense in the database
  Expense.update(expense, { where: { id: id } })
    .then(num => {
      if(num == 1){
        res.send({ message: "Expense was updated successfully." })
      }
      else{
        res.send({ message: `Cannot update Expense with id=${id}. Maybe Expense was not found.` })
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error updating Expense with id=" + id
      });
    });

};

// Delete a Expense with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Expense.destroy({ where: { id: id } })
  .then(num => {
    if(num == 1){
      res.send({ message: "Expense was delete successfully." })
    }
    else{
      res.send({ message: `Cannot delete Expense with id=${id}. Maybe Expense was not found.` })
    }
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err || "Could not delete Expense with id=" + id
    });
  });
};

// Delete all Expenses from the database.
exports.deleteAll = (req, res) => {
  Expense.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Expenses were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all expenses."
      });
    });
};
