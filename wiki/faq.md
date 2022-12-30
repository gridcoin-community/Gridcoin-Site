---
title: FAQ
layout: wiki
redirect_from:
  - "/Wiki/FAQ"
---

# Frequently Asked Questions

You will see a lot of references to the data folder in this FAQ. Here are the default locations:

| Windows | Linux | MacOS |
|-|-|-|
| `%appdata%/GridcoinResearch` | `~/.GridcoinResearch` | `~/Library/Application Support/GridcoinResearch` |

<br> {% comment %} normal newline (from two spaces) doesn't work after a table for some reason {% endcomment %}

# Gridcoin & Science

---
### Why is Gridcoin (GRC) special?

Almost all of your computing power can be directed at beneficial scientific and medical
research while crunching Gridcoin.

See the list of [Advantages &
Features](advantages-and-features "wikilink").

---
### How can useful work in a cryptocurrency be verified without repeating the work or trusting a central server?

In Gridcoin, work units are given out by distributed project nodes
within the BOINC network which uses their independent calculation to
reward research. Gridcoin compares participants in each project by their
subsidiary credits earned in BOINC to measure performance in relation to
dynamic inner project network average.

BOINC has been rewarding scientific work units in a credit system since 2003.
In case a project maintainer maliciously decides to give out more
credits than appropriate, it only affects the inner project competition.
The maximum share of new Gridcoins for this project stays the same
percentage (subject to the number of total projects). And projects can be
removed by a blockchain vote.

Security in Gridcoin is based on Proof-of-Stake.

---
# Crunching (Research & Mining Equivalent)

---
### How do I start crunching?
Consult these guides:
* [Solo](/guides/boinc-install.htm "sitelink")
* [Pool](/guides/pool.htm "sitelink")

---
### My CPID is not in the network, What do I do?

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
1 GRC. This should add your CPID with the next [superblock](superblock "wikilink").

To see if your CPID is included, go to the Console and type `beaconreport`.

If your CPID is not included, wait for the next superblock. In case your
CPID isn't included after a few superblocks, try resending your beacon
(`advertisebeacon`).

Lock your wallet again, but this time unlock it with "for staking only"
ticked.

---
### What should I put in my config-file for Gridcoin-Research?

Please check [the config file page](config-file "wikilink")

---
### How can I tell if I've mined a block?

If you are using the GUI you will see a transaction with a gold icon.

You can also lookup your address on a block explorer.

---
### Reward calculation: what is RAC?

<https://en.wikipedia.org/wiki/BOINC_Credit_System#Recent_average_credit>

---
### Reward calculation: what is magnitude?

Magnitude is calculated separately for each project. When calculating research rewards, a user's magnitude across every project is added together. See the [magnitude wiki page](magnitude "wikilink")

---
### I had a magnitude for some time but it dropped to 0. What happened?

The reason for this is most likely that you have to resend your beacon,
which should be done every 6 months. For this either unlock your wallet
so that it sends automatically or type `advertisebeacon` in the
console.

---
### I am BOINCing nonstop but my magnitude is very low. What can I do?

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

Additionally, you might not want to use your CPU to crunch for projects with GPU WUs.
You can find CPU only projects by visiting the [BOINC project list](https://boinc.berkeley.edu/projects.php) and looking out for projects that have the Radeon or Nvidia icon.

---
# Pool Crunching

---
### Is it possible to join a pool?

Yes, there are currently 2 operational pools:
* [GRCPool](https://grcpool.com/)
* [Arikado Pool](https://grc.arikado.ru/)

---
### I am crunching for the pool but the wallet still shows INVESTOR and 0 magnitude. Is that ok?

On the beacon menu, make sure to click on "Pool" button at the start. Click
start over if you don't see a selection option. This doesn't technically matter,
but it will help get rid of error messages that aren't relevant to you

---
### I am crunching for the pool but even though I work on projects this is not shown on the profile page of the pool. What can I do?

Make sure you remove all existing projects, which use your account, from the BOINC manager before
syncing to the pool.

---
# Staking

---
### How is the amount of stake-reward calculated?

Proof of Stake rewards will give you 10 GRC for each block you stake. If you are not in investor mode you will also receive your BOINC rewards on top of the 10 in the same block.

---
### The wallet says "Not Staking because you don't have mature coins", how long does it take for coins to mature?

It takes 16 hours for GRC to become mature from the time of
arrival in your wallet. After a specific set of coins have Staked, they
will need to mature again for 16 hours before they can Stake again.

---
### Why can't I send coins in my wallet balance?

You may have a balance reserved in stake. If this ever happens to you do
this in the console:

`reservebalance true AMOUNT`

Where AMOUNT is the amount you want to send

Wait for a few blocks

Then send
it.

---
### When I get an interest/mining payment, a portion of my GRC looks to be moving from my total balance into the "Stake" line of the wallet balance. Is that correct?

Yes. It means that those coins are currently on cooldown so they aren't able to stake for the next 16 hours.

---
### Can I stake with an encrypted wallet?

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

---
### How do you turn staking on and off?

`walletpassphrase "your passphrase in double quotes" timeout true`

where timeout is the number of seconds, e.g. 10000 and true is a toggle
that unlocks the wallet for staking
only.

---
### What happens if I stake on a fork?

When you stake on a [fork](forks "wikilink"), the stake you see is not actually a real stake on the main chain. When your wallet figures out that it is on a fork, you will see these rewards disappear as the wallet corrects itself. This process happens automatically. While frustrating, once off of the fork, you are still able to stake again.

---

### My pending rewards are stuck at 16384 GRC

If you see your pending rewards at 16384 GRC, you have hit the maximum amount of
Gridcoin that can be sent per stake. When you stake you will only earn 16384 GRC
and any amount of extra work done will not be included. If you keep hitting this
limit, make sure you are running your wallet to stake 24/7 (or close to it). If you are,
you should get more Gridcoin to stake more frequently.

If you want to get an estimate of how likely you are to stake *before* that limit, you can try solving
for that probability using:
`16384/(magnitude/4) = -ln( 1 - Probability ) * 10000 / Balance * Difficulty`.  
The probability there are the odds that you stake at least once at any point before that limit (it's a confidence interval).

Note: It is highly unlikely for most users to run into this limit. It requires a very
high magnitude to possibly run into this.

---
# Manual Reward Claim

---
### What is Manual Reward Claim (MRC)?

Manual Reward Claim (MRC) is a feature in v5.4.0.0. When you earn BOINC credits
in solo crunching mode, you accumulate owed Gridcoin. This GRC doesn't exist yet
and you can claim it via two methods, staking or MRC.

MRC allows a user to claim their owed GRC without the requirement of having a
large amount of GRC to stake it (like in previous versions).

MRC was made to solve the issue of new users being unable to claim rewards
without either acquiring GRC first or using a pool. Note that you have to pay a
small amount of GRC as a fee for using the MRC service.

---
### If I have enough GRC to stake, do I need to use MRC?

No. MRC is optional. If you would like to advance the payment of your owed GRC
without having to wait for your next stake, then you are able to issue a MRC
request from the wallet.

---
### How often can I make a MRC request?

Once every 14 days is the most often you can make a MRC request.
Note that if you have only just created your Gridcoin wallet and advertised your
beacon, you will need to wait 14 days until your first request.

Note that you may not want to claim on such a frequent interval because the fee
for doing so is much higher than if you were to wait for longer.

---
### Are there any fees associated with the MRC request?

Yes. The following is a summary of the fees:

- Blockchain transaction fee: This fee is the usual fee that is required to send
a transaction over the Gridcoin blockchain and is usually insignificant. This
fee is charged when you make the MRC request.

- MRC fee: This is the fee that is charged after the MRC request is processed
and is applied to the rewards that you have claimed. The fee starts at 40% of
the owed GRC at the 14-day interval since the last claim (or beacon creation)
and decreases by `40% * 14/(number of days since last claim)`.

The recipients of the MRC fee is as follows:

- The [Gridcoin Foundation](foundation "wikilink") receives 80% of the fee

- The staker of the block which contains the MRC request will get 20% of the fee

---
### When will it be possible to make MRC requests?

MRC requests will be possible at a block height of 2671700 which is
approximately August 31st 2022.

---
### Which address will receive the MRC reward? Can I redirect it?

The GRC address which issued the last beacon from your wallet will receive the
GRC reward. It is not possible to redirect this reward to a different address
unless you send GRC from this address manually.

In your wallet, this address will appear as "Beacon Rain Address".

---
### What happens if the MRC queue is full?

Each block on the Gridcoin blockchain can handle 9 MRC requests at a time. If
this limit has been exceeded and you make a MRC request, it will likely be
cancelled and the fee refunded to you when the next block is staked.

If you want to ensure that your MRC request is fulfilled, then use the
"Fee Boost" field in the MRC screen to increase your chances of getting paid
in the next block by increasing the fees you pay.

---
### Why did my MRC request seem to disappear without action?

There are a few reasons this may happen.
One possibility is that you made the MRC request right before a new block has
been staked, which means your transaction did not get picked up quick enough and
hence became 'stale'.

Another possibility is that your position in the MRC queue was high enough that
your request was not fulfilled in the current block. Hence, you will have to
make another request.

In all instances, the fees that you pay for the MRC request will be refunded to
your Gridcoin wallet.

---
### Is there a command-line tool I can use to make MRC requests?

Yes. The command is `createmrcrequest [dry_run [force [fee]]]`.

Running this command without any arguments will attempt to submit a MRC request
onto the network.

`dry_run` - If set to true, will show you the details about the MRC request you
just made but does not actually send it to the network. (Default: `false`)

`force` - If set to true, will send the MRC request no matter what. This can
only be used on the testnet. (Default: `false`)

`fee` - The fee amount to override the calculated transaction fee for the MRC
request. If the fee here is higher than that of the calculated one, then you
will be placed higher in the MRC queue. You can use this in conjunction with the
`dry_run` option in order to see what position in the queue you will skip to
depending on the fee.

---
# BOINC

---
### Choosing BOINC projects: In BOINC, is there still a defined whitelist of "projects" or can we use any project?

Running "projects" in the console will list all the whitelisted
projects you could possibly contribute to that would help your Gridcoin
Research
wallet.

---
### If it says "non participating project" does that mean that they aren't accepted for Gridcoin purposes?

That means you aren't participating in those projects or the e-mail
address you have in the conf file doesn't match the e-mail address used
in your BOINC manager on that machine. Any changes about e-mail address on a
project take around a day to propagate.

---
### I use BOINC with one username but on a few machines - is it enough to have one wallet with the proper boinc\_project\_email address, or do I have to have a separate wallet on each machine?

You only need one wallet for each BOINC account/CPID (Cross Project
Identifier). Optionally, you can use an account manager to help maintain
projects in under CPID and avoid CPID splits. Your reward is
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

---
### Instead of discussing every single BOINC project to be added, is there any shared guidelines to be used for accepting or rejecting them?

https://github.com/gridcoin-community/Gridcoin-Tasks/issues/227

---
### How do I delete a project from my list of CPIDs?

We used to support detaching but a vote was made to calculate the magnitude
on every project you still have valid RAC on; so GRC does not support
detaching projects (it was supposed to prevent gaming the system). There
is no difference if you score 0 on a project, as all are taken into
account equally.

---
# Status

---
### How can I see my Researching Status?

Press the beacon button and if you go through the steps for setup, you should see
an overview of all the relevant information. You can also click on the project tab
for information on a per project level

Without using the GUI, you can also see a list of your magnitude in each project
by using the `explainmagnitude` [RPC command](rpc "wikilink")

---
### What does "diff" exactly measure? What does it tell if it's high or low?

A staking hash that is generated that is LESS than the target will stake. So the smaller the target (higher the diff) the LOWER the probability of staking.

This also means that diff is directly proportional to that average net coins staking on the network.

TL;DR:
When more coins are staking the difficulty increases which makes it harder to stake and vice versa.

The formulas to calculate diff may be found in section 2.1 of the [staking bluepaper](/assets/docs/grc-bluepaper-section-1.pdf "sitelink").

---
### How to call commands when starting Gridcoin Wallet on Windows?

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

---
#### How could I check whether my local block is the same as on an explorer?

After you double click on the tx in the list, write down the block
number (not hash).

Then do

`showblock blocknumber`

And compare the details with details from explorer.

If you do want to get a block by hash, you would have
to:

`getblockhash blocknumber`

`getblock blockhash`

But that is a little longer

---
# Upgrade

---
### How do I upgrade the Gridcoin wallet client?

Download the installer from [Github](https://github.com/gridcoin-community/Gridcoin-Research/releases) or your package manager and install over your previous installation.

**Do not delete the data folder.** This contains important data like your keys which let you access your coins.

---
# Backup

---
### What can I do if I didn't save a prior version of wallet.dat?

The wallet has an automated backup in place that will make backups every 24 hours into the walletbackups folder inside of your data folder.

---
### Which is the best practice to save my new wallet?

Different methods were discussed in the Gridcoin Community Classroom
\#003: <https://www.youtube.com/watch?v=JxrjUwX5XvA>

---
### How to compress my wallet getting rid of orphans?

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

---
### What should I do to recover an old backup of my wallet?

1. Backup wallet.dat.
2. Look for the walletbackups folder.
3. Find the most recent backup.
4. Shutdown the wallet
5. Copy it to the data directory and rename it to wallet.dat.
6. Restart the wallet.

If it still doesn't start you can try using the `-salvagewallet` flag. This will
try to pull whatever it can out of the wallet.dat file and will create a new
file. Rename that new file to wallet.dat and try launching the wallet again
without the `-salvagewallet` flag

---
# Sync

---
### I have lots of connections, but synchronizing stopped at a certain block. What should I do?

Just try to just wait it out the wallet should automatically fix itself.

If it still hasn't gone up after a few hours try this:

1.  Close the client
2.  In your Gridcoin data folder, delete the accrual folder, the txleveldb folder,
and blk00*.dat (with * being any number).
3.  Restart the wallet and wait for it to sync. If you don't want to wait you can also use the snapshot
 which you can use by clicking on File -> Snapshot or using the `-snapshotdownload` [command line argument](cmd-options "wikilink")

You can also try running the wallet as an administrator.

---
### How could I test whether I am in sync with the network?

Compare your highest block number with the one listed at
[gridcoinstats.eu](https://gridcoinstats.eu/block)

When the explorer is clearly ahead of you (\> 9 blocks) and increasing
about every 90 seconds, your node is most likely on the fork. You can
wait till it syncs or rebuild the blockchain.

When you are clearly ahead of the explorer and / or the explorer has
stopped incrementing on a regular basis, it's more likely that the
explorer will sync up with you and your connected nodes at some point.

---
### How do I get in sync fast?

Ensure you are running the latest wallet version.

You can try using a snapshot (File -> Snapshot Download) or you can download from [here](https://snapshot.gridcoin.us/snapshot.zip) and apply it manually.

While it downloads, delete the peers.dat in your data folder - you may have a bad peer group.

You can also try to reboot your router to attempt to get a new IP, to make sure
you are not banned by good nodes because of earlier behavior.

---
### I can't get connections. How can I test whether the net is down or my node is misconfigured?

First, install telnet for your respective os.

Then open your command box and enter `telnet addnode-us-central.cycy.me 32749`. If there is no response, your Firewall might have blocked the
port. Otherwise, your configuration might be wrong or your node may have been
temporarily banned by the
network.

---
### When syncing from zero, the sync gets stuck or pauses for an untimely duration. What to do next?

Make sure you're on the latest wallet version.

Syncing may seem to take longer with growing blockchain. If you get
stuck use 'reboot client'

---
# Gridcoin Classic

---
### What is Gridcoin Classic

Gridcoin Classic was the first iteration of Gridcoin. Gridcoin classic
is no longer used and all coins were converted to Gridcoin Research
coins via Proof of Burn. The Burn process ended on April 20, 2015. If you
missed the Burn deadline, your coins are now in the possession of the
[Gridcoin Foundation](foundation "wikilink") and can no longer be claimed.

---
# Development

---
### Where can I find the source?

[On Github](https://github.com/gridcoin-community/Gridcoin-Research)

---
### How could I participate in testnet?

Read the how to help section on the [testnet wiki page](testnet "wikilink")

---
# Troubleshooting

---

## General

---
### Some of my coins have disappeared.

Try running the client with `-rescan` or run the console command
`repairwallet`.

---
### Error when sending a transaction

First, check that you have your wallet unlocked fully. If you have it locked
for staking only, you will need to re-lock it and then unlock fully. Try
sending the transaction after that. If you don't have it locked at all, you can
ignore this.

If you see `Error: the transaction was rejected` or you see
an error saying "not enough fees", you may have too many small UTXOs (what's
leftover from a transaction you received) to send a transaction. There is a
maximums transaction size and so if a transaction tries to include to many UTXOs,
it can be impossible to send. To fix this, you can try consolidating them using the
`consolidateunspent` [rpc](rpc "wikilink") command. For each of your addresses,
try running `consolidateunspent <address>`. After this finishes, try sending
the transaction again. This may require multiple rounds of the command if you
have a lot of small transactions.

---
## Windows Only

---

### Cannot read configuration file. Please check the path and format of the file

First, check you delete the `%appdata%/GridcoinResearch` folder. You should not remove this folder.
If this folder is not at your `%appdata%`, recreate the folder and add the files `wallet.dat` and `gridcoinresearch.conf` inside the folder.

---
### How can I move my data folder?

1. Close your wallet.
2. Move your entire data from actual location to the new location. The default location of the data is `%appdata%\GridcoinResearch`.
3. After you move the entire contents, right click at the Gridcoin Icon, select properties, and add the `-choosedatadir` to the end.
4. Run Gridcoin.
5. It will show the dialog dialog box to choose the data directory. 
6. Choose the new location.

---