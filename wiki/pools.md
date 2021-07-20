---
title: Gridcoin Pools
layout: wiki
description: Information about how Pools work in Gridcoin
---

# Introduction

Pools are a way to make crunching easier to start. Their main goal is to make
it so that users don't need to have any Gridcoin to earn rewards for BOINC. 

# How it Works

Everyone on the pool uses the pool account(s)[^1], so they are all crunching as
if the pool was a single user. When the pool [stakes](staking "wikilink"), it earns all those
rewards and distributes it out to all the users based on how much they
contributed to it.

# Downsides to Using a Pool

Using a pool is much more centralized than solo crunching. It relies on the pool
operator to distribute out all your rewards. Meanwhile Solo crunching does not rely on
any one person/group to send you your rewards --- it is all done through the network

# Differences to Other Cryptocurrencies

## Difference to PoW Pools

Gridcoin pools are unlike Proof of Work pools in that the work being done
by users in [BOINC](boinc "wikilink") doesn't directly impact block production. 
It only changes the payout when the pool stakes. This also means that pools
have much less direct influence over the blockchain than in other cryptocurrencies

## Difference to Other PoS Staking Pools

Unlike Proof of Stake pools, no one sends any coins to the pool for it to stake.
While a pool like this could still work in Gridcoin, this is not how the main pools[^2]
run. The current pools acquired enough Gridcoin to stake at a reasonable rate 
before they started operating as their main purpose is sending out BOINC
rewards

It is worth noting that there would be limited benefit in trying to create 
a staking pool in Gridcoin without doing any work in BOINC. The reward for 
just staking is 10 Gridcoin per stake which becomes rather small when spread
across many users. 


# More Information

## Open Source Pools

Gridcoinpool.ru is open source ([repository here](https://github.com/sau412/arikado_gridcoin_pool)) 
and grcpool has part of its older source code available ([repository here](https://github.com/gridcoin-community/PHP-Pool))

## Other Technical Details of Operation

The operator of gridcoinpool.ru wrote a series of articles detailing much of the
more technical details of how pools operate

* ["How Gridcoin pools work (if you want to write or own yours)"](https://steemit.com/gridcoin/@sau412/how-gridcoin-pool-works-if-you-want-to-write-or-own-yours)
* ["How to install PHP-Pool"](https://steemit.com/gridcoin/@sau412/how-to-install-php-pool)
* ["Project introduction for Arikado Gridcoin pool"](https://steemit.com/utopian-io/@sau412/project-introduction-for-arikado-gridcoin-pool)

# Footnotes

[^1]: Some pools like grcpool technically have a couple of accounts, but the main idea is the same
[^2]: Technically one place (the Gridcoin Discord Wallet Bot) does sort of act as more traditional staking pool, but that is secondary to its main purpose 