---
title: Superblocks
layout: wiki
description: Explains what a superblock is, how they get made, and what exactly is inside one
---

# Overview

A superblock is a special block that stores information about how much work everyone 
in the network has done in [BOINC](boinc "wikilink"). When a superblock happens, [magnitude](magnitude "wikilink")
gets updated. Superblocks happen almost exactly every 24 hours.

Anyone can [stake](staking "wikilink") a superblock (if they are staking). If you 
end up doing this by chance, you will see this icon
![superblock icon](/assets/img/wiki/superblock.png){:height="44px"}. {% comment %} display the icon at the size of about two lines  {% endcomment %}
Note that it doesn't really change anything for you as a staker other than just seeing a different icon


# How Superblocks Get Made 

1. A previous superblock is made and a 24 hour clock starts for the next superblock to be due[^1]
2. Stats are independently gathered by the [scrapers](scraper "wikilink") from the BOINC projects
3. Those stats are sent out to each wallet which compare them and check that they match. 
If at least 60% (rounded up) of the scrapers exactly match,[^2] a superblock can be made (when it's due)
4. Someone stakes and they include the new data from the scrapers

Note that this is just a brief overview and there are many security mechanisms and other parts left out in the description

# What Exactly Is In a Superblock

More precisely, a superblock stores the magnitudes of every Gridcoin cruncher, and it 
also stores the total credit, average credit, and recent average credit from all Gridcoin 
crunchers in each project. 

If you want to see what exactly was in a superblock, you can use the `superblocks` or
`currentcontractaverage` [RPC commands](rpc "wikilink") to help. Running `currentcontractaverage` 
will show you what was in the latest superblock, and `superblocks [NUMBER] true` will 
show you what was in the last `[NUMBER]` superblocks. Make sure to replace `[NUMBER]`
with an actual number when you run the command

---
# Footnotes

[^1]: It's not going to exactly be 24 hours, but it will usually be very close. If convergence isn't achieved for whatever reason (scrapers don't match), it could take longer than 24 hours
[^2]: Of the *active* scrapers, but it also cannot be lower than 2 scrapers regardless of how many are active