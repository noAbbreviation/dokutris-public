class Cache {
	constructor() {
		this.map = new Map();
	}
	
	fetchProps() {
		this.fresh = true;
		
		for (let cacheObjs in cacheKeys) {
			let getObj = getItem(cacheKeys[cacheObjs]);
			
			if (getObj != null) {
				this.fresh = false;
			}
			
			this.map.set(cacheKeys[cacheObjs],getObj);
		}
	}
	
	upload() {
		this.map.set(cacheKeys['appState'], appState);
		this.map.set(cacheKeys['board'], board);
		this.map.set(cacheKeys['pieces'], pieces);
		this.map.set(cacheKeys['stats'], stats);
		this.map.set(cacheKeys['overallStats'], overallStats);
		this.map.set(cacheKeys['skinState'], skinState);
		this.map.set(cacheKeys['mainBag'], mainBag);
		this.map.set(cacheKeys['miniBag'], miniBag);
		
		for (let cacheObjs in cacheKeys) {
			storeItem(cacheKeys[cacheObjs],this.map.get(cacheKeys[cacheObjs]));
		}
	}
	
	smallUpload() {
		this.map.set(cacheKeys['skinState'], skinState);
		storeItem(cacheKeys['skinState'],this.map.get(cacheKeys['skinState']));
	}
	
	getObj(objName) {
		return cache.map.get(cacheKeys[objName]);
	}
}

// ! WARNING: !
// DON'T CHANGE THE VALUES HERE IF YOU DON'T WANT TO REMOVE PROGRESS!
const cacheKeys = {
	appState: 'nevah',
	board: 'gunna',
	pieces: 'give',
	stats: 'yuu',
	overallStats: 'upp',
	
	mainBag: 'nevvah',
	miniBag: 'gunnna',
	
	skinState: 'hello_friend'
}