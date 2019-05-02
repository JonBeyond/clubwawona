const nodemailer = require("nodemailer");
const GPASS = require('../../config.js').GPASS;
const GUSER = require('../../config.js').GUSER;
const Master = require('../model.js').Master;

const emailOne = (req, res) => {
  let member = req.body.member;
  changeTokenState(member)
  .then(() => {
    emailer(req.body.member)
    .then(info => {
      console.log(info);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });

  })
  .catch(err => {
    console.log(`Error changing token state.  ${err}`);
    res.sendStatus(500);
  });

}

const emailAll = (req, res) => {
  console.log('helo from email all');
  res.sendStatus(200);
}

const changeTokenState = (member) => {
  return new Promise((resolve, reject) => {
    Master.updateOne({email: member.email}, {tokenSent: true}, (err) => {
      if(err) {
        res.sendStatus(500);
        console.log(`WARNING: COULD NOT RESET EMAIL`);
        reject(err);
      }
      console.log('Token state changed');
      resolve(true);
    })
  });
}

const verifyTokenState = (member) => {
  return new Promise((resolve, reject) => {
    Master.findOne({email: member.email}, (err, response) => {
      if
    })
  })
}

const emailText = (name, token) => {
  return `
  Dear ${name},
  You are cordially invited attend Club Wawona May 2019.
  Please register for the event at https://wawona.club with your unique registration token: ${token}
  Registering for the event helps us to reduce waste and properly supply the party!  If you are a 'maybe', please register anyways.

  Please read the following information.  You never know what mysteries it contains!!!

  -- THE PLAN --
  This is both Jonathan and Lara's (2nd) sweet 16 birthday celebration.  We'll let you do the math on that.
  The party is intended to go until sunrise or an extintion event occurs. The official hours are somewhere around 9pm - 6am.  We recommended you show up between 9-10pm :)

  -- THE MUSIC --
  There will be good music.  The lineup will be announced closer to the date.

  -- DISCLAIMER --
  This is party is 21+.  Any guests you bring are your responsibility.  Please be kind and courteous to everyone (follow the DBAD philosophy).
  There is no dress code, it's up to you if you want to come dressed for a club or in your pajamas.  Please do what makes you feel the best.

  -- GENERAL INFO --
  1. We have two cats that live on the premises.  They will not be at the party, but their allergens will be, so please plan accordingly.
  2. There will be plenty of alcohol provided; the offerings are dependent on your responses to the RSVP survey.
  3. There will be snacks, and there may be cake(s), but there is no meal-worthy food.

  -- BEING SAFE --
  1. There is plenty of room for people to crash at Wawona.  Please utilize it if you are too intoxicated, or you just feel like it.
  2. DRINK WATER!!!! - Lara
  3. Please let the hosts know if you are doing a non-alcohol thing.  Do your thing, just let us know so we can keep everyone safe.

  -- GETTING HERE --
  1. There is plenty of street parking on Wawona
  2. There are L-muni stops at 32nd and 30th street, which are 6-8 minutes away.

  -- FINALLY --
  If you crash at the venue, we will be going to get breakfast burritos at Underdogs Too.  They are cheap and amazing.  Please join us!

  We look forward to seeing your lovely faces soon,
  Jonathan & Lara`;
}

const emailer = (member) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GUSER,
        pass: GPASS
      }
    });

    const mailOptions = {
      from: 'clubwawona@gmail.com', // sender address
      to: member.email, // list of receivers
      subject: "Club Wawona: The Next Generation",
      text: emailText(`${member.name}`, member.token)
      // html: htmlMessage
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if(err) reject(err);
      else resolve(info);
   });
  });
}

module.exports = { emailOne, emailAll };
