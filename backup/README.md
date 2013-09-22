Arab-Angels Staging App
===========

Arab Angels is a medium between entrepreneurs and angel investors in the arab world.

## Nginx Configuration
```
sudo mv nginx.conf /etc/nginx/sites-enabled/arabangels.org
sudo ln -s /etc/nginx/sites-enabled/arabangels.org /etc/nginx/sites-available/arabangels.org
```

## Installation 

### PM2
The Node Js Daemon
```
sudo npm install pm2 -g
```

### Bower
You need to install bower first.

```
sudo npm install bower -g
```

now you're ready to download dependencies.

```
cd public
sudo bower install
```

### NPM

In your project directory

```
npm install
```

