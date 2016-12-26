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
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Menu from 'material-ui/Menu';
import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import api from '../../core/api';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserInfoForm.css';
import Link from '../Link';
import checks from './checks';


class UserInfoForm extends React.Component {
  static propTypes = {
    selectedUser: PropTypes.object,
    title: PropTypes.string.isRequired
  }

  constructor(props) {
		super(props);
		this.state  = {
        user: {
          fio:'',
          birthDate: '',
          contacts:{
            address: '',
            city: '',
            phone: ''
          }
        },
        error:{
          phone:'',
          fio:'',
          birth:''
        }
      }
	}

  componentWillReceiveProps(nextProps){
    let selectedUser = nextProps.selectedUser;
<<<<<<< HEAD
    if (selectedUser != null){
        this.setState({...this.state,
          user:{
            id: selectedUser.id || '',
            birthDate: selectedUser.birthdate || '',
            fio: selectedUser.fio || '',
            contacts:{
              address: selectedUser.address || '',
              city:selectedUser.city || '',
              phone:selectedUser.phone || ''
            }
          }
=======
    if (Object.keys(selectedUser).length){
        this.setState({id: selectedUser.id});
      if (getBirthDate(selectedUser.birthdate).length > 0){
        const date = getBirthDate(selectedUser.birthdate);
          this.setState({
            birthDateDay: date[0],
            birthDateMonth: date[1],
            birthDateYear: date[2]
          })
      };
        this.setState({
          fio: selectedUser.fio || '',
          address: selectedUser.address || '',
          city:selectedUser.city || '',
          phone:selectedUser.phone || ''
>>>>>>> origin/master
        })
    }
    else {
      this.setState({...this.state,    user: {
            fio:'',
            birthDate: '',
            contacts:{
              address: '',
              city: '',
              phone: ''
            }
          }});
    }
  }

  componentDidUpdate(){
<<<<<<< HEAD
    if (this.state.user.fio){
        let user = this.state.user;
        api.addNewTaskToLStorage(user);
      } else {
        let lsUser = api.getTasksFromLStorage();
        if (lsUser!=null) {
          this.setState({...this.state,
            user:{
              birthDate: lsUser.birthDate || '',
              fio: lsUser.fio || '',
              contacts:{
                address: lsUser.contacts.address || '',
                city:lsUser.contacts.city || '',
                phone:lsUser.contacts.phone || ''
              }
            }
          })
        }

    }
=======
    let user = {fio:'',
      birthDate: '',
      contacts:{
        address: '',
        city: '',
        phone: ''
      }};

    user.fio = this.state.fio;
    user.birthDate = this.state.birthDateDay + '.' +  this.state.birthDateMonth  + '.' +  this.state.birthDateYear;
    user.contacts.address = this.state.address;
    user.contacts.city = this.state.city;
    user.contacts.phone = this.state.phone;
    dsApi.addNewTaskToLStorage(user);
  }


  componentDidMount () {
      let lsUser = dsApi.getTasksFromLStorage();
      if (Object.keys(lsUser).length > 0) {
        let date = lsUser.birthDate.split('.');
        this.setState({
          fio: lsUser.fio,
          birthDateDay: date[0],
          birthDateMonth: date[1],
          birthDateYear: date[2],
          address: lsUser.contacts.address,
          city:lsUser.contacts.city,
          phone:lsUser.contacts.phone
        })
      }
>>>>>>> origin/master
  }

  handleSelectDay (event, index, value) {
    let bdate = [],
      birthDate = '';
    if(this.state.user.birthDate){
      bdate = this.state.user.birthDate.split('.');
    }
    bdate[0] = value;
    birthDate = bdate.join('.');

    this.setState({...this.state, user: {...this.state.user, birthDate: birthDate}});
  }

  handleSelectMonth (event, index, value) {
    let bdate = [],
      birthDate = '';
    if(this.state.user.birthDate){
      bdate = this.state.user.birthDate.split('.');
    }
    bdate[1] = value;
    birthDate = bdate.join('.');
    this.setState({...this.state, user: {...this.state.user, birthDate: birthDate}});
  }

  handleSelectYear (event, index, value) {
    let bdate = [],
      birthDate = '';
    if(this.state.user.birthDate){
      bdate = this.state.user.birthDate.split('.');
    }
    bdate[2] = value;
    birthDate = bdate.join('.');
    this.setState({...this.state, user: {...this.state.user, birthDate: birthDate}});
  }

	handleChange (event) {
    let currFiled = event.target.id;
    let currValue = event.target.value;

    switch (currFiled) {
      case 'fio':
        this.setState({...this.state, user: {...this.state.user, fio: currValue}});
        break;
      case 'city':
        this.setState({...this.state, user:{...this.state.user, contacts: {...this.state.user.contacts, city: currValue}}});
        break;
      case 'address':
        this.setState({...this.state, user:{...this.state.user, contacts:{...this.state.user.contacts, address: currValue}}});
        break;
      case 'phone':
        var result = currValue.match( /\d+/i );
        var error = currValue.match( /\D+/i );
        if (error){
          var state = Object.assign(this.state, {
<<<<<<< HEAD
            error: Object.assign(this.state.error, { phone: 'Введено не числовое значение' }),
=======
            something: Object.assign(this.state.error, { phone: 'Введено не числовое значение' }),
>>>>>>> origin/master
          });
          this.setState(state);

        } else {
          var state = Object.assign(this.state, {
<<<<<<< HEAD
            error: Object.assign(this.state.error, { phone: '' }),
          });
          this.setState(state);
        }
        this.setState({...this.state, user:{...this.state.user, contacts:{...this.state.user.contacts, phone: (result ? result[0]: '')}}});
=======
            something: Object.assign(this.state.error, { phone: '' }),
          });
          this.setState(state);
        }
        this.setState({phone: (result ? result[0]: '')});
>>>>>>> origin/master
        break;
      default:
        break;
    }

	}

  handleCancel (event) {
    const {handleUsersUpdate, handleUserFormShowing } = this.props;
    api.deleteTaskFromLStorage();
    handleUserFormShowing();
    handleUsersUpdate();
    this.setState({...this.state,
      user:{
        id:  '',
        birthDate:  '',
        fio:  '',
        contacts:{
          address:  '',
          city: '',
          phone: ''
        }
      }
    });
  }

  handleDelete (event) {
   let task = new Promise((resolve, reject)=>{
     resolve(api.deleteUserFromDB(this.state.user.id));
   }).then(()=>{
     api.deleteTaskFromLStorage();
     this.props.handleUserFormShowing();
     this.setState({...this.state,
       user:{
         id:  '',
         birthDate:  '',
         fio:  '',
         contacts:{
           address:  '',
           city: '',
           phone: ''
         }
       }
     })
   }).then(()=>{
     this.props.handleUsersUpdate();
   })
  }

  handleSubmit (event) {
    let user = this.state.user;
    const {handleUsersUpdate, handleUserFormShowing } = this.props;

<<<<<<< HEAD
    if (!checks.phone(user.contacts.phone) || !checks.fio(user.fio) || !checks.dbate(user.birthDate)){
      if (!this.state.birthDate){
        this.setState({error:{...this.state.error, birth:'Дата рождения неверна!'}});
      }
      if (!checks.phone(user.contacts.phone)){
          this.setState({error:{...this.state.error, phone:'Номер телефона некорректен!'}});
      }
      if (!checks.fio(user.fio)){
          this.setState({error:{...this.state.error, fio:'ФИО некорректно!'}});
      }
    } else {
      if (this.props.selectedUser == null){
        let task = new Promise((resolve, reject)=>{
            resolve( api.addUserIntoDB(user) );
          }).then(()=>{
            handleUserFormShowing();
            api.deleteTaskFromLStorage();
            this.setState({...this.state,
              user:{
                id:  '',
                birthDate:  '',
                fio:  '',
                contacts:{
                  address:  '',
                  city: '',
                  phone: ''
                }
              }
            });
          }).then(()=>{
            handleUsersUpdate();
          })
      } else {
          let task = new Promise((resolve, reject)=>{
            resolve( api.editSelectedUserFromDB(this.state.user.id, user) );
            }).then(()=>{
            handleUserFormShowing();
            api.deleteTaskFromLStorage();
            this.setState({...this.state,
              user:{
                id:  '',
                birthDate:  '',
                fio:  '',
                contacts:{
                  address:  '',
                  city: '',
                  phone: ''
                }
              }
            });
          }).then(()=>{
            handleUsersUpdate();
          })
        }
        this.setState({error:{...this.state.error, fio:'', phone:'', birth:''}});
      }
=======


if (!checks.phone(user.contacts.phone) || !checks.fio(user.fio) || !checks.dbate(user.birthDate)){
  if (!this.state.birthDateDay || !this.state.birthDateMonth || !this.state.birthDateYear){
    var state = Object.assign(this.state, {
      something: Object.assign(this.state.error, { birth: 'дата рождения некорректна' }),
    });
    this.setState(state);
  }
  if (!checks.phone(user.contacts.phone)){
    var state = Object.assign(this.state, {
      something: Object.assign(this.state.error, { phone: 'некорректный номер' }),
    });
    this.setState(state);
  }
  if (!checks.fio(user.fio)){
    var state = Object.assign(this.state, {
      something: Object.assign(this.state.error, { fio: 'фио некорректно' }),
    });
    this.setState(state);
  }
} else {
  if (Object.keys(this.props.selectedUser).length == 0){
    let task = new Promise((resolve, refect)=>{
        resolve( dsApi.addUserIntoDB(user) );
      }).then(()=>{
        this.props.handleUserFormShowing();
        dsApi.deleteTaskFromLStorage();
        this.setState({
          id: '',
          fio:'',
          birthDateDay: '',
          birthDateMonth: '',
          birthDateYear: '',
          address: '',
          city:'',
          phone:''
        });
      }).then(()=>{
        this.props.handleUsersUpdate();
      })
  } else {
      let task = new Promise((resolve, refect)=>{
        resolve( dsApi.editSelectedUserFromDB(this.state.id, user) );
      }).then(()=>{
        this.props.handleUserFormShowing();
        dsApi.deleteTaskFromLStorage();
        this.setState({
          id: '',
          fio:'',
          birthDateDay: '',      birthDateMonth: '',      birthDateYear: '',
          address: '',
          city:'',
          phone:''
        });
      }).then(()=>{
        this.props.handleUsersUpdate();
      })
    }
    var state = Object.assign(this.state, {
      something: Object.assign(this.state.error, { fio: '', phone: '', birth: '' }),
    });
    this.setState(state);
  }
>>>>>>> origin/master
}

  render() {
    const styleDate = {
      width: 450,
<<<<<<< HEAD
      marginLeft: 15,
=======
      margin: 10,
>>>>>>> origin/master
      padding: 15,
      textAlign: 'left',
      display: 'flex',
    };



    const styleFio = {
      height: 100,
      width: 740,
      margin: 10,
      padding: 10,
      textAlign: 'center',
      display: 'inline-block',
    };

    const styleContacts = {
      height: 400,
      width: 740,
      margin: 10,
      padding: 10,
      textAlign: 'center',
      display: 'inline-block',
    };

    let months = ["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"];
    let days = [];
    let years = [];
    for (let i=1945; i <=2016; i++) {
      years.push(i);
    }
    for (let i = 1; i <= 31; i++){
      days.push(i)
    }
    let daysItems = days.map((day, index)=>{
      return <MenuItem key={day} value={index+1} primaryText={day} />
    });

    let monthItems = months.map((month, index)=>
      <MenuItem key={month} value={index+1} primaryText={month} />
    );

    let yearItems = years.map((year, index)=>
      <MenuItem key={year} value={year} primaryText={year} />
    );

    if (this.state.user.birthDate){
      var birthDate = this.state.user.birthDate.split('.');
    }


    return (
      <div className={s.root}>
            <AppBar  title="Информация о пользователе"
              iconElementLeft={
                <IconMenu
                  iconButtonElement={
                    <IconButton touch={true}>
                      <NavigationExpandMoreIcon color="white"/>
                    </IconButton>
                  }
                >
                  <MenuItem primaryText="Отмена" onClick = {this.handleCancel.bind(this)}/>
                  <MenuItem primaryText="Сохранить" onClick = {this.handleSubmit.bind(this)}/>
                  <MenuItem primaryText="Удалить" onClick = {this.handleDelete.bind(this)}/>
                </IconMenu>
              }>
            </AppBar>
            <div className={s.container}>
            <Paper style={styleFio} zDepth={1} >
                  <TextField
                    id="fio"
                    value = {this.state.user.fio}
                  	hintText="Введите ФИО..."
                  	floatingLabelText="Ф.И.О."
                    fullWidth={true}
                    className={s.selectfield__fio}
                    errorText={this.state.error.fio}
                  	onChange={this.handleChange.bind(this)}
                  />
              </Paper >
                <div className={s.datagroup} >
                <Paper style={styleDate } zDepth={1} >
                  <SelectField className={s.selectfield__day} id="day"
                    floatingLabelText="День"
                    errorText = {this.state.error.birth.length > 0 ? ' ': ''}
<<<<<<< HEAD
                    value={parseInt((birthDate ? birthDate[0]: ''))}
=======
                    value={parseInt(this.state.birthDateDay)}
>>>>>>> origin/master
                    onChange={this.handleSelectDay.bind(this)}
                  >
                      {daysItems}
                  </SelectField>
                  <SelectField className={s.selectfield__month} id="month"
                    floatingLabelText={"Месяц"}
                    errorText = {this.state.error.birth}
<<<<<<< HEAD
                    value={parseInt((birthDate ? birthDate[1]: ''))}
=======
                    value={parseInt(this.state.birthDateMonth)}
>>>>>>> origin/master
                    onChange={this.handleSelectMonth.bind(this)}
                  >
                      {monthItems}
                  </SelectField>
                  <SelectField className={s.selectfield__year} id="year"
                    floatingLabelText="Год"
                    errorText = {this.state.error.birth.length > 0 ? ' ': ''}
<<<<<<< HEAD
                    value={parseInt((birthDate ? birthDate[2]: ''))}
=======
                    value={parseInt(this.state.birthDateYear)}
>>>>>>> origin/master
                    onChange={this.handleSelectYear.bind(this)}
                  >
                    {yearItems}
                  </SelectField>
                </Paper>
                </div>

                <Paper style={styleContacts} zDepth={1} >
                  <TextField
                    id="address"
                    value = {(this.state.user.contacts ? this.state.user.contacts.address : '')}
                    hintText="Введите Адрес..."
                    floatingLabelText="Адрес"
                    fullWidth={true}
                    className={s.selectfield}
                    onChange={this.handleChange.bind(this)}
                  />
                  <TextField
                    id="city"
                    value = {(this.state.user.contacts ? this.state.user.contacts.city : '')}
                    hintText="Введите Город..."
                    floatingLabelText="Город"
                    fullWidth={true}
                    className={s.selectfield}
                    onChange={this.handleChange.bind(this)}
                  />
                  <TextField
                    id="phone"
                    value = {(this.state.user.contacts ? this.state.user.contacts.phone : '')}
                    hintText="79991234567"
                    floatingLabelText="Телефон"
                    className={s.textfield__phone}
                    errorText={this.state.error.phone}
                    onChange={this.handleChange.bind(this)}
                  />
              </Paper >
        </div>
      </div>
    );
  }
}


export default withStyles(s)(UserInfoForm);
