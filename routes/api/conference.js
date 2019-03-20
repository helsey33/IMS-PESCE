const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const moment = require("moment");

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
      cb("Error : Only images  allowed");
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
  "/uploadCert/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    uploadCert(req, res, err => {
      if (err) res.status(400).json(err);
      else
        Conference.findOneAndUpdate(
          { "conferenceData._id": req.params.id },
          { $set: { "conferenceData.$.certificate": req.file.path } },
          { new: true }
        ).then(conference => {
          res.json(conference);
        });
    });
  }
);

//@route POST conference/uploadPaper : Private
router.post(
  "/uploadPaper/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    uploadPaper(req, res, err => {
      if (err) res.status(400).json(err);
      else
        Conference.findOneAndUpdate(
          { "conferenceData._id": req.params.id },
          { $set: { "conferenceData.$.paper": req.file.path } },
          { new: true }
        ).then(conference => {
          res.json(conference);
        });
    });
  }
);

//@route GET confernece/downloadPaper :
router.get("/downloadPaper/:cid", (req, res) => {
  Conference.findOne({ "conferenceData._id": req.params.cid }).then(
    conference => {
      const cData = conference.conferenceData.find(
        item => item.id === req.params.cid
      );
      res.send(cData.paper);
    }
  );
});

//@route POST /conference : Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateConferenceDetails(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const date = moment(req.body.conferenceDate, "MM/YYYY");

    const conferenceData = {
      cType: req.body.cType,
      paperTitle: req.body.paperTitle,
      conferenceTitle: req.body.conferenceTitle,
      organizedBy: req.body.organizedBy,
      isbnNo: req.body.isbnNo,
      publisher: req.body.publisher,
      authors: req.body.authors,
      conferenceDate: moment(req.body.conferenceDate, "MM/YYYY"),
      academicYear:
        date.month() >= 7
          ? `${date.year()}-${date.add(1, "year").year()}`
          : `${date.subtract(1, "year").year()}-${date.add(1, "year").year()}`
    };
    if (req.body.link) conferenceData.link = req.body.link;

    Conference.findOne({ user: req.user.id }).then(conference => {
      if (!conference) {
        conferenceField = {
          user: req.user.id,
          conferenceData
        };
        new Conference(conferenceField)
          .save()
          .then(conference => res.json(conference))
          .catch(err => {
            res.json("error from mongoose");
            console.log(err);
          });
      } else {
        conference.conferenceData.push(conferenceData);
        conference
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

//@route DELETE /conference/:cid
router.delete(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Conference.findOne({ user: req.user.id })
      .then(conference => {
        const removeIndex = conference.conferenceData
          .map(item => item.id)
          .indexOf(req.params.jid);
        conference.conferenceData.splice(removeIndex, 1);
        conference.save().then(conference => res.json(conference));
      })
      .catch(err => res.status(400).res(err));
  }
);

module.exports = router;
