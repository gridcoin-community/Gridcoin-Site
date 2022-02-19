---
title: Beacons 
description: Overview of BOINC and how it relates to Gridcoin
layout: wiki
---

# Overview

Beacons are what tie a user to their work on BOINC. They are only required
for solo crunching and have a fee of 0.5 GRC + transaction fees. To keep a beacon
active, it must be renewed every 6 months

See [the last step](/guides/earn-grc.htm "sitelink") of the solo crunching guide 
for the process of sending a beacon. Note that BOINC and the Gridcoin wallet
must be setup beforehand

# Rational

Beacons require verification to ensure a user is not trying to steal someone 
else's reward. Additionally, they let the network know which BOINC user's stats
to monitor and which to ignore.

# What is in a Beacon?

The beacon stores your BOINC Cross Project Identifier (CPID) and a cryptographic public
key. The seemingly random text you use  for verification is a signed message 
with your private key --- letting you prove you own that account 

# Miscellaneous

* The "beacon address" is just the address that you used to get the coins for your
  beacon. There isn't anything special about the address otherwise, and it's just an
  ordinary address

* A beacon is technically a form of a smart contract albeit a simple one

* You can view the status of your beacon (if you have one) on the researcher wizard 
  or with the `beaconstatus` command