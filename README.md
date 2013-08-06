haystack
========

Haystack - Straw Twitter Consumer

# Installing

Ensure you have Redis

```bash
sudo apt-get install redis-server
```

Install Haystack and it's dependencies

```bash
git clone git@github.com:simonswain/haystack.git
cd haystack
npm install -d
```

Create the config file

```bash
cp config/config.sample.js config/config.js
```

Edit `config/config.js` and enter your API keys - get them from [dev.twitter.com](http://dev.twitter.com/) 

```javascript
exports.twitter = {
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
}
```

Start data collection and processing

```bash 
~/haystack$ node run
```

Open another shell and start the webserver

```bash 
~/haystack$ node server
```

Open `http://localhost:3000` to see some results.
