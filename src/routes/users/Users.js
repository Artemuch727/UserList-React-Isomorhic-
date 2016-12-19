/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
//import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Users.css';

// app.get('/users', async (req, res, next) => {
//   db.all("SELECT * FROM User", function(err, rows) {
//     if (err){ next(err) }
//     res.send(rows);
//   });
// })

class Users extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    console.log(   'non res');
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>

        </div>
      </div>
    );
  }
}

export default withStyles(s)(Users);
