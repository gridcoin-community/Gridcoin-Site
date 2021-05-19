# Gridcoin-Site

Open source Gridcoin website

## Want to edit the wiki?

See more information about that process [here](https://gridcoin.us/wiki/wiki-editing)

## Interested in contributing towards the whitelist?

Head on over to the [data folder](_data/) to get more info.

## Building Locally

This uses the [Jekyll Site builder](https://jekyllrb.com)

### Install Jekyll

For installation of Jekyll, please follow the [installation guide](https://jekyllrb.com/docs/installation/) for your operating system.

## Build guides

### Ubuntu Linux guide

1. `sudo apt-get install git`

2. `git clone https://github.com/gridcoin-community/Gridcoin-Site.git`

3. `cd Gridcoin-Site`

4. `bundle install`

### Windows guide

1. Install [Git for windows](https://git-scm.com/downloads)

2. Use Git GUI to clone gridcoin Repo

  --OR--

2. Go to the location you store Git Repos and `Rightclick` -> Gitbash here, then run  `git clone https://github.com/gridcoin-community/Gridcoin-Site.git`

3. Go to Gridcoin-Site folder (or whatever you specified when pulling the repo) `Shift+RightClick` -> Open Cmd Prompt Here or Open Powershell window here(Win 10)

4. Run `bundle install`

## How to Update gems

Delete Gemfile.lock and run `bundle install`

## For running the development web server

```sh
bundle exec jekyll serve
```

### WSL notes

If you're running through WSL you need to use the flag `--force-polling` with the above command or it will not regenerate automatically on changes.

If you wish to access it from another device you need to use [this workaround](https://github.com/microsoft/WSL/issues/4150#issuecomment-504209723). Remember to change the ports that are opened.
