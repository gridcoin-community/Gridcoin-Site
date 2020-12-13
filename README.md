# Gridcoin-Site
Open source Gridcoin website

## Want to edit the wiki?
See more information about that process [here](https://gridcoin.us/wiki/wiki-editing)

## Interested in contributing towards the whitelist or the blog?

Head on over to the [data folder](_data/) to get more info.


# Building Locally

This uses the Jekyll Site builder
https://jekyllrb.com
## Install Jekyll

For installation of Jekyll please follow https://jekyllrb.com/docs/installation/ and pick your OS Guide.

# Build guides
## Ubuntu Linux guide

1. sudo apt-get install git

2. git clone https://github.com/gridcoin-community/Gridcoin-Site.git

3. cd Gridcoin-Site

4. bundle install 

## Windows guide
1. Install Git for windows, https://git-scm.com/downloads

2. Use Git GUI to clone gridcoin Repo

  --OR--

2. Go to the location you store Git Repos and Rightclick -> Gitbash here git clone https://github.com/gridcoin-community/Gridcoin-Site.git

3. Go to Gridcoin-Site folder (or whatever you specified when pulling the repo) Shift+RightClick -> Open Cmd Prompt Here or Open Powershell window here(Win 10)

4. bundle install 

### How to Update gems

Delete Gemfile.lock and run bundle install

### For running the development web server:

bundle exec jekyll serve
