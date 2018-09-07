const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");

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
  "/uploadPaper",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    uploadPaper(req, res, err => {
      if (err) res.status(400).json(err);
      else
        Journal.findOne({ user: req.user.id }).then(journal => {
          journal.paper = req.file.path;
          journal.save().then(journal => {
            res.json(journal);
          });
        });
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

    const journalFields = {
      jType: req.body.jType,
      paperTitle: req.body.paperTitle,
      jTitle: req.body.jTitle,
      volume: req.body.volume,
      issue: req.body.issue,
      pageNos: req.body.pageNos,
      publishDate: req.body.publishDate,
      pageNos: req.body.pageNos,
      ugcApproved: req.body.ugcApproved,
      issnNo: req.body.issnNo,
      user: req.user.id,
      authors: req.body.authors.split(",")
    };
    if (req.body.publisher) journalFields.publisher = req.body.publisher;
    if (req.body.onlineLink) journalFields.onlineLink = req.body.onlineLink;
    //TODO : Setup indexedBy
    Journal.findOne({ user: req.user.id }).then(journal => {
      if (journal) {
        Journal.findOneAndUpdate(
          { user: req.user.id },
          { $set: journalFields },
          { new: true }
        ).then(journal => res.json(journal));
      } else {
        new Journal(journalFields)
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

//@route GET / : Get journal details : Private
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

//@route GET /all : Get all journal details
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

module.exports = router;
