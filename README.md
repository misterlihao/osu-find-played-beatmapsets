# osu-find-played-beatmapsets

Find back you played beatmapsets on osu website

## Usage

### Scanning

You should be at osu website and already logged in.

Simply put content of `main.js` to the chrome console.  
And before the script completes, do not refresh or leave the osu website page.

The script will keep checking all the beatmapsets available from osu website, printed out every time a beatmapset is fonud played.  
Also, all links will be printed to the chrome console when the whole scanning is completed.

### Get Output

You can also get all links by entering following command to the chrome console, event during the script is running:
```js
links.join('\n');
```
Or you can save to file with this script from stackoverflow
```js
~function(data, filename, type) {
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
}(links.join('\n'), 'links.txt', 'file');

```

## Other Information

* Batch download is not covered, but you can find tools for that on the Internet.
* The links are stored as mirror links from bloodcat website, and may become invalid some day.
