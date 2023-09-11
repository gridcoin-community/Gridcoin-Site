---
title: Forks
layout: wiki
description: Information about what forks are, the different types of forks and more
---

# Introduction

Forks occur when one blockchain splits into two for some amount of time because parts of the network 
splits on which blocks follow at a point on the blockchain. See [the diagram below](#diagram-explanation "wikilink") 
for a more intuitive description.

There are three main types of forks: [temporary forks](#temporary-forks "wikilink"), 
[hard forks](#hard-forks "wikilink"), and [soft forks](#soft-forks "wikilink"). 
Each are described in more detail in their own section, but here's an overview:


Temporary forks happen by accident, but are automatically resolved by your wallet finding the better chain.
Hard forks are protocol level changes meaning it cannot be resolved without users
on the network upgrading their wallet. Soft forks are like a hard fork, but only
restrict existing rules and don't add their own meaning that existing wallets
can still get on the right chain, but they can create blocks rejected by the newly updated
wallets

## Diagram Explanation

![diagram showing a chain of blocks on the top labeled original chain with a split and a second chain at the bottom labeled forked chain](/assets/img/wiki/fork-diagram.svg){: class="img-fluid w-100"}

*May be harder to see on mobile, so the top chain is labeled "original chain" and the bottom is "forked chain". Each square is labeled "block"*
{% comment %}The {: class="img-fluid w-100"} makes it a full width image that scales with screen size{% endcomment %}
---
# Temporary Forks

## Summary

Temporary forks (sometimes called accidental forks) are the most common type of fork. 
They almost always happen by accident, but are resolved by your wallet automatically. 
They usually don't last long

## How They Happen

One way they can happen is if two people stake at the same time. The network
will split temporarily until one of the chains wins out. 
If you've ever seen a stake appear and quickly disappear, this is likely what happened --- the stake
was on a fork and never actually existed on the the real chain

## How Your Wallet Resolves It

The wallet sees that two chains exist, but it will notice that one of the chains 
has higher difficulty (more coins [staking](staking "wikilink")) and length and switch to that chain if it's not already on it. 
One chain will get higher difficulty and length because the network will not be evenly split between the chains. 
Since every wallet can agree on the difficulty and length of the two chains, every wallet will get on the same chain eventually.

## How It Relates to Confirmations

Confirmations are the number of blocks created after a transaction went into a block.
When you send a transaction, you may have noticed that some places require a certain
number of confirmations or that your wallet waits before calling a transaction 
confirmed. 

The reason for doing this is that you can be more sure that the transaction
wasn't made only on a fork. If it was, your wallet likely would've found
the main chain by then. 

While most regular transactions can be sent and go onto both chains, there is
no guarantee. You may for instance be trying to spend coins generated only 
on that fork.


# Hard Forks

## Summary

Hard Forks are almost always intentional.[^1]Hard forks are what happen when there 
are protocol level changes that are irreconcilable with the previous version of the wallet. 
The old wallets will reject the blocks after a hardfork from the newer version of 
the wallet because the new wallets are using features not allowed in the older version.

## Relation to Mandatory Upgrades

In short, Mandatory versions are Mandatory because they create Hardforks. The approximate
date (and the exact block) given to upgrade by is when the hardfork will occur. 
If you don't upgrade to a mandatory version, you will get off the main chain from
everyone else that has upgraded and your wallet cannot fix this automatically for you.

## How to Get Off a Fork If You Don't Upgrade

If you don't upgrade before it happens, your wallet will fork and get off the main
chain. To get back on the main chain first try upgrading to the latest
version of the wallet and starting the wallet back up. If the hardfork was recent
or if your wallet has been offline since before the hardfork, your wallet might
be able to correct it itself. If it was a while ago or the wallet has not been
able to correct itself after running for a while, you may need to either sync 
from zero


# Soft Forks

Soft forks are like hardforks in the sense that it's a protocol change, but 
instead of adding features, they only remove some. This means an older wallet 
can still get in sync, but if an older wallet tries to make a block using those 
removed features, it will fork since the new wallets will reject it. 

Soft forks are not as common as hardforks in most cryptocurrencies and certainly 
in Gridcoin 


# Other Notes

## Different from Software Forks

Blockchain forks are a separate concept from Software forks. Software forks
are when the code is used and modified from another project. Gridcoin is
a software fork of Peercoin which is a software fork of Bitcoin Core, but all are 
entirely separate and unrelated blockchains that share 0 blocks in common

# Footnotes

[^1]: There have been instances of accidental hardfork in other cryptocurrencies [like in 2013 with Bitcoin due to a bug](https://github.com/bitcoin/bips/blob/master/bip-0050.mediawiki), but things like this are very rare
