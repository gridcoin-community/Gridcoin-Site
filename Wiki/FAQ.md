---
title: FAQ
layout: wiki
---

# Frequently Asked Questions

You will see a lot of references to the data folder in this FAQ here are the default locations:
| Windows | Linux | MacOS |
|-|-|-|
| `%appdata%/GridcoinResearch` | `~/.GridcoinResearch` | `~/Library/Application Support/GridcoinResearch` |

# Gridcoin & Science

## Why is Gridcoin (GRC) special?

Almost all of your computing power can be directed at beneficial scientific and medical
research while crunching Gridcoin.

See the list of [Advantages &
Features](Advantages_&_Features "wikilink").

## How could 'useful' work for a cryptocurrency be verified without repeating the work or trusting a central server?

In Gridcoin, work units are given out by distributed project nodes
within the BOINC network which uses their independent calculation to
reward research. Gridcoin compares participants in each project by their
subsidiary credits earned in BOINC to measure performance in relation to
dynamic inner project network average.

BOINC has been rewarding scientific work units in a credit system since
2003. In case a project maintainer maliciously decides to give out more
credits than appropriate, it only affects the inner project competition.
The maximum share of new Gridcoins for this project stays the same
percentage (subject to the number of total projects). And projects can be
removed by a blockchain vote.

Security in Gridcoin is derived from Blackcoin's industry-leading
Proof-of-Stake.

# Crunching (Research & Mining Equivalent)

## How do I start crunching?

First, [Get some coins](Get_some_coins "wikilink"), then see [Mining
setup](Mining-Setup "wikilink").

## My CPID is not in the network, What do I do?

If you are in the pool, this is normal. If you are attempting to
solo-stake, go through the following:

If you have just begun your BOINC journey it is quite possible your work
units haven't been verified by the necessary servers. Don't Panic,
Gridcoin is a game of patience. Just relax, take a day or two, and see
if the problem persists. If so, proceed to the following steps.

To ensure your wallet is fully unlocked, lock your wallet with a
passphrase (make it LONG, a password manager like KeePass is
recommended) and then unlock it with "for staking only" UNticked.

Next, go to Help -\> Debug Window, go to the Console tab and type
`advertisebeacon` without the quotes.

This will (if successful) send a small transaction at the cost of
1 GRC. This should add your CPID with the next superblock.

To see if your CPID is included, go to the Console and type `beaconreport`. 

If your CPID is not included, wait for the next superblock. In case your
CPID isn't included after a few superblocks, try resending your beacon
(`advertisebeacon`).

Lock your wallet again, but this time unlock it with "for staking only"
ticked.

## How long does it take to start receiving Research (Crunching) credit?

This depends on several factors. You must have some coins, to begin with, the general recommendation currently is around 5000 (at the time of writing this that would stake on average about once a month). You must send a "beacon",
this is how your information is populated into the Network which
controls payments, see [Mining setup](Mining-Setup "wikilink"). You must
have over 100 RAC on at least 1 whitelisted BOINC project before you can
send a beacon to receive Research credit. After your CPID is in the
Network, all research credits you earn will accrue in a "savings
account" for a rolling 14 day period. You have up to 2 full weeks to
stake a block without losing any research credit
earned.

## What should I put in my config-file for Gridcoin-Research?

Please check [the config file page](Config-File "wikilink")

## How can I tell if I've mined a block?

If you are using the GUI you will see a transaction with a gold icon. 

You can also lookup your address on a block explorer.

## Reward calculation: what is RAC?

<https://en.wikipedia.org/wiki/BOINC_Credit_System#Recent_average_credit>

## Reward calculation: what is magnitude?

Magnitude is calculated separately for each project. When calculating research rewards, a user's magnitude across every project is added together.

## I had a magnitude for some time but it dropped to 0. What happened?

The reason for this is most likely that you have to resend your beacon,
which should be done every 6 months. For this either unlock your wallet
so that it sends automatically or type `advertisebeacon` in the
console.

## I am BOINCing nonstop but my magnitude is very low. What can I do?

RAC is a rolling average over the past month. It is weighted to increase the value of more recent contributions. Gridcoin relies on the RAC values provided by the project to calculate your magnitude. 

However, you can't just compare your RAC between projects because different projects use different systems for how they calculate the RAC. Because of this the magnitude calculation also takes into account the total RAC for other crunchers earning Gridcoin.

Depending on your hardware you may want to keep away from some projects.

You can see estimated magnitude levels for your hardware here: http://quickmag.ml/cgi-bin/script.cgi

Unfortunately, data for some whitelisted projects like WCG are not available so they won't be included in the estimate.

There are also overrun CPU projects or projects that do not provide
constant work unit (WU) flow.

Try different projects and see whether your hardware can keep up a high
magnitude. You can review your outcome magnitude in the wallet.

Anyway, if you like a project you should still support it, to keep the BOINC
spirit up.

Additionally, you might want to re-visit the projects you contribute to,
you don't want to contribute CPU power to a project that allows GPUs its
like trying to mine Bitcoin with your PC, you are competing with the
wrong equipment. You might start by visiting the [BOINC project list](https://boinc.berkeley.edu/projects.php) and make sure you
aren't using your CPU for projects that have the Radeon or Nvidia icon.

# Pool Crunching

## Is it possible to join a pool?

Yes, there are currently 2 operational pools:
* [GRCPool](https://grcpool.com/)
* [Arikado Pool](https://grc.arikado.ru/)

## I am crunching for the pool but the wallet still shows INVESTOR and 0 magnitude. Is that ok?

That is perfectly normal when pool-mining you do work for the pool's
account and as a reward get transactions from the pool for the work you
did. Because of this you do not work for your own CPID and have no
magnitude.

## I am crunching for the pool but even though I work on projects this is not shown on the profile page of the pool. What can I do?

Make sure you remove all existing projects, which use your account, from the BOINC manager before
syncing to the pool. 

# Staking

## How is the amount of stake-reward calculated?

Proof of Stake rewards will give you 10 GRC for each block you stake. If you are not in investor mode you will also receive your BOINC rewards on top of the 10 in the same block.

## The wallet says "Not Staking because you don't have mature coins", how long does it take for coins to mature?

It takes 16 hours for GRC to become mature from the time of
arrival in your wallet. After a specific set of coins have Staked, they
will need to mature again for 16 hours before they can Stake again.

## Why can't I send coins in my wallet balance?

You may have a balance reserved in stake. If this ever happens to you do
this in the console:

`reservebalance true AMOUNT`

Where AMOUNT is the amount you want to send

Wait for a few blocks

Then send
it.

## When I get an interest/mining payment, a portion of my GRC looks to be moving from my total balance into the "Stake" line of the wallet balance. Is that correct?

Yes. It means that those coins are currently on cooldown so they aren't able to stake for the next 16 hours.

## I lose my stakeweight after receiving PoR? The "maturecoin-creationprocess" is starting again after each mined PoR?

Yes that is normal because your node builds up a set of stakeable coins
and once you stake them the process takes about 4 more hours to get new
mature coins, unless some have been found in between (it's a constant
process).

## Can I stake with an encrypted wallet?

Yes, but you have to unlock it first. It's recommended to unlock it "for
staking only".

The console walletpassphrase command does what clicking the lock button
does.

To lock Type

`walletlock`

to unlock for a certain time type

`walletpassphrase PASSWORD TIMEOUT`

to unlock type

`walletpassphrase PASSWORD`

to unlock only for staking type

`walletpassphrase PASSWORD TIMEOUT true`

## How do you turn staking on and off?

`walletpassphrase "your passphrase in double quotes" timeout true`

where timeout is the number of seconds, e.g. 10000 and true is a toggle
that unlocks the wallet for staking
only.

## What happens if I stake on a fork?

When you stake on a fork, the stake you see is not actually legitimate. When your wallet figures out that it is on a fork, you will see these rewards disappear as the wallet corrects itself. This process happens automatically. While frustrating, once off of the fork, you are still able to stake again. 

# BOINC

## Choosing BOINC projects: In BOINC, is there still a defined whitelist of "projects" or can we use any project now that has Gridcoin as a Team Name?

Running "projects" in the console will list all the whitelisted
projects you could possibly contribute to that would help your Gridcoin
Research
wallet.

## If it says "non participating project" does that mean that they aren't accepted for Gridcoin purposes?

That means you aren't participating in those projects or the e-mail
address you have in the conf file doesn't match the e-mail address used
in your BOINC manager on that machine. For every project you join, you
also have to join the Gridcoin team on that project. Any changes about
e-mail address on a project or team membership on a project take around
a day to
propagate.

## I use BOINC with one username but on a few machines - is it enough to have one wallet with the proper boinc\_project\_email address, or do I have to have a separate wallet on each machine?

You only need one wallet for each BOINC account/CPID (Cross Project
Identifier). You can use an account manager to combine more
projects in one CPID. Your reward is
based on the credit on your CPID. You can point as many
machines and resources to a single account as you want and only need a
single wallet to receive your reward. You do have to set "email=" in the
config file to your BOINC email and must be running the wallet on a
machine that has BOINC installed and is associated with all BOINC
projects you would like to get credit for (they can be set to not
retrieve new work) and each project must show at least some RAC on that
machine (press "Update" in the BOINC software when a project which shows
0 contribution is
selected).

## Instead of discussing every single BOINC project to be added, is there any shared guidelines to be used for accepting or rejecting them?

https://github.com/gridcoin-community/Gridcoin-Tasks/issues/227

## How do I delete a project from my list of CPIDs?

We used to support detaching but a vote was made to calculate the magnitude
on every project you still have valid RAC on; so GRC does not support
detaching projects (it was supposed to prevent gaming the system). There
is no difference if you score 0 on a project, as all are taken into
account equally.

If you insist on not being paid for a specific project, change your team
away from a recognised team for that project.

# Status

## How can I see my Researching Status?

If you have some BOINC credits, you are in a recognised team and your email
is correct in the gridcoinresearch.conf file. You should see a list of

your magnitude in each project when entering "*explainmagnitude*" to
the debug console of the wallet (Help -\> Debug Window -\> Console). It
may take 24-48 hours for new accounts to be populated.

## What does "diff" exactly measure? What does it tell if it's high or low?

A staking hash that is generated that is LESS than the target will stake. So the smaller the target (higher the diff) the LOWER the probability of staking. 

This also means that diff is directly proportional to that average net coins staking on the network.

TL;DR:
When more coins are staking the difficulty increases which makes it harder to stake and vice versa.

The formulas to calculate diff may be found in section 2.1 of the [bluepaper](https://www.gridcoin.world/GRC_V8_Bluepaper_ETTS%20final.pdf).

## How to call commands when starting Gridcoin Wallet on Windows?

Create a shortcut that links to the actual GRC program in Program Files
directory and add the function at the end of the target, then properly
name them for the function to execute:

Example with -rescan option: Make a new shortcut to 
`"C:\Program Files\GridcoinResearch\gridcoinresearch.exe"`

Add the command to execute at the end of the 'Target:' line like
`"C:\Program Files\GridcoinResearch\gridcoinresearch.exe" -rescan`

Rename the shortcut to something like 'GRC rescan'.

Then go to Advanced and tick on run as Administrator.

From now on when you double click on it, it will execute that Command
Line function.

This way it is simpler and faster for newbies than CLI and
batch.

## How could I check whether my local block is the same as on an explorer?

After you double click on the tx in the list, write down the block
number (not hash).

Then do

showblock blocknumber

And compare the details with details from explorer.

If you do want to get a block by hash, you would have
to:

getblockhash blocknumber

getblock blockhash

But that is a little longer

# Upgrade

## How do I upgrade the Gridcoin wallet client?

Download the installer from [Github](https://github.com/gridcoin-community/Gridcoin-Research/releases) or your package manager and install over your previous installation.

**Do not delete the data folder.** This contains important data like your keys which let you access your coins.

# Backup

## What can I do if I didn't save a prior version of wallet.dat?

The wallet has an automated backup in place that will make backups every 24 hours into the walletbackups folder inside of your data folder.

## Which is the best practice to save my new wallet?

Different methods were discussed in the Gridcoin Community Classroom
\#003: <https://www.youtube.com/watch?v=JxrjUwX5XvA>

ref:
<https://cryptocurrencytalk.com/topic/1331-new-coin-launch-announcement-grc-gridcoin/?view=findpost&p=158422>

## How to compress my wallet getting rid of orphans?

The quick and easy way.

1.  Close your client and rename wallet.dat to wallet.bak
2.  Start client. Once started, click receive coins and see your 1st
    address and copy the address down.
3.  Close client and rename wallet.dat to somethingelse.bak
4.  Rename wallet.bak to wallet.dat
5.  Start the client and send all coins to the address you copied down in step 2.
6.  Make sure you get at least 10 confirmation for the transaction.
7.  Close client and rename wallet.dat to wallet.bak and rename
    somethingelse.bak to wallet.dat
8.  Start the client and enjoy your new wallet.

## What should I do to recover an old backup of my wallet?

1. Backup wallet.dat.
2. Look for the walletbackups folder.
3. Find the most recent backup.
4. Shutdown the wallet
5. Copy it to the the data directory and rename it to wallet.dat.
6. Restart the wallet.

If it still doesn't start you can try using the -salvagewallet flag.

# Sync

## I have lots of connections, but synchronizing stopped at a certain block. What should I do?

Try this:

1.  Close the client
2.  Clean out your Gridcoin data folder EXCEPT for wallet.dat, your
    GridcoinResearch.conf file and the folders walletbackups and testnet, if present.
3.  You can also get the snapshot [Here](http://download.gridcoin.us/download/downloadstake/signed/snapshot.zip)
    and extract it to the Gridcoin data folder.

There is also an [official
thread](https://cryptocointalk.com/topic/20303-gridcoin-proof-of-research-connection-sync-problem-thread/)
for sync problem if it didn't work.

You can also try running the wallet as an administrator.

## How could I test whether I am in sync with the network?

Compare your highest block number with the one listed at
[gridcoinstats.eu](https://gridcoinstats.eu/block)

When the explorer is clearly ahead of you (\> 9 blocks) and increasing
about every 90 seconds, your node is most likely on the fork. You can
wait till it syncs or rebuild the blockchain.

When you are clearly ahead of the explorer and / or the explorer has
stopped incrementing on a regular basis, it's more likely that the
explorer will sync up with you and your connected nodes at some point.

## How do I get in sync fast?

Ensure you are running the latest wallet version.

You can try using the snapshot which you can get [Here](http://download.gridcoin.us/download/downloadstake/signed/snapshot.zip).

While it downloads, delete the peers.dat in your data folder - you may have a bad peer group.

You can also try to reboot your router to attempt to get a new IP, to make sure
you are not banned by good nodes because of earlier behavior.

## I can't get connections. How can I test whether the net is down or my node is misconfigured?

First, install telnet for your respective os.

Then open your command box and enter `telnet addnode-us-central.cycy.me 32749`. If there is no response, your Firewall might have blocked the
port. Otherwise, your configuration might be wrong or your node may have been
temporarily banned by the
network.

## When syncing from zero, the sync gets stuck or pauses for an untimely duration. What to do next?

Make sure you're on the latest wallet version.

Syncing may seem to take longer with growing blockchain. If you get
stuck use 'reboot client'

# Gridcoin Classic

## What is Gridcoin Classic

Gridcoin Classic was the first iteration of Gridcoin. Gridcoin classic
is no longer used and all coins were converted to Gridcoin Research
coins via Proof of Burn. The Burn process ended on April 20, 2015. If you
missed the Burn deadline, your coins are now in the possession of the
Gridcoin Foundation and can no longer be claimed.

# Development

## Where can I find the source?

[On Github](https://github.com/gridcoin-community/Gridcoin-Research)

## How could I participate in testnet?

Start the client with the -testnet flag.

[More info can be found here.](Testnet "wikilink")

# Troubleshoot

## Some of my coins have disappeared.

Try running the client with "-rescan" or run the console command
"repairwallet".

## What needs to happen to be added to the chain as a newbie?

1. All the normal prerequisites mentioned: RAC > 100 in at least 1 project, correct email in the
gridcoinresearch.conf, being in a recognised team.

2. A balance that is > 5000 GRC is recommended. Staking at a minimum of 16 hours so the
stakeable coins are mature.

3. The wallet has to be fully unlocked (untick "for staking only")
until it automatically sends a beacon. You can force the wallet to do so
once it recognizes your CPID. Go to the debug console and do
`advertisebeacon`.

4. Once #3 is fulfilled, that node should be in the Network
within 25 hours.

Check the balance first and see how long the node has been online. Let
the wallet run as often as you can, as it will increase your chance of staking.

## How to get out of the loop of cycling app crashes (Microsoft Visual C++ Runtime Library Assertion failed)?

Delete the content of the folder called 'txleveldb' in
the data folder and restart.
