---
title: FAQ
layout: wiki
---

# Most frequent asked questions

## I am crunching for the pool but the wallet still shows INVESTOR and 0 magnitude. Is that ok?

That is perfectly normal, when pool-mining you do work for the pool's
account and as a reward get transactions from the pool for the work you
did. Because of this you do not work for your own CPID and have no
magnitude.

## I am crunching for the pool but even though I work on projects this is not shown on the profile page of the pool. What can I do?

Make sure you remove all existing projects from the BOINC manager before
syncing to the pool. Then you can add new projects from the page of the
pool.

## I have connections but the number of blocks does not increase. What can I do?

If you have connections you should be fine and the wallet will sort
itself out. If after a few hours your number of blocks still doesn't increase check to make sure you're using the latest version of the wallet.

## I had a magnitude for some time but it dropped to 0. What happened?

The reason for this is most likely that you have to resend your beacon,
which should be done every 6 months. For this either unlock your wallet
so that it sends automatically or type `advertisebeacon` in the
console.

# Gridcoin & Science

## Why is Gridcoin (GRC) special?

Gridcoin allows  Nearly all computing power (up to
98% efficiency) can be directed at beneficial scientific and medical
research while crunching Gridcoin.

See list of [Advantages &
Features](Advantages_&_Features "wikilink").

## How could 'useful' work for a cryptocurrency be verified without repeating the work or trusting a central server?

In Gridcoin, work units are given out by distributed project nodes
within the BOINC network which use their independent calculation to
reward research. Gridcoin compares participants in each project by their
subsidiary credits earned in BOINC to measure performance in relation to
dynamic inner project network average.

BOINC has been rewarding scientific work units in a credit system since
2003. In case a project maintainer maliciously decides to give out more
credits than appropriate, it only affects the inner project competition.
The maximum share of new Gridcoins for this project stays the same
percentage (subject to number of total projects). And projects can be
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
-0.00011 GRC. This should add your CPID with the next superblock.

To see if your CPID is included, go to the Console and type `beaconreport`. 

If your CPID is not included, wait for the next superblock. In case your
CPID isn't included after a few superblocks, try resending your beacon
(`advertisebeacon`).

Lock your wallet again, but this time unlock it with "for staking only"
ticked.

## How long does it take to start receiving Research (mining) credit?

This depends on several factors. You must have some coins to begin with, the general recommendation currently is around 5000 (at the time of writing this that would stake on average about once a month). You must send a "beacon",
this is how your information is populated into the Network which
controls payments, see [Mining setup](Mining-Setup "wikilink"). You must
have over 100 RAC on at least 1 whitelisted BOINC project before you can
send a beacon to receive Research credit. After your CPID is in the
Network, all research credits you earn will accrue in a "savings
account" for a rolling 14 day period. You have up to 2 full weeks to
stake a block without losing any research credit
earned.

## Is it true that someone would not lose reward if blocks are created on a fork?

If you stake on a fork, the stake you see is not actually legitimate. When your wallet figures out that it is on a fork, you will see these rewards disappear since they shouldn't have shown up in the first place. This process happens automatically. While frustrating, once off of the fork, you are still able to stake again. 

## What should I put in my config-file for Gridcoin-Research?

Please check here [this page](https://gridcoin.us/Wiki/Config-File)

## How can I tell if I've mined a block?

First look at the transaction list for "PoR" payments.

If you don't have any PoR yet, do a "list mymagnitude" in the debug
console and look for the savings account balance "owed". That will be
what you accrue for your first payment. It has to be higher than the
subsidyschedule max block / 10, IE 40 right now in order to actually
generate.

## Reward calculation: what is RAC?

<https://en.wikipedia.org/wiki/BOINC_Credit_System#Recent_average_credit>

## Reward calculation: what is magnitude?

The reward calculation is based on the relative contribution of a user
to the total contribution from other crunchers earning Gridcoin. This is being calculated
within every project and the sum of the relative contributions is the
magnitude which is being used to calculate the reward. Besides the
research rewards, each mined block contains interest.

## Is it possible to join a pool?

Yes, there are pools at <https://grcpool.com/> and
<https://grc.arikado.ru/>

## I am BOINCing nonstop but my magnitude is very low. What can I do?

RAC is a rolling average over the past month. It is weighted to increase the value of more recent contributions. Gridcoin relies on the RAC values provided by the project to calculate your magnitude. 

However, you can't just compare your RAC between projects because different projects use different systems for how they calculate the RAC. Because of this the magnitude calculation also takes into account the total RAC for other crunchers earning Gridcoin.

Depending on your hardware you may want to keep away from some projects.

You can see estimated magnitude levels for your hardware here: http://quickmag.ml/cgi-bin/script.cgi

Unfortunately data for some whitelisted projects like WCG are not available so they won't be included in the estimate.

There are also overrun CPU projects or projects that do not provide
constant work unit (WU) flow.

Try different projects and see whether your hardware can keep up a high
magnitude. You can review your outcome magnitude in the wallet.

Anyway, if you like a project you should still support it, to keep the BOINC
spirit up.

Additionally, you might want to re-visit the projects you contribute to,
you don't want to contribute CPU power to a project that allows GPUs its
like trying to mine Bitcoin with your PC, you are competing with the
wrong equipment. You might start by visiting this list:
<https://boinc.berkeley.edu/projects.php> and make sure you
aren't using your CPU for projects that have the ATI or Nvidia icon. You
can also maximize your magnitude by finding projects that have smaller
team RAC (just make sure they have work available) on the network report
which you can find here:
<https://stats.free-dc.org/stats.php?page=teambycpid&team=Gridcoin>

# Staking

## How is the amount of stake-reward calculated?

The stake reward is calculated by two combined
algorithms.

`Proof of Stake rewards will give you 10 GRC for each block you stake  
`Proof of Research rewards for BOINC contribution, though research activity. A PoR block is a combined payment 10 GRC and research reward.`

## The wallet says "Not Staking because you don't have mature coins" , how long does it take for coins to mature?

It takes about 16 hours for GRC to become mature from the time of
arrival in your wallet. After a specific set of coins have Staked, they
will need to mature again for 16 hours before they can Stake again.

## Why can't I send coins in my wallet balance?

You may have a balance reserved in stake. If this ever happens to you do
this in the console:

`reservebalance true AMOUNT`

Where AMOUNT is the amount you want to send

Wait a few blocks

Then send
it.

## When I get an interest/mining payment, a portion of my GRC looks to be moving from my total balance into the "Stake" line of the wallet balance. Is that correct?

Every 4 hours the wallet is on-line, it looks for old coins that can
accrue interest and moves them from 'Balance' to 'Stake' then it works
on staking. Once staked, it moves the staked balance back to
balance.

## I lose my stakeweight after receiving PoR? The "maturecoin-creationprocess" is starting again after each mined PoR?

Yes that is normal, because your node builds up a set of stakeable coins
and once you stake them the process takes about 4 more hours to get new
mature coins, unless some have been found in between (it's a constant
process).

## Do I have to leave my wallet unencrypted to be able to stake?

Well, if you encrypt your wallet and enter `walletpassphrase
\[passphrase\] 86400`, that would unlock it for 24 hours for staking.

Your wallet file remains encrypted and since you do not have to enable
external RPC access for mining anymore, it's safe aside from physical
access or perhaps memory leakage.

## Can I stake with encrypted wallet?

Yes, but you have to unlock it first. It's okay to unlock it "for
staking only".

The console walletpassphrase command does what clicking the lock button
does.

To lock Type

`walletlock`

to unlock for a certain time type

`walletpassphrase PASSWORD TIMEOUT`

to unlock type

`walletpassphrase PASSWORD`

to unlock only for staking type

`walletpassphrase PASSWORD TIMEOUT true`

## How do you turn staking on and off?

`walletpassphrase "your passphrase in double quotes" timeout true`

where timeout is a number of seconds, e.g. 10000 and true is a toggle
that unlocks the wallet for staking
only.

# BOINC

## Choosing BOINC projects: In BOINC, is there still a defined whitelist of "projects" or can we use any project now that has Gridcoin as a Team Name?

Running "projects" in console will list all the whitelisted
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
Identifier). You can use BAM (BOINC Account Manager) to combine more
projects in one CPID. Here is a guide
<http://grcnation.com/en/bam-boinc-account-manager/> . Your reward is
based on the credit in your BOINC account/CPID. You can point as many
machines and resources to a single account as you want and only need a
single wallet to receive your reward. You do have to set "email=" in the
config file to your BOINC/BAM email and must be running the wallet on a
machine that has BOINC installed and is associated with all BOINC
projects you would like to get credit for (they can be set to not
retrieve new work) and each project must show at least some RAC on that
machine (press "Update" in the BOINC software when a project which shows
0 contribution is
selected).

## BOINC: For our accounts, we used to have to use our Gridcoin address as our usernames for those accounts. Is that the case still, and if so, should we change our address info over to the "new" client addresses? Like under BAM/BOINC Stats, our stats/info isn't searchable via e-mail address but is via username. Just wondering what we can/should use for going forward.

Changing your BOINC name to a Gridcoin Address is not needed anymore.
Now just set "email=" in the gridcoinresearch.config file, ensure you
are in team Gridcoin in each project, that should do
it.

## Instead of discussing every single BOINC project to be added, is there any shared guidelines to be used for accepting or rejecting them?

No, but there may be a defined process one day. Currently, decisions are
placed individually due to a vote within the blockchain. The discussed
project is then added or deleted from the dynamic whitelist.

As far as hardware requirements, projects should be able to run on both
64 and 32 bit OSes. Some BOINC projects are limited to architecture. We
definitely need a set of guidelines to follow before adding a project to
the whitelist. It is favorable to choose projects that are accessible
to the masses.

## How do I delete a project from my list of CPIDs?

We used to support detaching but a vote was made to calculate magnitude
on every project you still have valid RAC on; so GRC does not support
detaching projects (it was supposed to prevent gaming the system). There
is no difference if you score 0 on a projects, as all are taken into
account equally.

If you insist on not being paid for a specific project, change your team
away from team Gridcoin for that project.

# Status

## How can I see my Researching Status?

If you have some BOINC credits, you are in team Gridcoin and your email
is correct in the gridcoinresearch.conf file. You should see a list of

your magnitude in each project when entering "*explainmagnitude*" to
the debug console of the wallet (Help -\> Debug Window -\> Console). It
may take 24-48 hours for new accounts to be populated.

## What does "diff" exactly measure? What does it tell if it's high or low?

Difficulty (diff) is a variable int representing how hard the PoS
algorithm has to make the next block to keep block minting periods at a
stable 90 seconds rate into the future.

When a lot of researchers are eligible at the same time for a block,
diff rises to slow down minting. In contrast when no one is online
mining, diff will drop to lure in miners to keep our blocks staking at
once per 90 seconds.

Another way to look at diff is how many distinct PoR miners are eligible
during any one minute to stake. When diff is @20, it means 20 miners
were on-line that minute with solutions, so diff is rising to keep
emission steady.

It's very similar to PoW diff. The big advantage we have in this version
with PoR is we can accommodate thousands of new miners without seizing
the chain with the RSA (Research Savings Account) and the 90 seconds
block times.

## What does stake weight mean?

The personal stake weight it how many coins are eligible for staking \*
coin age for your node.

The network stake weight is the sum of coin age mined in the last 72
blocks by the network.

## How to call commands when starting Gridcoin Wallet on Windows?

Create shortcut that links to the actual GRC program in Program Files
directory and add the function at the end of the target, then properly
name them for the function to execute:

Example with -rescan option: Make a new shortcut to "C:\\Program Files
(x86)\\GridcoinResearch\\gridcoinresearch.exe" or "C:\\Program
Files\\GridcoinResearch\\gridcoinresearch.exe"

Add the command to execute at the end of the 'Target:' line like
"C:\\Program Files (x86)\\GridcoinResearch\\gridcoinresearch.exe"
-rescan .

Rename the shortcut like 'GRC rescan'.

Then go to Advanced and tick on run as Administrator.

From now on when you double click on it, it will execute that Command
Line function.

This way it is simpler and faster for newbies than CLI and
batch.

## How could I check whether my local block is the same as on a explorer?

After you double click on the tx in the list, write down the block
number (not hash).

Then do

showblock blocknumber

And compare the details with details from explorer.

Btw, just for fyi, if you do want to get a block by hash, you would have
to:

getblockhash blocknumber

getblock blockhash

But that is a little longer :)

# Upgrade

## How do I upgrade the Gridcoin wallet client?

Download the installer from
[Github](https://github.com/gridcoin-community/Gridcoin-Research/releases)
and install over your previous installation.

Deleting the appdata folder is not recommended.

# Backup

## What can I do if I didn't save a prior version of wallet.dat?

The wallet has an automated backup in place that will make daily backups
(once every 24 hours) into %appdata%\\gridcoinresearch\\walletbackups.

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
5.  Start client and send all coins to the address you copied down in
    step 2.
6.  Make sure you get at least 10 confirmation for the transaction.
7.  Close client and rename wallet.dat to wallet.bak and rename
    somethingelse.bak to wallet.dat
8.  Start client and enjoy your new wallet.

The reason why you should never dump private keys or wallet is that if
your PC is compromised, you probably won't know it and the moment you
dump your keys, someone on the listening side will get your private key,
and therefore get your coins.

Yes. You will lose your coin stake, and it will take 4 hours for coins
to start staking again.

## What should I do to recover an old backup of my wallet?

Backup wallet.dat.

Look for the %appdata%\\Roaming\\GridcoinResearch\\walletbackups folder.

Find the youngest backup.

Copy it to the %appdata%\\Roaming\\GridcoinResearch directory and rename
it wallet.dat.

Restart.

If you have no backup you will have to do the -salvagewallet as starting
option.

# Sync

## I have lots of connections, but synchronizing stopped at a certain block. What should I do?

Try this:

1.  Make sure Gridcoin is running as an administrator.
2.  Close the client
3.  Clean out your Gridcoin Appdata folder EXCEPT wallet.dat, your
    GridcoinResearch.conf file and the folders walletbackups and testnet
    if present. For windows '%appdata%/Roaming/GridcoinResearch', For
    Linux '\~/.GridcoinResearch'
4.  You can also get the snapshot [Here](http://download.gridcoin.us/download/downloadstake/signed/snapshot.zip)
    and extract it to the Gridcoin data folder. For windows -\>
    '%appdata%/Roaming/GridcoinResearch', For Linux
    '\~/.GridcoinResearch.

There is also an [official
thread](https://cryptocointalk.com/topic/20303-gridcoin-proof-of-research-connection-sync-problem-thread/)
for sync problem if it didn't work.

## How could I test whether I am in sync with the network?

Compare your highest block number with the one listed at
<http://www.gridresearchcorp.com/gridcoin/>

When the explorer is clearly ahead of you (\> 9 blocks) and increasing
about every 90 seconds, your node is most likely on the fork. You can
wait till it syncs or rebuild the block chain.

When you are clearly ahead of the explorer and / or the explorer has
stopped incrementing on a regular basis, it's more likely that the
explorer will sync up with you and your connected nodes at some point.

## How to get back in sync fast?

Ensure you have upgraded to latest wallet version.

Try using the snapshot you can get it [Here](http://download.gridcoin.us/download/downloadstake/signed/snapshot.zip).
While it downloads, delete the peers.dat in
%appdata%\\Roaming\\GridcoinResearch - you may have a bad peer group.

While the client restarts after the download blocks, you can also try to
switch off/on your router if you get a new IP with that, to make sure
you are not banned by good nodes because of earlier behavior.

## I certainly fell off the consensus chain, how to get back on?

1. ensure you are running the latest version

2. try to restart the client

3. try to use the [snapshot](http://download.gridcoin.us/download/downloadstake/signed/snapshot.zip).

If you tried each of the steps above and are sure you are running the
correct version

Backup your wallet.dat file

Close the Gridcoin-Research wallet

In the roaming folder delete all but gridcoinresearch.conf and
wallet.dat and the wallet backup folder.

Check your [List of Addnodes](List_of_Addnodes "wikilink")

Start Gridcoin-Research and wait. If you continue to have trouble visit
the technical support forum:
<https://cryptocointalk.com/forum/2380-technical-support/>

## I still can't get connections. How can I test, whether the net is down or my node is misconfigured?

First install telnet for your respective os.

Then open your command box and enter `telnet addnode-us-central.cycy.me 32749`. If there is no response, your Firewall might have blocked the
port. Otherwise your configuration might be wrong or your node has been
temporary banned by the
network.

## When syncing from zero, the sync gets stuck or pauses for an untimely duration. What to do next?

Syncing may seem to take longer with growing blockchain. If you get
stuck use 'reboot client'

# Gridcoin Classic

## What is Gridcoin Classic

Gridcoin Classic was the first iteration of Gridcoin. Gridcoin classic
is no longer used and all coins where converted to Gridcoin Research
coins via Proof of Burn. The Burn process ended April 20, 2015. If you
missed the Burn deadline, your coins are now in the possession of the
Gridcoin Foundation and can no longer be claimed.

# Development

## Where can I find the source?

<https://github.com/gridcoin-community/Gridcoin-Research>

## How could I participate in testnet?

Testnet is just like production (regular wallet), except it uses a
different port and a different directory; so you copy your
gridcoinresearch.conf down a level (%appdir%/gridcoinresearch/testnet)
and everything works almost the same, except the diff rules make it
slightly easier and of course all the money is fake. The data files are
stored one directory down also. You will have to start
Gridcoinresearch.exe with -testnet flag, for example due to the creation
of a shortcut with this flag.

For Windows, simply add testnet=1 to gridcoinresearch.conf file. The
wallet will automatically create the necessary directories. To revert to
normal wallet, change it to testnet=0.

# Troubleshoot

## After reloading blockchain some coins are no longer in my wallet

Try running the client with "-rescan" or run the console command
"repairwallet".

## My wallet has smaller balance than last time. How to fix?

Try starting Gridcoin with option '-rescan'. Go in debug and do
"repairwallet" or "rebuilt block chain" to fix the local amount.

## What needs to happen to be added to the chain as a newbie?

1\) All the normal prerequisites mentioned: Team Gridcoin, Verified
Netsoft RAC \> 100 in at least 1 project, correct email in the
gridcoinresearch.conf.

2\) A GRC balance \~100. Staking at a minimum of 16 hours so the
stakeable coins are mature.

3\) The wallet has to be fully unlocked (untick "for staking only")
until it automatically sends a beacon. You can force the wallet to do so
once it recognizes your CPID. Go to the debug console and do
`advertisebeacon force`.

4\) Once #3 is fulfilled, that node should be in the Neural Network
within 12 hours.

Check the balance first and see how long the node has been online. Let
the wallet run as often as you
can.

## How to get out of the loop of cycling app crashes (Microsoft Visual C++ Runtime Library Assertion failed)?

Delete the content of the folder called 'txleveldb' in
%appdata%\\Roaming\\GridcoinResearch and restart.

## Is there a getting started booster for new clients?

New node setups can show connections icon (even at zero connections) but
stick at 0% sync progress. Hover over where the green tick would be when
synced to confirm.

Turn off BOINC or set CPU to below 100%.

Use download blocks and wallet restart and/or gracefully close wallet
(Ctrl Q), copy a populated peers.dat (bigger than 2kB in files size) and
paste it as an overwrite to %appdata%/gridcoinresearch (you can type
this in Windows search field) and then start wallet (elevated; right
click, run as administrator).

When it starts back up it takes a while so be patient and if it looks
like it is not responding, just ignore it or click 'wait for the program
to respond'. You should eventually see the connections icon showing zero
connections and it will flash very briefly on. You can check the debug
log and see an entry 'socket closed' when the flash happens. Then use
download blocks and after that process you should have syncing right
upto 'up to date/100%). The debug log should show something like
<http://pastebin.com/1uEpDB79>

If you don't get syncing after doing download blocks, check the size of
your peers.dat. If it still 2kB then it did not overwrite or save and
you will need to repeat the process.
