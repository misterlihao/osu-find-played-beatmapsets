# osu-find-played-beatmapsets

Find back you played beatmapsets on osu website

## Usage

You should be at osu website and already logged in.

Simply put content of `main.js` to the chrome console.  
And before the script completes, do not refresh or leave the osu website page.

The script will keep checking all the beatmapsets available from osu website, printed out every time a beatmapset is fonud played.  
Also, all links will be printed to the chrome console when the whole scanning is completed.

You can also get all links by entering following command to the chrome console, event during the script is running:
```js
links.forEach(l=>console.log(l));
```

## Other Information

* Batch download is not covered, but you can find tools for that on the Internet.
* The links are stored as mirror links from bloodcat website, and may become invalid some day.
