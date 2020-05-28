let download = function(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
};


let delay = async function(t) {
	await new Promise(resolve => {
		setTimeout(resolve, t);
	});
};

let async_get = async function(url) {
	x = new XMLHttpRequest();
	x.open('GET', url);
	x.send()
	
	await new Promise(resolve=>{
		x.onload = resolve;
	});
	
	if (x.status != 200) {
		throw 'XHR failed with status ' + x.status;
	}
	
	return x.responseText;
}

let search = async function(query) {
	return JSON.parse(await async_get('/beatmapsets/search?' + encodeURI(query)));
};

let check_map_played = async function(map_id) {
	return !!JSON.parse(await async_get('https://osu.ppy.sh/beatmaps/' + map_id + '/scores?type=global&mode=osu').catch(()=>{return '{}';})).userScore;
};

let make_search_query = function(cursor_object) {
	if (!!cursor_object) {
		return 'm=0&s=ranked&cursor[approved_date]=' + cursor_object.approved_date + '&cursor[_id]=' + cursor_object._id;
	} else {
		return 'm=0&s=ranked';
	}
};

let total = 99999999;

let processed = 0;
let last_cursor = null;
let links = [];
while (processed < total) {
	await delay(1000);
	console.log('completed search cursor = ' + last_cursor);
	let search_result = await search(make_search_query(last_cursor));
	last_cursor = search_result.cursor;
	total = search_result.total;
	
	for (bmset of search_result.beatmapsets) {
		processed += 1;
		let played = false;
		for (bm of bmset.beatmaps) {
			await delay(1000);
			if (await check_map_played(bm.id)) {
				played = true;
				break;
			}
		}
		
		if (played) {
			links.push('https://bloodcat.com/osu/s/' + bmset.id);
			console.log('beatmap set ' + bmset.title + ' is played, mirror = ' + links[links.length - 1]);
		}
	}
}

console.log('scan completed, script ended.');
download(links.join('\n'), 'links.txt', 'file');
