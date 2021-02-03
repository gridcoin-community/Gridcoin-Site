--- 
title: Magnitude
layout: wiki
---

# Introduction

The Gridcoin network encompasses multiple types of BOINC projects, each one with a different methodology for calculating credit. These differences are reconciled through an innovative mechanism called Magnitude, which subsequently determines reward calculations.

# Methodology

The Gridcoin network has a Total Magnitude of 115,000 that is evenly distributed across all whitelisted projects. As there are currently 16 whitelisted projects, this results in a Project Magnitude of 7,187.5. This Project Magnitude is distributed among its Gridcoin crunchers in proportion to their RAC. Lastly, each Cruncher's Magnitude is calculated by adding the total sum of their magnitudes across all whitelisted projects. This calculation is illustrated through the examples below. 

# Impact

By distributing the Total Magnitude of 115,000 equally across all projects, the Gridcoin Network ensures that less popular projects would provide higher returns for crunchers. This creates an incentive for crunching power to be distributed evenly across the whitelisted projects, thereby ensuring that all whitelisted projects benefit equally from the network.

# Rewards Calculation

Gridcoin rewards for crunching are determined by magnitude. Magnitude updates every superblock which happen nearly once per 24 hours. The reward can be calculated from a cruncher's magnitude according to the following formula:

- Gridcoin per Day = Cruncher's Magnitude / 4

The pending rewards themselves are updated by the second in the Gridcoin wallet.

# Examples

#### Example 1

Adam is crunching exclusively on World Community Grid. His RAC is as follows:
- World Community Grid: 10,000

The total Project RAC across all Gridcoin Crunchers is as follows:
- World Community Grid: 10,000,000

Adam's Magnitude can then be calculated:
- World Community Grid: (10,000/10,000,000)*7,187.5 = 7.1875

As this is the only whitelisted project Adam is crunching, he would have a Total Magnitude of 7.1875.

#### Example 2

Eve is crunching GPUgrid, World Community Grid and Rosetta@home. Her RAC across the various projects is as follows:
- GPUgrid: 3,000
- World Community Grid: 7,000
- Rosetta@home: 9,000

The total Project RACs across all Gridcoin crunchers are as follows:
- GPUgrid: 6,000,000
- World Community Grid: 10,000,000
- Rosetta@home: 20,000,000

Eve's Magnitude in each project would then be:
- GPUgrid: (3,000/6,000,000)*7,187.5 = 3.5938
- World Community Grid: (7,000/10,000,000)*7,187.5 = 5.0312
- Rosetta@home: (9,000/20,000,000)*7,187.5 = 3.234375

Eve's Total Magnitude would then be 3.5938 + 5.0312 + 3.234375 = 11.859375
