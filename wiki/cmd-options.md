---
title: Command Line Options 
description: Arguments you can give to the wallet
layout: wiki
redirect_from:
 - "/Dev/daemon-cmd.htm"
---

# Introduction

Separate from the [config file](config-file "wikilink"), various options can
be given when starting up the wallet. They can be useful for testing giving 
quick changes. For configuring some things, they are the only way to do so.


Throughout this guide, when you see things in `<>` these represent a value. The
text inside is trying to give you and understanding of what this value is. Secondly,
the world `OPTION` in all caps through this guide is a placeholder for whatever 
options you want to give the wallet


Some options can be set permanently in the config file with `OPTION=<VALUE>` 
instead of `-OPTION=<VALUE>`. If it's instead `-OPTION`, some can be set with
`OPTION=1` in the config. Note that this doesn't work for sone options
such as `-testnet`

# How To Add Arguments

* On Windows 
    * Can be added by right clicking a shortcut to the wallet, clicking properties,
      and modifying the line labeled target by adding the options after the program
      path. 
    
        * Example: could look `C:\Program Files\GridcoinResearch\gridcoinresearch.exe -OPTION `

        
        * A shortcut can be created if it doesn't exist, by right clicking on 
        the desktop, clicking new then shortcut and entering to link to 
        `C:\Program Files\GridcoinResearch\gridcoinresearch.exe` or
        `C:\Program Files(x86)\GridcoinResearch\gridcoinresearch.exe` if on 32-bit
        Windows

    * Can also be run through the command prompt/powershell by typing 
      out the full path to the program and the options you want to add

^
* On Linux 
  * can be used by running wallet with `gridcoinresearchd -OPTION` or `gridcoinresearch-qt -OPTION` for the headless and GUI version of the wallet respectively.

  * For the desktop or application list:
    * edit the `Exec=` line of the gridcoinresearch-qt.desktop file to include the arguments after the program name
    * See this [arch wiki entry](https://wiki.archlinux.org/index.php/desktop_entries#Application_entry) for the common location of .desktop files


* On MacOS 
  1. First open the Terminal app
  2. Type and enter `open /Applications/gridcoinresearch.app --args -OPTION`  
    (`--args` is not a placeholder --- you need to enter this)





# Options 

  * `-?` or `-help` or `--help` Print help message
  * `-version`               Print version and exit
  * `-conf=<file>`           Specify configuration file (default: gridcoinresearch.conf)
  * `-pid=<file>`            Specify pid file (default: gridcoind.pid)
  * `-datadir=<dir>`         Specify data directory
  * `-wallet=<dir>`          Specify wallet file (within data directory)
  * `-dbcache=<n>`           Set database cache size in megabytes (default: 25)
  * `-dblogsize=<n>`         Set database disk log size in megabytes (default: 100)
  * `-timeout=<n>`           Specify connection timeout in milliseconds (default: 5000)
  * `-peertimeout=<n>`       Specify p2p connection timeout in seconds. This option determines the amount of time a peer may be inactive before the connection to it is dropped. (minimum: 1, default: 45)
  * `-proxy=<ip:port>`       Connect through socks proxy
  * `-socks=<n>`             Select the version of socks proxy to use (4-5, default: 5)
  * `-tor=<ip:port>`         Use proxy to reach tor hidden services (default: same as -proxy)
  * `-dns`                   Allow DNS lookups for `-addnode`, `-seednode` and `-connect`
  * `-port=<port>`           Listen for connections on `<port>` (default: 32749 or testnet: 32748)
  * `-maxconnections=<n>`    Maintain at most `<n>` connections to peers (default: 125)
  * `-maxoutboundconnections=<n>` Maximum number of outbound connections (default: 8)
  * `-addnode=<ip>`          Add a node to connect to and attempt to keep the connection open
  * `-connect=<ip>`          Connect only to the specified node(s)
  * `-seednode=<ip>`         Connect to a node to retrieve peer addresses, and disconnect
  * `-externalip=<ip>`       Specify your own public address
  * `-onlynet=<net>`         Only connect to nodes in network `<net>` (IPv4, IPv6 or Tor)
  * `-discover`              Discover own IP address (default: 1 when listening and no -externalip)
  * `-listen`                Accept connections from outside (default: 1 if no -proxy or -connect)
  * `-bind=<addr>`           Bind to given address. Use [host]:port notation for IPv6
  * `-dnsseed`               Find peers using DNS lookup (default: 1)
  * `-synctime`              Sync time with other nodes. Disable if time on your system is precise e.g. syncing with NTP (default: 1)
  * `-banscore=<n>`          Threshold for disconnecting misbehaving peers (default: 100)
  * `-bantime=<n>`           Number of seconds to keep misbehaving peers from reconnecting (default: 86400)
  * `-maxreceivebuffer=<n>`  Maximum per-connection receive buffer, `<n>`*1000 bytes (default: 5000)
  * `-maxsendbuffer=<n>`     Maximum per-connection send buffer, `<n>`*1000 bytes (default: 1000)
  * `-upnp`                  Use UPnP to map the listening port (default: 0)
  * `-paytxfee=<amt>`        Fee per KB to add to transactions you send
  * `-mininput=<amt>`        When creating transactions, ignore inputs with value less than this (default: 0.01)
  * `-daemon`                Run in the background as a daemon and accept commands
  * `-testnet`              Use the [test network](testnet "wikilink")
  * `-debug`                Output extra debugging information.
  * `-logtimestamps`        Prepend debug output with timestamp
  * `-shrinkdebugfile`      Shrink debug.log file on client startup (default: 1 when no -debug)
  * `-printtoconsole`       Send trace/debug info to console instead of debug.log file
  * `-rpcuser=<user>`       Username for [JSON-RPC](rpc "wikilink") connections
  * `-rpcpassword=<pw>`     Password for JSON-RPC connections
  * `-rpcport=<port>`       Listen for JSON-RPC connections on `<port>` (default: 15715 or testnet: 25715)
  * `-rpcallowip=<ip>`      Allow JSON-RPC connections from specified IP address
  * `-rpcconnect=<ip>`      Send commands to node running on `<ip>` (default: 127.0.0.1)
  * `-rpcthreads=<n>`       Set the number of threads to service RPC calls (default: 4)
  * `-blocknotify=<cmd>`    Execute command when the best block changes (%s in cmd is replaced by block hash)
  * `-walletnotify=<cmd>`   Execute command when a wallet transaction changes (%s in cmd is replaced by TxID)
  * `-confchange`           Require a confirmations for change (default: 0)
  * `-enforcecanonical`     Enforce transaction scripts to use canonical PUSH operators (default: 1)
  * `-alertnotify=<cmd>`    Execute command when a relevant alert is received (%s in cmd is replaced by message)
  * `-upgradewallet`        Upgrade wallet to latest format
  * `-keypool=<n>`          Set key pool size to `<n>` (default: 100)
  * `-rescan`               Rescan the block chain for missing wallet transactions
  * `-salvagewallet`        Attempt to recover private keys from a corrupt wallet.dat
  * `-zapwallettxes`        Delete all wallet transactions and only recover those parts of the blockchain through `-rescan` on startup
  * `-checkblocks=<n>`      How many blocks to check at startup (default: 2500, 0 = all)
  * `-checklevel=<n>`       How thorough the block verification is (0-6, default: 1)
  * `-loadblock=<file>`     Imports blocks from external blk000?.dat file
  * ~~`-walletbackupinterval=<n>`    Optional: Create a wallet backup every `<n>` blocks. Zero disables backups~~ deprecated
  * `-walletbackupintervalsecs=<n>`Optional: Create a wallet backup every `<n>` seconds. Zero disables backups (default: 86400)

## Block creation options:
  * `-blockminsize=<n>`     Set minimum block size in bytes (default: 0)
  * `-blockmaxsize=<n>`     Set maximum block size in bytes (default: 250000)
  * `-blockprioritysize=<n>`Set maximum size of high-priority/low-fee transactions in bytes (default: 27000)

## Research reward system options:
  * `-email=<email>`        Email address to use for CPID detection. Must match your BOINC account email
  * `-boincdatadir=<path>`  Path to the BOINC data directory for CPID detection when the BOINC client uses a non-default directory
  * `-forcecpid=<cpid>`     Override automatic CPID detection with the specified CPID
  * `-investor`             Disable CPID detection and do not participate in the research reward system
  * `-pooloperator`         Skip pool CPID checks for staking nodes run by pool administrators

## SSL options: 
Note that **using SSL for RPC is not recommended**. It is discouraged because
it implies that it can be used over unsafe connections. RPC with SSL
is still not safe over the broader internet or any other unsafe connection 

If you still have some application that is not like that, see the old version of the 
[Bitcoin Wiki for SSL setup instructions](https://en.bitcoin.it/w/index.php?title=Enabling_SSL_on_original_client_daemon&oldid=33159)

  * `-rpcssl`                                 Use OpenSSL (https) for JSON-RPC connections
  * `-rpcsslcertificatechainfile=<file.cert>` Server certificate file (default: server.cert)
  * `-rpcsslprivatekeyfile=<file.pem>`        Server private key (default: server.pem)
  * `-rpcsslciphers=<ciphers>`                Acceptable ciphers (default: TLSv1.2+HIGH:TLSv1+HIGH:!SSLv2:!aNULL:!eNULL:!3DES:@STRENGTH)

## Update/Snapshot options:
Snapshot options are mostly for users running the headless version of the wallet 
so they can use the built in snapshot tool too. Update options are for both headless
and GUI users

  * `-snapshotdownload`           Download and apply latest snapshot
  * `-snapshoturl=<url>`          Optional: Specify url of snapshot.zip file (ex: https://sub.domain.com/location/snapshot.zip)
  * `-snapshotsha256url=<url>`    Optional: Specify url of snapshot.sha256 file (ex: https://sub.domain.com/location/snapshot.sha256)
  * `-disableupdatecheck`         Optional: Disable update checks by wallet
  * `-updatecheckinterval=<hours>`Optional: Specify custom update interval checks in hours (Default: 120 hours (minimum 1 hour))
  * `-updatecheckurl=<url>`       Optional: Specify url of update version checks (ex: https://sub.domain.com/location/latest
