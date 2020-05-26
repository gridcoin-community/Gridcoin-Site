---
title: Gridcoin Config File
layout: wiki
---

## Default gridcoinresearch.conf location

    Windows:  %AppData%\GridcoinResearch\

    Linux:    ~/.GridcoinResearch/

    macOS:    /Users/USERNAME/Library/Application Support/GridcoinResearch/

## Testnet

Note: It is not supported to enter *testnet=1* flag into configuration
file. It *must* be specified on the command line in the form of
*-testnet* argument. Keyword testnet in configuration file has undefined
behavior. See [Testnet](Testnet "wikilink") for more
    information.

## Basic Configuration File

    #############################################################################
    #################### Example gridcoinresearch.conf file #####################
    #############################################################################
    ##
    ## For further details on this configuration file please see [Testnet](Testnet "wikilink")
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

    ## Community provided list of addnodes available at [List of Addnodes](List-of-Addnodes "wikilink")
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
    #rpcallowip=127.0.0.1
    #rpcallowip=<IP Address of Remote System>
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

## Addnodes

The list of addnodes you provide are the nodes that your client will
attempt to establish outbound connections with. The basic configuration
file does not include addnodes. A full current list of addnodes can be
found [List of Addnodes](Addnodes "wikilink")

If your system fails to sync, check your [List of
Addnodes](Addnodes "wikilink") against the current list.

Ensure you don't have an addnode=your own ip, or you will end up banning
yourself (because when the node sends itself the first message, the
local time is far enough off of the network time (which it does not know
yet) so it will ban itself.

## Other Entries

Most of Gridcoin's config file flags and command line arguments are
taken directly from Bitcoin, and you can find a list which explains a
lot of these options here: <https://en.bitcoin.it/wiki/Running_Bitcoin>

**debug=true**

Let your node receive tons of extra messages in debug.log.
