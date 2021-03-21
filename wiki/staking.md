---
title: Staking
layout: wiki
---

# Introduction
Staking is what gives out rewards and is what makes new [blocks](#blocks "wikilink") on Gridcoin.
When someone stakes, they make a new block and they get rewarded for it. 

Staking is all based on probability. The more Gridcoin you have, the more 
likely you are to stake. This can often be frustrating to many, but it is unavoidable
without creating a system that is extremely insecure


The name stake/staking comes from [Proof of Stake](https://www.investopedia.com/terms/p/proof-stake-pos.asp) 
which is the system that Gridcoin uses to reduce the amount of energy that goes 
into running the Gridcoin network. The aim is to put more instead into science.

## Staking Rewards
When you stake, you receive newly minted coins. You 
get 10 GRC + [research rewards](#research-rewards "wikilink"). If you are a solo 
cruncher, rewards from research are added on top. Pool cruncher (see [the pool](#the-pools "wikilink") section) and non-crunchers 
will only get 10 GRC when they stake. This 10 GRC is always there (called 
constant block rewards or CBR). This is to incentivize people to stake because 
more people staking helps increase the security of the network. 

Previously (below v4.0.0.0) Gridcoin used a percentage based system, 
but lower difficulty (low number of people staking) which caused
a fair number of issues. See the [More Reading](#more-reading "wikilink") section
for info about when this changed

## How To Stake
If you are using the GUI, look for the ![Green Up Arrow Icon](/assets/img/wiki/staking_on.svg)
icon to see if you are staking. If instead you see a different colored down arrow,
hover over to see why it says you are not staking. Make sure you keep seeing this
and just leave your wallet running --- your wallet will keep attempting to stake

You need to keep your wallet running to stake because every 16 seconds, your wallet 
will look to see if you "won a coin flip" of sorts to see if it can stake. If you do, your 
wallet will craft a block and send it out along with proof that you "won". You
also need to leave the wallet unlocked if you encrypted it so that it can send out 
a block and let you earn rewards. 


## Odds of Staking
Your odds of staking are based only on the number of coins you have and how many coins
other people on the network have that are trying to stake (called difficulty).
The amount of research you've done will only affect your reward --- not your odds
of staking. 

To see your odds, hover over the ![Green Up Arrow Icon](/assets/img/wiki/staking_on.svg) icon.
You will see an estimate for how frequently you are likely to stake. Unfortunately
since staking is probability based, your actual time to stake can vary more or less time than what's shown.

*Caveats*

1) If you don't run your wallet 24/7 or close to it, this will make you less likely
to stake. It's like doing fewer coin flips --- you are going to get less 
chances for the result you want

2) Cooldowns will change your odds of staking for the 16 hours they are active because
fewer of your coins are able to stake. The wallet takes this into account in its prediction


## Cooldown

After staking or moving some of your coins around, those coins will go on a 16
hour cooldown where they won't be able to stake.

### Stakesplit
If you see a lot of coins on cooldown frequently, try using adding `enablestakesplit=1`
in your wallet's config file and then restarting. This will split up large [UTXOs](#utxos "wikilink")
when they stake to reduce the amount of coins on cooldown. See the 
[config file](config-file "wikilink") wiki page for more details about how to configure this

### Common Misconceptions
Putting things into one large UTXO won't increase your odds
of staking. This will only hurt things for staking. Putting it into smaller UTXOs
will increase efficiency because when you stake a smaller amount will go on a cooldown. 
The main reason you might want to put things into larger UTXOs is to reduce fees when
you try to make transaction in certain situations --- not staking.

When none of your coins are on cooldown, how large/small your UTXOs are will not 
change your odds of staking.


## The Pools
If you are a pool miner, you might be wondering how you get your research rewards.
The answer is that the pool stakes for you. When you crunch you do so on the
pool's account.  The idea of the pool is that they have a large balance and so 
they can stake more frequently than you can. They then calculate what percentage 
of the reward you contributed to and send you back your percentage of the reward. 

Note: As a pool cruncher, you can also stake separately on what you've received 
from the pool. You will only earn 10 GRC when you stake since the Gridcoin network 
doesn't actually know that you contributed to a pool.


---
## More Reading
More technical information about staking can be found in the [staking blue paper](/assets/img/grc-bluepaper-section-1.pdf "sitelink").
This goes into much further details of the statistics involved and more.


The reward amounts currently used were chosen through a poll titled ["Constant Block Reward (cbr) Proposal And Poll"](http://main.gridcoinstats.eu/poll/22c2ee5e0c049ce93acc6f40d0430f6335367da1c3f61c66d211863cb346600d/1/ended:2). 
The 75/25 option was chosen meaning a 75% to 25% split of new coins between crunchers and non-crunchers respectively.
If you would like an in depth reading about the economics of it see either the 
[reddit](https://www.reddit.com/r/gridcoin/comments/8bcrlz/constant_block_reward_cbr_value_proposal_and_poll/), [github](https://github.com/gridcoin-community/economics/issues/1), or [steem](https://steemit.com/gridcoin/@jringo/constant-block-reward-cbr-value-proposal-and-poll) thread. This went into
effect on version 4.0.0.0 after a hard fork (see [this reddit post for more information](https://www.reddit.com/r/gridcoin/comments/9pgg7m/gridcoin_mandatory_update_4000_released_cbr/) for details)

---
## Definitions

List of some definitions of things that are useful to know

### Blocks
Blocks are what store transaction. They help give an order to when transactions 
happen letting your wallet agree with others that a transaction happened on 
block X. 

### Research Rewards
The amount you have earned from doing work on BOINC with your computer

### UTXOs
UTXOs (unspent transaction output) are what's leftover from a transaction you 
received. Gridcoin and many other cryptocurrencies base most of how they operate
on UTXOs under the hood. Under the hood staking looks at UTXOs