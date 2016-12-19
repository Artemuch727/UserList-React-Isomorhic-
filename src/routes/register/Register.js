/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';




class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>

        </div>
      </div>
    );
  }
}

export default withStyles(s)(Register);
