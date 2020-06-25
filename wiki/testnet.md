---
title: Gridcoin Testnet
layout: wiki
---

# Introduction

Testnet (test network) is a separate blockchain meant for testing new features 
of Gridcoin. It helps catch issues before a release so they don't end up in the
final versions. The coins on testnet don't have actual value since they are just 
for testing purposes. Want to help test? See the [How To Help Section](#how-to-help) 
for more info

Secondarily it also can be used to help test scripts or services that interact 
with Gridcoin without using real coins. This does not guarantee that your
program will work on the main network (mainnet), but it can be helpful. Make sure 
to note some of differences in the [Difference To Mainnet Section](#difference-to-mainnet)

# How To Help

1. Join the [Gridcoin Slack](https://join.slack.com/t/teamgridcoin/shared_invite/enQtMjk2NTI4MzAwMzg0LTE4N2I3ZWZjYWJlZGM1Zjg3MTUyMDhiN2M5NmRmZTA2NDA0ZmY1ZTFmOGM3ZGU2YTBkOTdhNTk2ZjkzMGZkODY)
and join the `#testnet` channel where most of the conversation about testnet is
    * See this [help page](https://slack.com/help/articles/205239967-Join-a-channel#join-channels) 
      for how to join channels on slack

2. Look for pinned messages in `#testnet` about the latest downloads. 
If you don't see a message, or one that is old, or just are not sure about what 
to do, feel free to ask a question on the channel
    * See this [help page](https://slack.com/intl/en-in/help/articles/205239997-Pin-messages) 
      for viewing pinned messages (scroll to `View Pinned Messages`)

    * If on MacOS you will likely need to ask on `#testnet` about downloads 
      since a testnet version is not often produced.

    * If you see any contradicting directions on `#testnet`, follow them instead 
    of these as they are more likely to be accurate and up to date

3. Configuring the wallet (don't run the wallet until step 4)
    * On Windows
        1. Go to `%appdata%/GricoinResearch` by pressing the Windows Key then Q and entering that path to get there. 
        2. Click on New Folder and type `testnet` and press enter. 
        3. Go to the testnet folder then right click -> new -> Text Document
        4. Right click -> Rename  and enter `gridcoinresearch.conf`
        5. Right click on the file and hit edit (if it asks you what to use, you can use notepad)
        6. Copy in the config file and **change `CHANGE_ME` to something unique**. Use this [testnet config file](#the-config-file)
        7. Save the file and exit the text editor
    * On MacOS
        1. Go to `~/Library/Application/Support/GridcoinResearch/` 
        by opening Finder, click on `Go`, then click on `Go to Folder` and
        enter that path.
        2. In that directory, right click and create a folder called `testnet`
        3. Right click and create a new file (any type works) and rename it
        to `gridcoinresearch.conf`
        4. Double click to open the file
        5. Copy in the config file and **change `CHANGE_ME`to something unique**. Use this [testnet config file](#the-config-file)
        6. Save the file and exit TextEditor
    * On Linux
        1. Go to `~/.GricoinResearch`
        2. Make a folder labeled `testnet` there
        3. Create a file called `gridcoinresearch.conf`
        4. Edit it and copy in the config file and **change `CHANGE_ME` to something unique**. Use this [testnet config file](#the-config-file)

4. Running the wallet
    * You can have both a testnet and mainnet version of the wallet running at
      the same time, but not two testnet or two mainnet wallets at the same time.
      **Do not run the testnet wallet without the -testnet flag**

    * On Windows
        1. Right click on the file downloaded in step 2 and create a shortcut
        2. Rename the shortcut so you know and remember it's the testnet version
        3. Right click on the shortcut and go to properties -> shortcut
        4. On the line `target` add `-testnet` to the end so it looks something like `file -testnet` (where `file` is whatever was in the target line before)
        5. Click Apply then click Ok
        6. Double click on the shortcut

    * On Linux
        * The executable may or may not be in the path variable depending on your distro 
        and how the build was setup. Make sure not to run the standard wallet on testnet
        (unless explicitly told to do so).
        * **make sure to run with -testnet** as an argument

    * On MacOS
        * You will need to ask on the Slack channel about how to run it as 
          there's not a standard type of build for MacOS as of the time of 
          writing

5. Get Testnet Coins
    * Testnet coins can be gotten from various users on `#testnet` on Slack.
      Ask on that channel and give a testnet address for users to send coins to.

# The Config File 
**Make sure to change the `CHANGE_ME` value to something unique** (don't copy this line into the config)

    #############################################################################
    #################### TESTNET gridcoinresearch.conf file #####################
    ################## THIS FILE IS ONLY FOR USE ON THE TESTNET #################
    ######################### DO NOT USE ON PRODUCTION ##########################
    #############################################################################
    ##
    ## TESTNET USERS MUST LAUNCH THE WALLET USING THE -testnet FLAG
    ## TESTNET USERS MUST JOIN THE #testnet CHANNEL ON SLACK
    ##
    ## For further details on this configuration file please see:
    ## https://gridcoin.us/wiki/config-file
    ##
    ## Default testnet gridcoinresearch.conf location:
    ##
    ##  Windows: %AppData%\GridcoinResearch\testnet\
    ##  Linux:   ~/.GridcoinResearch/testnet/
    ##  macOS:   /Users/USERNAME/Library/Application/Support/GridcoinResearch/testnet/
    ##
    ## Single # lines are commands, remove the # in Front of the Command to use it
    ## Double ## lines are comments
    ##
    #############################################################################
    ####################### Required Settings (All OS's) ########################
    #############################################################################

    ## You must set your username to assist developers tracking down problems
    org=CHANGE_ME

    ## Decrease ban expiration time. The default 24 hours is too long for testnet.
    ## Nodes are banned for sending bad data (seconds)
    bantime=60

    ## These Addnodes are for TESTNET only. See Slack for further details.
    addnode=addnode-us-central.cycy.me
    addnode=ec2-3-81-39-58.compute-1.amazonaws.com
    addnode=gridcoin.network
    addnode=gridhost.ddns.net
    addnode=tarmoilves.eu
    addnode=testnet.dihelix.com

    ## Port 32748/TCP required for Inbound Connections
    ## (Not required but highly recommended)
    listen=1

    #############################################################################
    ######################## Optional BOINC settings ############################
    ########### (Required if BOINC installed to non-default location) ###########
    #############################################################################

    ## Windows (Note the double backslashes are neccessary)
    #boincdatadir=C:\\ProgramData\\BOINC\\
    #boincappdir=C:\\Program Files\\BOINC\\

    ## Linux
    #boincdatadir=/var/lib/boinc-client/

    ## macOS
    #boincdatadir=/Library/Application Support/BOINC Data/

# Difference To Mainnet

Note that this is not an exhaustive list

* The coins on testnet aren't worth anything like the ones on mainnet are
    * Lets testing happen without risking anything valuable

* Running on new or sometimes experimental code
    * This can make testnet more unstable than mainnet
    * Sometimes the wallet will receive more bad data than on mainnet 

* Cooldown happens faster
    * Makes it easier to test things relating to staking

* Addresses are formatted differently
    * Helps prevents you from accidentally sending coins to a testnet address on
      mainnet and vice versa

* Testnet doesn't have any checkpoints
    * Helps with creating private chains for small scale testing 

# Contacts

General questions about testnet can often go on the `#testnet` channel on Slack.