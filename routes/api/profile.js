const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const moment = require("moment");

//Load Profile Model
const Profile = require("../../models/Profile");

//Validation
const validateProfileInput = require("../../validation/profile");
const validateGradDetailsInput = require("../../validation/grad_details");
const validatePreGradInput = require("../../validation/pre_grad");
const validateExperienceInput = require("../../validation/experience");
const validateGradProjectInput = require("../../validation/grad_project");

//@route GET /profile  : Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "You have not yet created a profile.";
          res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch(err => console.log(err));
  }
);

//@route GET /profile/all : Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There are no profile.";
        res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(400).send({ error: "Profiles not found" }));
});

//@route GET /profile/handle/:handle : Public => Get profile by handle
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user.";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).send(err));
});

//@route POST /profile : Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.date_of_birth)
      profileFields.date_of_birth = req.body.date_of_birth;
    if (req.body.designation) profileFields.designation = req.body.designation;
    if (req.body.highest_qualification)
      profileFields.highest_qualification = req.body.highest_qualification;
    if (req.body.date_of_join_post)
      profileFields.date_of_join_post = req.body.date_of_join_post;
    if (req.body.date_of_join_institute)
      profileFields.date_of_join_institute = req.body.date_of_join_institute;
    //Split areas of interest
    if (req.body.areas_of_interest_and_practical_experience !== "undefined") {
      profileFields.areas_of_interest_and_practical_experience = req.body.areas_of_interest_and_practical_experience.split(
        ","
      );
    }

    //Create handle
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        const dob = moment(req.body.date_of_birth, "YYYY-MM-DD").date();
        const now = moment().minute();
        const split = req.user.name.toLowerCase().split(" ");
        const handle = split[0] + split[1][0] + dob + now;
        profileFields.handle = handle;
      }
    });

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        new Profile(profileFields)
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            res.json("error from mongoose");
            console.log(err);
          });
      }
    });
  }
);

//@route POST /profile/grad_details : Private
router.post(
  "/grad_details",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGradDetailsInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newDetails = {
        qualification: req.body.qualification,
        institution: req.body.institution,
        year: req.body.year
      };
      if (req.body.percentage) newDetails.percentage = req.body.percentage;
      //Add graduation details
      profile.pg_and_ug.unshift(newDetails);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route POST /profile/pre_grad : Private
router.post(
  "/pre_grad",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePreGradInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newDetails = {
        qualification: req.body.qualification,
        board: req.body.board,
        institution: req.body.institution,
        year: req.body.year
      };
      if (req.body.percentage) newDetails.percentage = req.body.percentage;
      //Add pre-graduation details
      profile.pre_graduation.unshift(newDetails);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route POST /profile/experience : Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newDetails = {
        organisation: req.body.organisation,
        designation: req.body.designation,
        from: req.body.from
      };
      if (req.body.to) newDetails.to = req.body.to;
      //Add pre-graduation details
      profile.work_experience.unshift(newDetails);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route POST /profile/grad_project : Private
router.post(
  "/grad_project",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGradProjectInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newDetails = {
        title: req.body.title,
        year: req.body.year
      };
      //Add pre-graduation details
      profile.project_at_pg_ug.unshift(newDetails);

      profile.save().then(profile => res.json(profile));
    });
  }
);

module.exports = router;
