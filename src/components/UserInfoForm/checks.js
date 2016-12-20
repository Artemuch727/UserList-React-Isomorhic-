const checks = {
	fio: (chFio) => {
		if (chFio.length <=100 && chFio.length >2){
			return true;
		}
		return false;
	},
  	dbate: (dbate) => {
		if (dbate != undefined){
				let dt = dbate.split('.');
				if (!dt[0] || !dt[1] || !dt[2] ){
						return false
				} else {
					if (isNaN(Date.parse(dbate))){
							return false
					}
				}
		}
		return true
	},
	phone: (chPhone)=>{
		let reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{11}$/;
		if (reg.test(chPhone)){
			return true
		}
		return false
	},
	dt: ()=>{}
};

export default checks;
