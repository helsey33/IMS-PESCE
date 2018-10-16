const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
var path = require("path");

//Bring in the models
const Journal = require("../../models/Journal");

//Validation
const validateJournalDetails = require("../../validation/journal");

//Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/journal/");
  },
  filename: (req, file, cb) => {
    cb(null, req.user.id + "_" + file.originalname);
  }
});

const uploadPaper = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb("Error : Only word or pdf files allowed");
    }
  }
}).single("paper");

//@route POST journal/uploadPaper : Private
router.post(
  "/uploadPaper/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    uploadPaper(req, res, err => {
      if (err) res.status(400).json(err);
      else
        Journal.findOneAndUpdate(
          { "journalData._id": req.params.id },
          { $set: { "journalData.$.paper": req.file.path } },
          { new: true }
        ).then(journal => {
          res.json(journal);
        });
    });
  }
);

//@route GET journal/downloadPaper : Private
router.get(
  "/downloadPaper/:jid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Journal.findOne({ user: req.user.id }).then(journal => {
      const jData = journal.journalData.find(
        item => item.id === req.params.jid
      );
      res.download(jData.paper);
    });
  }
);

//@route POST /journal : Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateJournalDetails(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const journalData = {
      jType: req.body.jType,
      paperTitle: req.body.paperTitle,
      jTitle: req.body.jTitle,
      volume: req.body.volume,
      issue: req.body.issue,
      pageNos: req.body.pageNos,
      publishDate: req.body.publishDate,
      issnNo: req.body.issnNo,
      ugcApproved: req.body.ugcApproved,
      authors: req.body.authors,
      indexedBy: req.body.indexedBy
    };
    if (req.body.publisher) journalData.publisher = req.body.publisher;
    if (req.body.onlineLink) journalData.onlineLink = req.body.onlineLink;
    //TODO : indexed By
    journalData.indexedBy = req.body.indexedBy;
    Journal.findOne({ user: req.user.id }).then(journal => {
      if (!journal) {
        journalField = {
          user: req.user.id,
          journalData
        };
        new Journal(journalField)
          .save()
          .then(journal => res.json(journal))
          .catch(err => {
            res.json("error from mongoose");
            console.log(err);
          });
      } else {
        journal.journalData.push(journalData);
        journal
          .save()
          .then(journal => res.json(journal))
          .catch(err => {
            res.json("error from mongoose");
            console.log(err);
          });
      }
    });
  }
);

//@route GET /journal : Get journal details : Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Journal.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(journal => {
        if (!journal) {
          errors.noDetails = "You haven't set up the journal details.";
          res.status(400).json(errors);
        } else {
          res.json(journal);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).send("Check error in console.");
      });
  }
);

//@route GET /journal/all : Get all journal details
router.get("/all", (req, res) => {
  const errors = {};
  Journal.find()
    .populate("user", ["name"])
    .then(journal => {
      if (!journal) {
        errors.noDetails = "There are no journal details.";
        res.status(400).json(errors);
      } else {
        res.json(journal);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("Check error in console.");
    });
});

//@route DELETE /journal/:jid
router.delete(
  "/:jid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Journal.findOne({ user: req.user.id })
      .then(journal => {
        const removeIndex = journal.journalData
          .map(item => item.id)
          .indexOf(req.params.jid);
        journal.journalData.splice(removeIndex, 1);
        journal.save().then(journal => res.json(journal));
      })
      .catch(err => res.status(400).res(err));
  }
);
module.exports = router;
