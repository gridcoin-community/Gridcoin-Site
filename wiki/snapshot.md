---
title: Snapshots
layout: wiki
---

# An official snapshot is no longer provided due to abuse. This page is retained for historical purposes.
# Overview
Snapshots are a copy of the blockchain at a particular point in time.
Snapshots can help newer users to get into sync faster than syncing from 0.

# Issues
* Snapshots are not validated by the wallet.
* Snapshots are an inherently centralised method of getting into sync.
* Users may mistakenly install a malicious or corrupted snapshot. 
If enough users install the bad snapshot then the integrity of the chain could be compromised.

# Using snapshots
## In the Wallet
Snapshots can now be downloaded and applied automatically by the wallet.

It is accessible from File -> Snapshot Download or the `-snapshotdownload` [startup option](cmd-options "wikilink")

## Manual method
1. Download the snapshot
2. Verify the checksum (IMPORTANT)
3. Shutdown your wallet.
4. Delete the following folders: `txleveldb` & `accrual` from your Gridcoin data directory.
5. Delete the `blk****.dat` files from your Gridcoin data directory.
6. Extract the snapshot zip into your Gridcoin data directory.
7. Restart the wallet and get into sync.

## Creating your own snapshot
1. Shutdown your wallet.
2. Create an empty archive in an archive program of your choice.
3. Add all the `blk****.dat` files to your archive.
4. Add the `txleveldb` folder to your archive.
5. When you want to use it, follow the manual method but with your archive.

# Alternatives
* Syncing from 0:
  
  This is preferred. With all of the recent changes in the wallet it is only mildly slower than using a snapshot.
  This doesn't require trust in the snapshot creator.
* Bootstrap:
  
  As of April 2021 these are no longer offered.
  It doesn't bypass the checks in the wallet which prevent malicious bootstraps from damaging the chain.
  There is little to no point in using one of these over syncing from 0. 
  It brings limited speed benefits compared to syncing normally but relies on a centralised download.
