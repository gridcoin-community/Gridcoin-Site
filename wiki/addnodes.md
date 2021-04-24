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

You can also add the node with the command: `addnode <node> <add|remove|onetry>` 
in the debug console.

You shouldn't need to add them manually as a few are hardcoded into the wallet.


## List Of Addnodes

Tables with a list of addnodes, their domain name, and their region. See [cycy's hourly updating list](https://addnode.cycy.me)
if you want another source of addnodes. The status on this wiki page is not updated frequently.


### Mainnet

List of addnodes for the main network. This is the one you most likely care about

------------

#### Default
These are included in the default config. 

| Node | Region |
|-|-|
| addnode=addnode-us-central.cycy.me | US-central |
| addnode=ec2-3-81-39-58.compute-1.amazonaws.com | US-east |
| addnode=gridcoin.crypto.fans | Unknown |
| gridcoin.ddns.net | UK |
| london.grcnode.co.uk | UK |
| seeds.gridcoin.ifoggz-network.xyz | Canada |
| seed.gridcoin.pl | Europe |
| www.grcpool.com | US-east |


#### Online (connected within the last 24 hours)

| Node | Region |
|----|-----|
| grcnode.tahvok.com                      | Germany |
| grcnode.thefoxie.eu                     | Germany |
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

------------

#### Online (connected within the last 24 hours)

| Node | Region |
| ---- | ------ |
| gridcoin.ddns.net                       | UK |
| gridhost.ddns.net                       | UK |
| swe.tplinkdns.com                       | Sweden |
| tarmoilves.eu                           | Estonia |

------------

#### Unreachable (offline or reached max connections)

| Node | Region |
| ---- | ------ |
| gridcoin.network                        | France |
| ormgas.com                              | Sweden |
| testnet.dihelix.com                     | US |
| vancouver01.gridcoin.ifoggz-network.xyz | Canada |
