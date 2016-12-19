import axios from 'axios';

const api = {
	getTasksFromLStorage: () => {
		let userForExport = {};
		for (let element in localStorage) {
			if (element.match(/user/i)) {
				userForExport = {
					//id: JSON.parse(localStorage.getItem(element)).id,
					fio: JSON.parse(localStorage.getItem(element)).fio,
					birthDate: JSON.parse(localStorage.getItem(element)).birthDate,
					contacts: JSON.parse(localStorage.getItem(element)).contacts
				};
			}
		}
		return userForExport;
	},
	addNewTaskToLStorage: (user) => {
		localStorage.setItem("user_tmp", JSON.stringify(user));
	},
	deleteTaskFromLStorage: () => {
		localStorage.removeItem("user_tmp");
	},
	editTaskInLStorage: (user) => {
		localStorage.removeItem("user_tmp");
		localStorage.setItem("user_tmp" , JSON.stringify(user));
	},

	getAllUsersFromDB: () => {
    return axios.get('/users/all');
	},

	getSelectedUserFromDB: (uid) => {
		return axios.get('/users/'+uid);
	},

	addUserIntoDB: (user) => {
		return axios.get('/uid').then((response) => {
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
			axios.post('/users', {
	      id: newId,
				fio: user.fio,
				birthdate: user.birthdate,
				address: user.contacts.address,
				city: user.contacts.city,
				phone: user.contacts.phone
	    });
		})
		},

	editSelectedUserFromDB: (id, user) => {
	 return axios.put('/users', {
			params: {
				id: id,
				userData: user
			}
		});
	},

	deleteUserFromDB: (uid) => {
		axios.post('/users/'+uid);
		}
};

export default api;
