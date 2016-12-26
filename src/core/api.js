import axios from 'axios';

const api = {
	getTasksFromLStorage: () => {
		let userForExport = null;
		if (localStorage.getItem('user_tmp')){
			userForExport = {
						fio: JSON.parse(localStorage.getItem('user_tmp')).fio,
						birthDate: JSON.parse(localStorage.getItem('user_tmp')).birthDate,
						contacts: JSON.parse(localStorage.getItem('user_tmp')).contacts
					};
		}

		return userForExport;
	},

	addNewTaskToLStorage: (user) => {
		localStorage.setItem("user_tmp", JSON.stringify(user));
	},

	deleteTaskFromLStorage: () => {
		return new Promise((resolve, reject)=>{
			resolve(localStorage.removeItem("user_tmp"));
		});
	},

	editTaskInLStorage: (user) => {
		localStorage.removeItem("user_tmp");
		localStorage.setItem("user_tmp" , JSON.stringify(user));
	},

	getAllUsersFromDB: () => {
    return axios.get('/api/users/all');
	},

	getSelectedUserFromDB: (uid) => {
		return axios.get('/api/users/'+uid);
	},

	addUserIntoDB: (user) => {
			return axios.get('/api/users/uid').then((response) => {
				let newId = 1, maxId = 0;
				console.log('get last uid');
				console.log(response);
				if (response.data.length > 0){
					maxId = response.data[0].id;
					newId = ++maxId;
				} else {
					newId = 1;
				}
				return newId;
			}).then((newId)=>{
				axios.post('/api/users', {
		      id: newId,
					fio: user.fio,
					birthDate: user.birthDate,
					address: user.contacts.address,
					city: user.contacts.city,
					phone: user.contacts.phone
		    });
			});
		},

	editSelectedUserFromDB: (id, user) => {
	 return axios.put('/api/users', {
			params: {
				id: id,
				userData: user
			}
		});
	},

	deleteUserFromDB: (uid) => {
		return axios.post('/api/users/'+uid);
		}
};

export default api;
