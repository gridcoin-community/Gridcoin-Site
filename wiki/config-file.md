---
title: Gridcoin Config File
layout: wiki
redirect_from:
  - "/Wiki/Config-File"
---

## Background

The config file is a file that can change list of different options. When you update
or change the file, make sure to restart the wallet to make the changes go into
effect

In the GUI you can open it to edit by clicking the Setting tab then Open Config File. 
Alternatively you can go to the file in the location below and edit it there 

## Default gridcoinresearch.conf location

    Windows:  %AppData%\GridcoinResearch\

    Linux:    ~/.GridcoinResearch/

    macOS:    /Users/USERNAME/Library/Application Support/GridcoinResearch/

## Basic Configuration File

    #############################################################################
    #################### Example gridcoinresearch.conf file #####################
    #############################################################################
    ##
    ## For further details on this configuration file please see [Testnet](testnet "wikilink")
    ##
    ## Default gridcoinresearch.conf location:
    ##
    ##  Win:   %AppData%\GridcoinResearch\
    ##  Linux: ~/.GridcoinResearch/
    ##  macOS: /Users/USERNAME/Library/Application/Support/GridcoinResearch/
    ##
    ## Single # lines are commands, remove the # in Front of the Command to use it
    ## Double ## lines are comments
    ##
    #############################################################################
    ####################### Required Settings (All OS's) ########################
    #############################################################################

    ## Community provided list of addnodes available at [List of Addnodes](addnodes "wikilink")
    #~~~~~Copy & Paste Addnodes here~~~~~


    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    ## BOINC account E-Mail
    ## Use blank or INVESTOR for Investor or Pool Mining
    ## Note the PrimaryCPID field is deprecated and ignored since the Denise
    ## release.
    email=

    ## Port 32749/TCP open or forwarded required for Inbound Connections
    ## (Not required but highly recommended)
    listen=1

    ## Required for Headless set-ups
    #daemon=1

    #############################################################################
    ############# RPC Settings for Remote Access and Headless Users #############
    ############ Warning: Set a Good Password and Secure Your System ############
    #############################################################################

    #server=1
    #rpcallowip=<IP Address of Remote System> NOTE that if you only want to connect with localhost, you do not need to specify rpcallowip. This is only if you want to connect outside of localhost!
    #rpcport=<Port for RPC Communication>
    #rpcuser=<A Username for RPC>
    #rpcpassword=<A GOOD Password for RPC>

    #############################################################################
    ######################## Optional BOINC settings ############################
    ########### (Required if BOINC installed to non-default location) ###########
    #############################################################################

    ## Windows (Note the double backslashes are necessary)
    #boincdatadir=C:\\ProgramData\\BOINC\\

    ## Linux
    #boincdatadir=/var/lib/boinc-client/

    ## macOS
    #boincdatadir=/Library/Application Support/BOINC Data/

    #############################################################################
    ######################## Optional Network settings ##########################
    #############################################################################

    ## Maximum number of inbound+outbound connections.Default 125
    maxconnections=125
    ## Maximum number of outbound connections.Default 8
    maxoutboundconnections=8
    ## Manually Set-up Ports
    #upnp=false
    #externalip=<Your IP Address>

    #############################################################################
    ############################## Other Entries ################################
    #############################################################################

    ## See detailed Other Entries description section below.

    #debug=true
    #debug=<category>

    #enablestakesplit=1
    #stakingefficiency=<percentage between 75 and 98, defaults to 90>
    #minstakesplitvalue=<value in GRC, minimum and defaults to 800>

    #enablesidestaking=1
    #sidestake=<address>,<allocation percentage>


## Addnodes

The list of addnodes you provide are the nodes that your client will
attempt to establish outbound connections with. The basic configuration
file does not include addnodes. A full current list of addnodes can be
found [List of Addnodes](addnodes "wikilink")

If your system fails to sync, check your [List of
Addnodes](addnodes "wikilink") against the current list.

Ensure you don't have an addnode=your own ip, or you will end up banning
yourself (because when the node sends itself the first message, the
local time is far enough off of the network time (which it does not know
yet) so it will ban itself.

## Other Entries

Most of Gridcoin's config file flags and command line arguments are
taken directly from Bitcoin, and you can find a list which explains a
lot of these options here: <https://en.bitcoin.it/wiki/Running_Bitcoin>

**debug=true**  
**debug=\<category>**

Let your node receive tons of extra messages in debug.log. From the 4.1.0.0
release onward, logging can also be enabled by category. You can see a list
of categories by issuing the command "logging". Note that not all categories
are available yet, as the wallet is transiting from the traditional debug
flags to these categories.

Some Gridcoin specific other entries:

**enablestakesplit=1**  
**stakingefficiency=\<percentage between 75 and 98, defaults to 90>**  
**minstakesplitvalue=\<value in GRC, minimum and defaults to 800>**

enablestakesplit=1 will enable the automatic splitting of [UTXOs](utxos "wikilink") 
in the coinstake transaction (stake outputs). Zero is the default (disabled).

stakingefficiency=xx is an integer that specifies the desired staking
efficiency. This is constrained by the code to be between 75% and 98%,
in case an unreasonable value is provided. Give as a percentage without the 
percent sign

minstakesplitvalue=xxx is an integer that specifies the minimum UTXO size
desired post split to provide a secondary control on UTXO size. If
difficulty drops and a high efficiency is specified, the efficiency alone
would split UTXOs into amounts smaller than the user desires. This will
prevent that from occurring. If a user specifies less than 800 GRC, then
the code uses 800 GRC. Note that the stake splitter uses a 160 block
averaging interval for calculating the difficulty to smooth out the
difficulty swings.

**enablesidestaking=1**  
**sidestake=\<address>,\<allocation percentage>**

This will send a part of what you earn from [staking](staking "wikilink") 
to the given addresses in a process called sidestaking. Each `sidestake=`
line will specify who to send to and what % of the reward to give them

Any percentage not given to a sidestake will go back to yourself. So if you sidestake
a total of 10% to other addresses, you will still receive 90% of the rewards

You can have as many `sidestake=` entries as you want, but going over 6 will lead to 
addresses being randomly selected when you stake because only 6 addresses and your own
can be sent to at one time. It will also not allow stake splitting if you sidestake
to 6 or more addresses. This is because stakesplitting requires sending Gridcoin 
to yourself at least twice (in separate UTXOs) in a stake which can't be done if
all the other "slots" are filled up

Example use (sidestaking 5% of your rewards to the [foundation](foundation "wikilink"))
```
enablesidestaking=1
sidestake=bc3NA8e8E3EoTL1qhRmeprbjWcmuoZ26A2,5
```

## Testnet

Note: It is not supported to enter *testnet=1* flag into configuration
file. It *must* be specified on the command line in the form of
*-testnet* argument. Keyword testnet in configuration file has undefined
behavior. See the [Testnet](testnet "wikilink") page for more information.
