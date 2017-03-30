const express = require('express');
const DB = require('../helpers/db');

const router = express.Router();

const path = require('path');
const multer = require('multer');
// const hbs = require('nodemailer-express-handlebars');

const upload = multer({ dest: path.resolve(__dirname, '../public/images/') });
// GET: /
router.get('/', (req, res, next) => {
  // Constuct and run a simple query
  const query = DB.builder()
    .select()
    .function('NOW()')
    .toParam();

  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    res.render('index', {
      title: `reg ${results.rows[0].now}`,
    });
  });
});

router.get('/registration', (req, res) => {
  res.render('registration');
});

router.post('/registration', upload.single('file'), (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Constuct and run a simple query
  const username = req.body.userdata.username;
  const password = req.body.userdata.password;
  const email = req.body.userdata.email;

  let photo = '';
  if (req.file) {
    photo = req.file.filename;
  } else {
    photo = 'sun.jpg';
  }
  // req.checkBody('username', 'Username is required').notEmpty();
  // req.checkBody('password', 'Password is required').notEmpty();
  // req.checkBody('password', 'Password have min 2 and max 8 character').len(2, 8);
  // req.checkBody('email', 'Email is required').notEmpty();
  // req.checkBody('email', 'Email is not valid').isEmail();
  // req.checkBody('photo', 'Image is required').notEmpty();
  // const errors = req.validationErrors();
  // if (errors) {
  //   console.log('FAILED');
  //   res.render('registration', {
  //     errors,
  //   });
  //   console.log(errors);
  // } else {
  const query = DB.builder()
      .insert()
      .into('registration')
      .set('username', username)
      .set('password', password)
      .set('email', email)
      .set('image', photo)
      .toParam();
  DB.executeQuery(query, (err) => {
    if (err) {
      next(err);
      return;
    }
      // res.redirect('/login');
  });
  // }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  // console.log(req);
  console.log('----->>> get login');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Constuct and run a simple query
  const session = req.session;
  const email = req.body.userdata.email;
  const password = req.body.userdata.password;

  // const email = req.body.email;
  // const password = req.body.password;
  // req.checkBody('password', 'Password is required').notEmpty();
  // req.checkBody('email', 'Email is required').notEmpty();
  // req.checkBody('email', 'Email is not valid').isEmail();
  // const errors = req.validationErrors();

  // if (errors) {
  //   console.log('FAILED');
  //   res.render('login', {
  //     errors,
  //   });
  //   console.log(errors);
  // } else {
  const query = DB.builder()
    .select()
    .field('email')
    .field('user_id')
    .from('registration')
    .where('email = ? AND password = ?', email, password)
    .toParam();
  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    // console.log(results);
    if (results.rowCount) {
      session.user_id = results.rows[0].user_id;
      session.mail = email;
      let data = {
        id: results.rows[0].user_id,
      };
      res.send(JSON.stringify(data));
    }
    res.end('/home/');
    });
});

router.get('/home/:id', (req, res, next) => {
  user_id = req.params.id;
  console.log('HOME api user_id-----> ', user_id);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  let query;
  if (user_id) {
    query = DB.builder()
      .select()
      .field('username')
      .field('tweet_text')
      .field('time')
      .from('registration', 'r')
      .join(DB.builder().select().from('twit'), 'u', 'r.user_id = u.userid ')
      .where('u.userid IN ? OR u.userid = ?',
      (DB.builder().select().field('follower_id').from('follow')
        .where('login_user= ?', user_id)), user_id)
      .order('time', false)
      .toParam();
    DB.executeQuery(query, (error, twits) => {
      if (error) {
        next(error);
        return;
      }
      query = DB.builder()
      .select()
      .from('registration')
      .where('user_id != ?', user_id)
      .where('user_id NOT IN ?',
      DB.builder()
      .select()
      .field('follower_id')
      .from('follow')
      .where('login_user = ?', user_id))
      .toParam();
      DB.executeQuery(query, (err, follows) => {
        if (err) {
          next(err);
          return;
        }

        query = DB.builder()
          .select()
          .field('username')
          .field('image')
          .from('registration', 'r')
          .where('user_id = ?', user_id)
          .toParam();
        console.log(query);
        DB.executeQuery(query, (errors, users) => {
          if (errors) {
            next(errors);
            return;
          }
          let data = {
            twits: twits.rows,
            follows: follows.rows,
            users: users.rows[0],
          };
          console.log('object from home---->', data);

          res.end(JSON.stringify(data));
        });
      });
    });
  }
});

router.get('/profile/:id', (req, res, next) => {
  console.log('---->> get profile');
  user_id = req.params.id;
  let query;
  // console.log(session.mail);
  if (user_id) {
    query = DB.builder()
      .select()
      .from('registration')
      .where('user_id = ?', user_id)
      .toParam();
    console.log(query);
    DB.executeQuery(query, (error, users) => {
      if (error) {
        next(error);
        return;
      }

      query = DB.builder()
        .select()
        .field('email')
        .field('username')
        .field('tweet_text')
        .field('time')
        .from('registration', 'r')
        .join(DB.builder().select().from('twit'), 'u', 'u.userid =r.user_id')
        .where('user_id = ? ', user_id)
        .toParam();
      console.log(query);
      DB.executeQuery(query, (errors, twits) => {
        if (errors) {
          next(errors);
          return;
        }
        query = DB.builder()
          .select()
          .field('username')
          .field('follower_id')
          .field('id_f')
          .field('user_id')
          .field('image')
          .from('registration', 'r')
          .join(DB.builder()
          .select()
          .from('follow'), 'f', 'r.user_id= f.follower_id')
          .where('login_user = ?', user_id)
          .toParam();
        DB.executeQuery(query, (err, follows) => {
          if (err) {
            next(err);
            return;
          }
          let data ={
            users: users.rows,
            twits: twits.rows,
            follows: follows.rows,
          };
          res.end(JSON.stringify(data));
          console.log('object from profile---->', data);
        });
      });
    });
  } else {
    res.render('login');
  }
});

router.get('/twit', (req, res) => {
  res.render('twit');
});

router.post('/twit', (req, res, next) => {
  const user_id = req.body.user_id;
  console.log('twit------>',user_id)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  const tweetText = req.body.data.twit;
  // const session = req.session;
  const query = DB.builder()
    .insert()
    .into('twit')
    .set('tweet_text', tweetText)
    .set('time', 'now()')
    .set('userid', user_id)
    .toParam();

  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
    res.send('data is send');
  });
});
router.post('/follow/:id', (req, res, next) => {

  let user_id = req.body.user_id;
  let Id = req.body.followerId;
  const query = DB.builder()
    .insert()
    .into('follow')
    .set('login_user', user_id)
    .set('follower_id', Id )
    .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
  });
});

router.post('/unfollow/:id', (req, res, next) => {
  // let user_id = req.body.user_id;
  console.log('----Unfollow API ===');
  let Id = req.body.followerId;
  const query = DB.builder()
    .delete()
    .from('follow')
    .where('follower_id = ?', Id)
    .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
  });
});

router.get('/edit', (req, res, next) => {
  const session = req.session;
  if (session.mail) {
    const query = DB.builder()
      .select()
      .field('email')
      .field('username')
      .field('password')
      .field('image')
      .from('registration')
      .where('id = ?', session.user_id)
      .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      res.render('edit', { res: results.rows });
    });
  } else {
    res.render('login');
  }
});

router.get('/editprofile', (req, res, next) => {
  const session = req.session;
  if (session.mail) {
    const query = DB.builder()
      .select()
      .field('image')
      .from('registration')
      .where('id = ?', session.user_id)
      .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      res.render('edit', { res: results.rows });
    });
  } else {
    res.render('login');
  }
});

router.post('/editprofile', upload.single('file'), (req, res, next) => {
  let photo = '';
  if (req.file) {
    photo = req.file.filename;
  } else {
    photo = 'sun.jpg';
  }
  const query = DB.builder()
    .update()
    .table('registration')
    .set('image', photo)
    .where('id = ? ', req.session.user_id)
    .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
    res.redirect('/home');
  });
});

router.post('/edit', upload.single('file'), (req, res, next) => {
  const username = req.body.editusername;
  const password = req.body.editpassword;
  const email = req.body.editemail;
  const session = req.session;
  const query = DB.builder()
    .update()
    .table('registration')
    .set('username', username)
    .set('password', password)
    .set('email', email)
    .where('id = ?', session.user_id)
    .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
    res.redirect('/home');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.clearCookie('myCookie');
      res.redirect('/login');
    }
  });
});

module.exports = router;

