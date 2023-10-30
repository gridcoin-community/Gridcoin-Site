# Gridcoin-Site

Open source Gridcoin website

## Building Locally

This uses the [Jekyll Site builder](https://jekyllrb.com)

For installation of Jekyll, please follow the [installation guide](https://jekyllrb.com/docs/installation/) for your operating system.

## Build Locally & Contributing

### Ubuntu Linux guide

1. Fork this repository by clicking the fork button (top right)

2. `sudo apt-get install git` if you don't already have git installed

3. `git clone https://github.com/gridcoin-community/Gridcoin-Site.git`
 (replace this with your fork)
4. `cd Gridcoin-Site`

5. `git branch your_branch_name` (give it a descriptive name like "whitelist changes")

6. Every time you make changes, run `git commit -a` to add your changes followed by `git push` to push them to your repo on github.com.

7. `bundle install` (runs the web server for local previewing)

8. When ready to submit changes, go back to your fork on github.com and you will be prompted to make a pull request.

### Windows guide

1. Fork this repository by clicking the fork button (top right)

2. Install [Git for windows](https://git-scm.com/downloads)

3. Use Git GUI to clone gridcoin Repo   --OR-- Go to the location you store Git Repos and `Rightclick` -> Gitbash here, then run  `git clone https://github.com/gridcoin-community/Gridcoin-Site.git` (put your fork's URL here)

4. Go to Gridcoin-Site folder (or whatever you specified when pulling the repo) `Shift+RightClick` -> Open Cmd Prompt Here or Open Powershell window here(Win 10)

5. `git branch your_branch_name` (give it a descriptive name like "whitelist changes")

6. Every time you make changes, run `git commit -a` to add your changes followed by `git push` to push them to your repo on github.com.

7. Run `bundle install` (runs the web server for local previewing)

8. When ready to submit changes, go back to your fork on github.com and you will be prompted to make a pull request.

### Editing Specific Sections

#### Want to edit the wiki?

See more information about that process [here](https://gridcoin.us/wiki/wiki-editing)

#### Interested in contributing towards the whitelist?

Head on over to the [data folder](_data/) to get more info.

## How to Update gems

Delete Gemfile.lock and run `bundle install`

## For running the development web server

```sh
bundle exec jekyll serve
```

### WSL notes

If you're running through WSL you need to use the flag `--force-polling` with the above command or it will not regenerate automatically on changes.

If you wish to access it from another device you need to use [this workaround](https://github.com/microsoft/WSL/issues/4150#issuecomment-504209723). Remember to change the ports that are opened.
