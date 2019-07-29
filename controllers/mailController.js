const db = require("../models");

module.exports = {
  findAll(req, res) {
    db.Mails.find(req.searchTerm)
      .then(dbMails => res.json(dbMails))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  
  findByTaskId(req, res) {
    console.log(req.params.taskId)
    db.Mails.find({taskId: req.params.taskId})
      .then(dbMails => res.json(dbMails))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  saveMail(req, res) {
    console.log(req.body)
    db.Mails.create(req.body)
      .then(dbMails => res.json(dbMails))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  
};
