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

