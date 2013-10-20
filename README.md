haystack
========

Haystack - Straw Twitter Consumer

# Installing

Ensure you have Redis

```bash
sudo apt-get install redis-server
```

Ensure you have Bower

```bash
npm install bower -g
```

Install Haystack and it's dependencies

```bash
git clone https://github.com/simonswain/haystack.git
cd haystack
npm install
bower install
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

= Licence

(c) 2013 Simon Swain
Haystack may be freely distributed under the MIT license.

https://github.com/simonswain/haystack
