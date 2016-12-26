/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import Drawer from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import UserInfoForm from '../UserInfoForm';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserList.css';
import Link from '../Link';
import api from '../../core/api';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selected: null,
      users: [],
    };
  }

  componentDidMount() {
      let users = api.getAllUsersFromDB().then((response)=>{
        this.setState({users: response.data});
        console.log(response.data);
      });
  }


  handleListItemSelect(event) {
    if (this.state.selected != null){
      if (event.target.id != this.state.selected.id){
        this.setState({open: true })
        api.getSelectedUserFromDB(event.target.id).then((response)=>{
        this.setState({selected: response.data[0]});
        });
      }else {
        api.deleteTaskFromLStorage();
        this.setState({open: false, selected: null})
      }
    }else {
      this.setState({open: true })
      api.getSelectedUserFromDB(event.target.id).then((response)=>{
      this.setState({selected: response.data[0]});
    })
    }
  }

  handleUserFormShowing(event) {
    if (this.state.open){
      let lsUser = api.getTasksFromLStorage();
      if (lsUser == null){
        this.setState({open: !this.state.open})
      } else {
        api.deleteTaskFromLStorage().then(()=>{
          this.setState({
              selected: null
            });
        });
      }
    }else {
      this.setState({open: !this.state.open})
    }
  }

  handleUsersUpdate(){
      let users = api.getAllUsersFromDB().then((response)=>{
        this.setState({users: response.data, selected: null});
    });
  }


  render() {
    const style = {
      marginRight: 20,
    };


    let listItems = this.state.users.map((item) => {
      return <ListItem key={item.id}
          leftCheckbox={
            <Checkbox id={item.id}
              checked={(this.state.selected?this.state.selected.id:'') == item.id}
              onCheck= {this.handleListItemSelect.bind(this)}/>
          }
          primaryText={item.fio}
          secondaryText={item.phone}
        />
    })

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>{"Список пользователей"}</h1>
          <FloatingActionButton
            onTouchTap={this.handleUserFormShowing.bind(this)}
            style={style}>
            <ContentAdd />
          </FloatingActionButton>
          <List>
            {listItems}
          </List>
          <Drawer
            width={800}
            docked={true}
            openSecondary={true}
            open={this.state.open}
          >
              <UserInfoForm
                handleUsersUpdate={this.handleUsersUpdate.bind(this)}
                selectedUser={this.state.selected}
                handleUserFormShowing={this.handleUserFormShowing.bind(this)}
                fireActionEvent={this.state.action}
                title="Информация о пользователе"
              />
          </Drawer>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(UserList);
