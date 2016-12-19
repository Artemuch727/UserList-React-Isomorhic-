/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import UserInfoForm from '../../components/UserInfoForm';
import Register from './Register';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const title = 'New User Registration';

export default {

  path: '/register',

  action() {
    return {
      title,
      component: <Layout><UserInfoForm title={title} /></Layout>,
    };
  },

};
