const checks = {
	fio: (chFio) => {
		if (chFio.length <=100 && chFio.length >2){
			return true;
		}
		return false;
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
