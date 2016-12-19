/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import passport from './core/passport';
import models from './data/models';
import schema from './data/schema';
import routes from './routes';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import { port, auth, databaseUrl } from './config';

import sqlite3 from 'sqlite3';
let db = new sqlite3.Database(databaseUrl);



const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//db initialisation
// db.run("DROP TABLE USERS");
db.run("CREATE TABLE if not exists USERS (id INTEGER PRIMARY KEY, fio VARCHAR(255), birthdate DATETIME, city VARCHAR(255), address VARCHAR(255), phone VARCHAR(15))");
//
// Authentication
// -----------------------------------------------------------------------------
app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token,
}));
app.use(passport.initialize());

  if (process.env.NODE_ENV !== 'production') {
    app.enable('trust proxy');
  }
  app.get('/login/facebook',
    passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false }),
  );
  app.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
    (req, res) => {
      const expiresIn = 60 * 60 * 24 * 180; // 180 days
      const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
      res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
      res.redirect('/');
    },
);

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));


app.get('/users/all', async (req, res, next) => {
  db.all("SELECT * FROM USERS", function(err, rows) {
    if (err){ next(err) }
    res.send(rows);
  });
})

app.get('/uid', async (req, res, next) => {
  db.all("SELECT id FROM USERS ORDER BY id DESC LIMIT 1", function(err, rows) {
    if (err){ next(err) }
    res.json(rows);
  });
})


app.get('/users/:id', async (req, res, next) => {
  let id = req.params.id;
  db.all(`SELECT * FROM USERS WHERE id = "${id}"`, function(err, rows) {
    if (err){
      next(err)
    }
    res.send(rows);
  });
})

app.post('/users/:id', async (req, res, next) => {
  console.log('DELETE ' + req.params.id);
  let id = req.params.id;
  db.run(`DELETE FROM USERS WHERE id = "${id}"`, function(err) {
    if(err !== null) {
      next(err);
    }
    else {
      res.redirect('back');
    }
  });
})

app.put('/users', async (req, res, next) => {
  console.log('UPDATE USERS');
  let selectedId = req.body.params.id;
  console.log(selectedId);
  let userData = req.body.params.userData;
  let qeryString = '';
  for (let key in userData) {
    if (typeof(userData[key]) !== 'object'){
      qeryString = qeryString + ' ' + key + '="' + userData[key] + '",';
    }else {
      let cont = userData[key];
      for (let keyC in cont) {
        qeryString = qeryString + ' ' + keyC + '="' + cont[keyC] + '",';
      }
    }
  }

  qeryString = (qeryString.slice(0, qeryString.length-1));
  console.log("UPDATE USERS SET " + qeryString + " WHERE id=" + selectedId)
   db.run("UPDATE USERS SET " + qeryString + " WHERE id=" + selectedId, (err)=> {
     if(err !== null) {
         next(err);
     } else {
       res.end();
     }
   })

})


app.post('/users', async (req, res, next) => {
  console.log(req.body);
  db.run(`INSERT INTO USERS VALUES ("${req.body.id}","${req.body.fio}","${req.body.birthdate}","${req.body.address}","${req.body.city}","${req.body.phone}")`, (err) => {
    if (err){
      next(err);
    }else {
      res.redirect("back");
    }

  });
})
//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

app.get('*', async (req, res, next) => {
  try {
    const css = new Set();
    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {

      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      resp: () => { res },
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
    };

    const route = await UniversalRouter.resolve(routes, {
      path: req.path,
      query: req.query
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }


    const data = { ...route };
    data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
    data.style = [...css].join('');
    data.scripts = [
      assets.vendor.js,
      assets.client.js,
    ];
    if (assets[route.chunk]) {
      data.scripts.push(assets[route.chunk].js);
    }

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      style={errorPageStyle._getCss()} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
models.sync().catch(err => console.error(err.stack))
  .then(() => {
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
});
