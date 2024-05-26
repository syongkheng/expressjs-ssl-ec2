# Deploying an ExpressJS Web Application with MySQL

## Creating an EC2 Instance

1) OS Ubuntu (t2.micro, or any that is eligible for free tier)
2) Create a new key for SSH (.pem)
3) Set up the memory space for the volume
4) Create instance

## Get an Elastic IP

1) Head to Elastic IPs under the Network & Security Group
2) Associate an Elastic IP with the newly created EC2 instance

### Checkpoint (SSH into EC2 Instance)

1) Run the following commands:
2) `chmod 400 <path-to-pem-file>/<file-name>.pem`
3) `ssh -i <path-to-pem-file>/<file-name>.pem ubuntu@<elastic-ip>`
4) Trust the fingerprint and add the EC2 Instance into the list of known hosts

## Installing Node in the EC2 Instance

1) Run the following commands:
2) `sudo apt update`
3) `sudo apt upgrade`
4) `sudo apt install -y git htop`
5) `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
6) `export NVM_DIR="$HOME/.nvm"`
7) `[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`
8) `[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"`
9) Verify that nvm has been installed: `nvm --version`
10) `nvm install --lts`
11) Verify that node has been installed: `node --version`
12) Verify that npm has been installed: `npm -v`

## Cloning Git Repositories from EC2 Instance

1) Create a public key (within EC2 Instance)
2) `ssh-keygen  #Press enter thrice`
3) Retrieve public key (within EC2 Instance)
4) `cat ~/.ssh/id_rsa.pub # Please becareful to not share this with anyone`
5) Navigate to GitHub
6) Click on your profile photo -> Settings -> SSH and GPG keys (Under Access)
7) Click on "NEW SSH key"
8) Choose a title as the identifier for the connection between Git and the EC2 Instance
9) Paste the key from 4 under "Key"
10) Click on "Add SSH Key" (Complete MFA if needed)
11) You should be able to clone the repository!
12) `git clone git@github.com:syongkheng/expressjs-ec2-guide.git`

## Accessing the web application
1) Build the typescript files into javscript files
2) `npm run build`
3) The web application can be deployed with `npm run dev`
4) The application should now be accessible at http://<elastic-ip>:3000
5) This simulates a "dev" envrionment and the terminal running the process has to be kept alive.
6) Persisting the application with pm2: `npm install pm2`
7) `pm2 start dist/src/index.js --name=expressjs-server`
8) `pm2 save`
9) `pm2 startup # Execute the command as prompted`
10) The web application should still be accessible even after exiting the terminal
11) Optional: You can run npm run migration which will create a dev account username: `dev`, password: `secret`

# Optional steps: SSL Certificate with Nginx Reverse Proxy

## Configuring Nginx
1) `sudo apt install nginx`
2) `sudo nano /etc/nginx/sites-available/default`
3) Add the following to the location {} and server_name
3.1) `server_name <subdomain>.<domain>.<tld>`
3.2)
```
location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
4) Check the config `sudo nginx -t`
5) Restart nginx `sudo service nginx restart`

### Add domain in your domain provider
1) Add a "A" record that points to the EC2 Instance Public IPV4, the same IP that you use to ssh.

## Configuring SSL Certification with Certbot
1) `sudo snap install core; sudo snap refresh core`
2) `sudo apt remove certbot`
3) Adding certbot to path: `sudo ln -s /snap/bin/certbot /usr/bin/certbot`
4) `sudo certbot --nginx -d <subdomain>.<domain>.<tld>` 
5) `sudo systemctl status snap.certbot.renew.service`
6) `sudo certbot renew --dry-run`
7) The server should be accessible with HTTPS now!
