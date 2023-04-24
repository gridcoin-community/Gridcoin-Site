---
title: Gridcoin Scraper 
description: Overview of what the scrapers are, how they work, their history, and why they are used
layout: wiki
redirect_from:
  - "/Wiki/Scraper"
---

# Overview

Scrapers are the bots[^1]that get statistics of how much work each user on the
network did. They independently pull data from each [BOINC](boinc "wikilink") 
project and send it to the network. Each wallet compares the data from
one scraper to all others to ensure it is correct

Once the data has been pulled, it will go into a [superblock](superblock "wikilink")
at almost exactly 24 hours from the previous superblock.[^2]This updates the
network with the new data thus updating how much each user earns. 

As of January 2022 there are 6 scrapers on the main network. 

# Rationale

The scraper system is designed to be scalable. It aims to minimizes the amount of
trust required in each scraper and avoid placing large amounts of load on
the project servers. 

In addition, some projects require credential tokens to download stats[^3]. Getting
these tokens is not automated and requires doing it manually. Using the scraper
system allows each scraper to get their own token without requiring that ordinary
users go through the process just to run the wallet

This system came about because the previous system was running into limitations.
In the past, random parts of the network would download the stats from projects, 
and it caused tremendous load on servers. The problem only grew more severe
as time progressed. At one point a stats mirror was put in place, but this 
came with other issues like centralization concerns. The current scraper system fixed this by 
reducing the number of downloads needed to function while still not entirely depending on one user's download.

As an additional benefit, the scrapers are able to reduce the amount
of data sent out to the network by only including users with a beacon
--- saving several hundreds of megabytes of data. 

# History

The current scraper system was first released as part of the 4.0.3 (Denise) release and 
replaced the old "neural network" (unrelated to machine learning). It took 
over 10000 lines of new code and 250+ hours of development and testing. The 
scrapers were further improved in the 4.0.5 (Elizabeth) and the 
5.0.0 (Fern) mandatory release.  

A more thorough table with comparison of the old system and new system along with
a timeline can be found below

* {% include _start_dropdown.htm 
     dropdown-header="Click to view the comparison"
     markdown-type="block"
  %}

  | Category | Old VB .NET | Current Native C++ |
  |---|---|---|
  | Scalability | Severely limited and had no support for other BOINC teams. | High - At least 20x current capacity - while maintaining constant low load on BOINC statistics sites. Fully supported the removal of the team requirement in 5.0.0 (Fern) |
  | Cross Platform Compatibility | Windows only - Required GUI. | Completely cross platform - supports all platforms the wallet supports - currently Win64, Win32, Linux (Intel 64 and 32 bit, ARM 64 and 32 bit), and MacOS (Intel 64 bit) and can be run daemon-only (headless). |
  | Reliability/Availability | Low - due to single point of failure for old scraper | High - Support for multiple scrapers, cross-verified by the nodes, with a configurable (nominally 48 hour) statistics retention period, ensures scraper outages are transparent. |
  | Security | Poor - Single scraper model allowed the possibility of a man in the middle attack | Very High - Each scraper must be authorized to publish statistics to the network. Each scraper hashes and signs all statistics and these hashes and signatures are checked and cross-verified by all nodes. Unauthorized scrapers’ statistics are deleted and they are banned from the network. |
  | Network Bandwidth Use | High - the original scraper simply forwarded uncompressed and unfiltered statistics files (\>300 MB for a complete set), the same as when the nodes downloaded them directly | Extremely Low - the new scrapers download the stats, filter, and compress them, reducing \>300 MB of statistics to 4-5 MB for a 48 hour retention period. Statistics are shared in two stages: the statistics directory is “pushed”, and then the actual statistics are “pulled” by the nodes to get the statistics the node does not already have. This minimizes network traffic. Since the messages are signed, they can be forwarded by intermediate nodes, just like other network messages, such as transactions. |
  | Client CPU Use | High - the “Neural Net” on each node could eat up at least 1 CPU for up to 30 minutes for processing the statistics. | Extremely Low - the normal nodes process the scraper statistics in under three seconds for a typical Intel CPU. This ensures the CPU goes towards computing not administration. |
  | Client Disk Use | High - up to 2 GB used on the client drive. Significant disk loading during operation | None - All scraper statistics are compressed and stored in memory |
  | Client Memory Use | Moderate. The .NET runtime added overhead to the wallet | Low - Very little additional memory required (\<50 MB). |
  | BOINC Server Resource Use | High - The old scraper sometimes downloaded statistics files over and over that were already downloaded. If the single scraper was down, each node would fall back to downloading its own statistics, crushing the BOINC servers (250+ nodes at once). | Low - Typically 6 scrapers in operation - each downloads statistics files for a 4 hour window before the superblock is due, only downloading changed statistics. This results in a constant, low load on the BOINC servers only during the 4 hour window regardless of the size of the Gridcoin network. |
  | Maintainability | Low - Used non-native development and build tool chain (Microsoft Visual Studio .NET) that is not open source and also does not play well with core wallet. This hampered development, testing, and the release process. | High - Written to conform to Gridcoin’s coding standards and 100% C++, well commented, with a modular design that is easily extensible, and completely integrated into core wallet. |  

  {% include  _end_dropdown.htm %}

* {% include _start_dropdown.htm 
     dropdown-header="Click to view a timeline"
  %}
    | Time | Event |
    | ---  | ----- |
    | 2014 | modern version of Gridcoin started |
    | Jul 2017 (v3.5.9.1) | Stats mirror put in place (no longer in use)
    | May 2019 (v4.0.3)   | Current scraper system introduced
    | Aug 2019 (v4.0.5)   | Scraper system improved and a some non-Gridcoin BOINC teams were able to earn Gridcoin
    | Sep 2020 (v5.0.0)   | Old system fully removed, scrapers improved, and team requirement removed

  {% include _end_dropdown.htm %}

# Miscellaneous

* Note that not anyone can publish data as a scraper nor pretend to be another
scraper. All wallets check that the data is correctly signed and from an authorized scraper

* To see which scrapers are publishing data, run the `convergencereport` [RPC](rpc "wikilink")
command. This will show you which scraper's data were included in the last superblock
and if any were excluded or not publishing.


* The actual data is sent through the wallet's messaging system. The full 
data can be seen by running `listmanifests true` as an RPC command 


# Footnotes

[^1]: They are oracles for those more familiar with that term
[^2]: Assuming the data between scrapers matches and other criteria are met. See the [superblock](superblock "wikilink") wiki page for more information
[^3]: This is mainly because of how these projects interpret GDPR
