const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const moment = require("moment");
const multer = require("multer");

//Load Profile Model
const Profile = require("../../models/Profile");

//Validation
const validateProfileInput = require("../../validation/profile");
const validateGradDetailsInput = require("../../validation/grad_details");
const validatePreGradInput = require("../../validation/pre_grad");
const validateExperienceInput = require("../../validation/experience");
const validateGradProjectInput = require("../../validation/grad_project");

//Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/displayImage/");
  },
  filename: (req, file, cb) => {
    cb(null, req.user.id + "_" + file.originalname);
  }
});

const upload = multer({
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
}).single("displayImage");

//@route POST /profilePic : Private => Upload an image to the server
router.post(
  "/profilePic",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    upload(req, res, err => {
      if (err) {
        res.status(400).json(err);
      } else {
        Profile.findOne({ user: req.user.id }).then(profile => {
          profile.displayImage = req.file.path;
          profile.save().then(profile => {
            res.json(profile);
          });
        });
      }
    });
  }
);

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
    .populate("user", ["name"])
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
      profile.pg_and_ug.push(newDetails);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route DELETE /profile/grad_details/:grad_id
router.delete(
  "/grad_details/:grad_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.pg_and_ug
          .map(item => item.id)
          .indexOf(req.params.grad_id);
        //Splice out of array
        profile.pg_and_ug.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
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
      profile.pre_graduation.push(newDetails);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route DELETE /profile/pre_grad/:pgrad_id
router.delete(
  "/pre_grad/:pgrad_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.pre_graduation
          .map(item => item.id)
          .indexOf(req.params.pgrad_id);
        //Splice out of array
        profile.pre_graduation.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
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
        exp_designation: req.body.exp_designation,
        from: req.body.from
      };
      if (req.body.to) newDetails.to = req.body.to;
      //Add pre-graduation details
      profile.work_experience.push(newDetails);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route DELETE /profile/experience/:exp_id
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.work_experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);
        //Splice out of array
        profile.work_experience.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
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
      profile.project_at_pg_ug.push(newDetails);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route DELETE /profile/grad_project/:project_id
router.delete(
  "/grad_project/:project_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.project_at_pg_ug
          .map(item => item.id)
          .indexOf(req.params.project_id);
        //Splice out of array
        profile.project_at_pg_ug.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
