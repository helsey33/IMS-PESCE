const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");

//Mongoose models
const Conference = require("./../../models/Conference");

//Validation
const validateConferenceDetails = require("../../validation/conference");

//Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/conference/");
  },
  filename: (req, file, cb) => {
    cb(null, req.user.id + "_" + file.originalname);
  }
});

const uploadCert = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb("Error : Only images allowed");
    }
  }
}).single("certificate");

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

//@route POST conference/uploadCert : Private
router.post(
  "/uploadCert",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    uploadCert(req, res, err => {
      if (err) res.status(400).json(err);
      else
        Conference.findOne({ user: req.user.id }).then(conference => {
          conference.certificate = req.file.path;
          conference.save().then(conference => {
            res.json(conference);
          });
        });
    });
  }
);

//@route POST conference/uploadPaper : Private
router.post(
  "/uploadPaper",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    uploadPaper(req, res, err => {
      if (err) res.status(400).json(err);
      else
        Conference.findOne({ user: req.user.id }).then(conference => {
          conference.paper = req.file.path;
          conference.save().then(conference => {
            res.json(conference);
          });
        });
    });
  }
);

//@route POST /conference : Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateConferenceDetails(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const conferenceFields = {
      cType: req.body.cType,
      paperTitle: req.body.paperTitle,
      conferenceTitle: req.body.conferenceTitle,
      organizedBy: req.body.organizedBy,
      isbnNo: req.body.isbnNo,
      publisher: req.body.publisher,
      user: req.user.id,
      authors: req.body.authors.split(",")
    };
    if (req.body.conferenceDate)
      conferenceFields.conferenceDate = req.body.conferenceDate;
    if (req.body.link) conferenceFields.link = req.body.link;

    Conference.findOne({ user: req.user.id }).then(conference => {
      if (conference) {
        Conference.findOneAndUpdate(
          { user: req.user.id },
          { $set: conferenceFields },
          { new: true }
        ).then(conference => res.json(conference));
      } else {
        new Conference(conferenceFields)
          .save()
          .then(conference => res.json(conference))
          .catch(err => {
            res.json("error from mongoose");
            console.log(err);
          });
      }
    });
  }
);

//@route GET / : Get conference details : Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Conference.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(conference => {
        if (!conference) {
          errors.noDetails = "You haven't set up the conference details.";
          res.status(400).json(errors);
        } else {
          res.json(conference);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).send("Check error in console.");
      });
  }
);

//@route GET /all : Get all conference details
router.get("/all", (req, res) => {
  const errors = {};
  Conference.find()
    .populate("user", ["name"])
    .then(conference => {
      if (!conference) {
        errors.noDetails = "There are no conference details.";
        res.status(400).json(errors);
      } else {
        res.json(conference);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("Check error in console.");
    });
});

module.exports = router;
