const express = require("express");
const moment = require("moment");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");

//Load Workshop Model
const Workshop = require("../../models/Workshop");

//Validation
const validateWorkshopInput = require("../../validation/workshop");

//Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/workshop/");
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

const uploadReport = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb("Error : Only word or pdf allowed");
    }
  }
}).single("report");

router.post(
  "/uploadCert/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    uploadCert(req, res, err => {
      if (err) res.status(400).json(err);
      else
        Workshop.findOneAndUpdate(
          { "workshopData._id": req.params.id },
          { $set: { "workshopData.$.certificate": req.file.path } },
          { new: true }
        )
          .then(workshop => {
            res.json(workshop);
          })
          .catch(err => res.status(400).json({ err: "Workshop not found" }));
    });
  }
);

router.post(
  "/uploadReport/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    uploadReport(req, res, err => {
      if (err) res.status(400).json(err);
      else
        Workshop.findOneAndUpdate(
          { "workshopData._id": req.params.id },
          { $set: { "workshopData.$.report": req.file.path } },
          { new: true }
        )
          .then(workshop => {
            res.json(workshop);
          })
          .catch(err => res.status(400).json({ err: "Workshop not found" }));
    });
  }
);

//@route GET workshop/downloadReport : Private
router.post(
  "/downloadReport/:wid",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Workshop.findOne({ "workshopData._id": req.params.wid }).then(workshop => {
      const wData = workshop.workshopData.find(
        item => item.id === req.params.wid
      );
      res.send(wData.report);
    });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateWorkshopInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const date = moment(req.body.start_date);
    const workshopData = {
      wType: req.body.wType,
      title: req.body.title,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      organized_by: req.body.organized_by,
      target_audience: req.body.target_audience,
      academicYear:
        date.month() >= 7
          ? `${date.year()}-${date.add(1, "year").year()}`
          : `${date.subtract(1, "year").year()}-${date.add(1, "year").year()}`
    };

    Workshop.findOne({ user: req.user.id }).then(workshop => {
      if (!workshop) {
        workshopField = {
          user: req.user.id,
          workshopData
        };

        new Workshop(workshopField)
          .save()
          .then(workshop => res.json(workshop))
          .catch(err => {
            res.json("error from mongoose");
            console.log(err);
          });
      } else {
        workshop.workshopData.push(workshopData);

        workshop
          .save()
          .then(workshop => res.json(workshop))
          .catch(err => {
            res.json("error from mongoose");
            console.log(err);
          });
      }
    });
  }
);

//@route GET / : Get workshop details : Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Workshop.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(workshop => {
        if (!workshop) {
          errors.noDetails = "You haven't set up the workshop details.";
          res.status(400).json(errors);
        } else {
          res.json(workshop);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).send("Check error in console.");
      });
  }
);

//@route GET /all : Get all workshop details
router.get("/all", (req, res) => {
  const errors = {};
  Workshop.find()
    .populate("user", ["name"])
    .then(workshop => {
      if (!workshop) {
        errors.noDetails = "There are no workshop details.";
        res.status(400).json(errors);
      } else {
        res.json(workshop);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("Check error in console.");
    });
});

//@route DELETE /workshop/:wid
router.delete(
  "/:wid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Workshop.findOne({ user: req.user.id })
      .then(workshop => {
        const removeIndex = workshop.workshopData
          .map(item => item.id)
          .indexOf(req.params.wid);
        workshop.workshopData.splice(removeIndex, 1);
        workshop.save().then(workshop => res.json(workshop));
      })
      .catch(err => res.status(400).res(err));
  }
);

module.exports = router;
