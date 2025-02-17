class Langcore {
	modules= [];
	QUIET= true;
	exec = (s) => {
		this.modules.forEach(modIfo => {
			const changes = Object.keys(modIfo.do);
			if(modIfo.regex == true) {
				changes.forEach(key => {
					let parts = key.split('/');
					let regx = new RegExp(parts[1], parts[2]);
					if (s.match(regx)) {
						if(!this.QUIET) console.log(modIfo.name + ' used on ' + key)
						s = s.replace(regx, modIfo.do[key]);
					}
				});
			} else {
				changes.forEach(key => {
					if (s.includes(modIfo.namespace + key)) {
						if(!this.QUIET) console.log(modIfo.name + ' used on ' + key)
						s = s.replaceAll(modIfo.namespace + key, modIfo.do[key]);
					;} else if (key.includes('@') && s.includes(key)) {
						if (!this.QUIET) console.log(modIfo.name + ' used on ' + key)
						s = s.replaceAll(key, modIfo.do[key]);
					}
				});
			}
		});
		return s;
	}
	constructor() {}
}

module.exports = Langcore;