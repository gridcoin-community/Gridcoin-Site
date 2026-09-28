---
title: Gridcoin Addnodes
layout: wiki
redirect_from:
  - "/Wiki/Addnodes"
---


# Gridcoin addnodes
## Background
Addnodes are nodes (wallets) that your wallet will try to connect to when it
starts up. Adding more can help if you have a low connection count because it
will get more chances to find other nodes

You can add these into your config file with `addnode=ADDNODE`. 
See the [config file](config-file "wikilink") page about how to change your config

**Make sure you have at least a few addnodes in your config or you won't be able to connect to the network.**

You can also add the node with the command: `addnode <node> <add|remove|onetry>` 
in the debug console.


## List Of Addnodes

Tables with a list of addnodes, and their region. 

The status on this wiki page is not updated frequently.


### Mainnet

List of addnodes for the main network. These are the ones you most likely care about.

See [gridcat's auto-updating list](https://addnodes.gridcoin.club/), regenerated every 15 minutes, for a more up to date status.

------------

#### Default
These are included in the default config, but if you leave them out of the config, it will not connect to these addnodes 

| Node | Region |
|-|-|
| ec2-3-81-39-58.compute-1.amazonaws.com | US-east |
| gridcoin.network | France |
| seeds.gridcoin.ifoggz-network.xyz | Canada |
| seed.gridcoin.pl | Europe |
| www.grcpool.com | US-east |

Note: the wallet also writes `addnode=addnode-us-central.cycy.me` into a newly
generated config file. That node is no longer reachable, so you can safely
delete the line.


#### Online (connected within the last 24 hours)

| Node | Region |
|----|-----|
| grcnode.tahvok.com                      | Germany |
| grcnode.thefoxie.eu                     | Germany |
| grc.leftist.eu                          | Germany |
| gridcoin.network                        | France |
| gridhost.ddns.net                       | UK |
| node.gridcoin.network                   | France |
| swe.tplinkdns.com                       | Sweden |
| tarmoilves.eu                           | Estonia |
| vancouver01.gridcoin.ifoggz-network.xyz | Canada |

------------

#### Unreachable (offline or reached max connections)

| Node | Region |    
| ---- | ------ |
| grcmagnitude.com                        | Unknown |
| gridcoin.asia                           | Unknown |
| gridcoin.bunnyfeet.fi                   | US-west |
| gridcoin.certic.info                    | UK |
| gridcoin.hopto.org                      | Germany |
| gridcoins.org                           | UK |
| node1.chick3nman.com                    | US-central |
| nuad.de                                 | Germany |
| seattle.grcnode.deluxe-host.net         | US-west |

------------

### Testnet

List of addnodes for the [test network](testnet "wikilink")

[gridcat's auto-updating list](https://addnodes.gridcoin.club/testnet.txt), regenerated every 15 minutes.

------------

#### Online (connected within the last 24 hours)

| Node | Region |
| ---- | ------ |
| ec2-3-81-39-58.compute-1.amazonaws.com  | US-east |
| gridhost.ddns.net                       | UK |
| ormgas.com                              | Sweden |
| swe.tplinkdns.com                       | Sweden |
| tarmoilves.eu                           | Estonia |

------------

#### Unreachable (offline or reached max connections)

| Node | Region |
| ---- | ------ |
| gridcoin.ddns.net                       | UK |
| gridcoin.network                        | France |
| test.grcpool.com                        | US-east |
| testnet.dihelix.com                     | US |
| vancouver01.gridcoin.ifoggz-network.xyz | Canada |
