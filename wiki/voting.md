---
title: Gridcoin Voting System
layout: wiki
description: Overview of Gridcoin's voting system, how to vote, what the requirements for polls are and more
---

# Introduction

Gridcoin has a voting system in place to help find what the community thinks on
a specific issue or where the community wants the coin to go. Polls on Gridcoin
have ranged from [adding projects to the whitelist](whitelist-process#whitelist-poll "wikilink") to
changing how rewards are given out

# Voting on a Poll

First, find the polls that are currently running. In the GUI this can be done by 
clicking on the vote tab. Right click on the poll and press either vote or
show results to see more information including the discussion about the poll.
For non-GUI users, the `listpolls` command can be used to find active polls

Make sure to read about the poll and see some of the discussion before you vote

To vote, right click on the poll and press vote. Then click on your answer and
press the vote button below. Non-GUI users can vote by using the `votebyid`
command like this `votebyid <ID> <CHOICE>` (the poll ID can be found with the earlier
mentioned `listpoll` command)


# How Votes Are Weighted

How much your vote counts is weighted based off of your balance plus (for solo crunchers) 
your [magnitude](magnitude "wikilink").

The formula for exactly how it's weighted can be found [here](#11-vote-weight-and-active-vote-weight "wikilink")

# Poll Requirements
In 2019, the current standards that polls need to follow was approved. It laid out
what types of polls there were and what each poll type needs to pass 


All polls but the opinion/casual polls require:
* A main discussion thread on GitHub or reddit
* Secondary discussion threads on GitHub, Reddit, and Steemit with links to each
in each thread
* Unbiased poll phrasing and options
* An abstain option

Each category has its own requirements which are listed in the [poll types](#poll-types "wikilink") section of this page 

To pass, a poll must get a majority of the vote and must be at or above the poll's
active vote weight (AVW) requirement. AVW is an estimate how much voting
weight is from users who are active on the network. It is described in more detail 
in the [active vote weight](#active-vote-weight "wikilink") section


## Requirements for Funding
Any poll that requests funding must state:
* Intended use of funds
* The date of work begin
* The date of work end
* Total funding requested (denoted in GRC)
* When funds are released
* How funds are released
* The payee's name or alias
* The payee's wallet address
* Reliable contact information


# Poll Types 

There are seven main poll types

## Opinion/Casual

These polls are non-binding so they don't have any particular requirements. They
can be specific or can focus on the broader picture. They can also be used 
to gauge community interest on something for development before more work is
put in

Example: [Opinion Poll: Should Gridcoin Reward Folding@home?](http://main.gridcoinstats.eu/poll/9af4b51f00841ab82f444c218c47b80d0c590098e6d0237fa02489652055cb83/1/ended:1) (note
folding@home is not a part of [BOINC](boinc "wikilink"), so this poll was 
about interest in making an adapter and not for whitelisting)


## Development

Development polls are for changing some parts of Gridcoin at a protocol level. 
For instance changing the amounts for rewards would be a development poll.

These types of polls require a minimum duration of 6 weeks (42 days) and
development polls require an AVW of more than 50% to pass.

## Marketing

Polls that propose marketing initiatives. For instance could be a plan 
to run an ad

Marketing polls require a minimum duration of 3 weeks (21 days) and an AWV
of 40% or more to pass

Example: [Gridcoin Marketing And Engagement Initiative](http://main.gridcoinstats.eu/poll/e00f2fbcc5ebf3137d65ef6ff0ac4f624d19b744c77fcf93a43096066bd40e60/1/ended:1) 


## Outreach

Polls about community outreach, representation, etc. Can be proactively trying
to reach out to new places or keep up relations. Can also be retroactive to
reimburse outreach as well

Outreach polls require a minimum duration of 3 weeks (21 days) and an AVW of
40% or more to pass

Example: [Boinc Workshop Reimbursement Poll - Outreach](http://main.gridcoinstats.eu/poll/dfcd0785ab079bf8cbe1f7b1c411670836d6f369c356895df1dfcdbe81952b1b/1/ended:1)
or [Updated White Paper Proposal](http://main.gridcoinstats.eu/poll/933e3c1e9c7413f3b64e0d312a5ec004d161638a78ec238cbf6bc26e15f77d5a/1/ended:1)

## Management

Mostly for changing the requirements of the polls. Defined in the currently voted in standard 
as "any proposal which seeks to modify the management or organizational structure of Gridcoin." 

Management polls require a minium duration of 3 weeks (21 days) and an AVW of 20%
or more to pass  

## Community

Proposals or initiatives related to the Gridcoin community, but not to the
other poll types

Requires a minimum duration of 3 weeks (21 days) and an AVW of 10% or more 
to pass

## Whitelist

Polls to remove or add projects to the whitelist. For an overview of the process
that must be completed beforhand to add a project, please view the 
[whitelist process](whitelist-process "wikilink") wiki page. For the removal of a project, 
there must be an attempt at contact with the project admin before making the poll 
 
Whitelist polls to add a project must have a project that meets the following criteria:
* Project Work Availability Score is green
* Number of Zero Credit Days is less than or equal to 7 out of the last 20 days
* The project has a clear description of the work and the work is as described
* The project allows new user registration
* Project complies with the BOINC terms of service
* All crunchers that comply with the terms of service of both BOINC and the project have equal access to work units

Additionally, before a poll is made to whitelist there must be:
* Direct contact with a project administrator
* An affirmative public response to whitelisting by a project administrator
* An agreed add date with both the Gridcoin whitelist administrator and project admin

Whitelist polls have a minimum duration of 3 weeks (21 days) and require an 
AVW of 40% or more 


Valid Example: [[whitelist] Remove Project Drug Discovery From The Whitelist?](http://main.gridcoinstats.eu/poll/32eb3a9b578533f69abd77e8dbf0026bcfca1148cd805c54dabf14bca395f226/1/ended:1)


# Creating a Poll

To create a poll you must have a balance of at least 100k GRC. The poll
itself only costs 50 GRC + transaction fees. There is just a 100k GRC balance 
requirement to minimize the amount of spam polls

Second, to actually create the poll, click on the voting tab and then press
create poll. Make sure to follow all the rules listed above and fill out each field.
Non-GUI users can create polls using the `addpoll` command 

## Help With Creating a Poll 

If you need some help writing the text of a poll or do not have 100k GRC, 
the `#poll-drafts` channel on the Gridcoin Slack is a good place to ask. There 
are people there who can help give feedback or help create a poll for you


# What Happens To Invalid Polls

If a poll doesn't follow the requirements for its category, it is considered
invalid. This could be for example because a poll is too short. Invalid polls 
are pretty much treated like they don't exist. These polls are not binding, 
so the results don't matter. 

So an invalid whitelist poll would not have a project be whitelisted no matter 
its result, an invalid poll that requests funding wouldn't receive funding, etc.

Note that after an invalid poll, a future valid poll can be made on the same 
topic and that new poll would be binding

# Active Vote Weight

Active vote weight aims to find the number of vote weight active on the network.
It looks at the number of coins that are [staking](staking "wikilink") and the
[magnitude](magnitude "wikilink") not in the pools. AVW is calculated at the 
time of the poll

The percent AVW on a poll is the percent of the network's total AVW that has voted
on the poll. Note that it is possible to have a poll with greater 
than 100% AVW. It implies that users who were inactive came online to vote. 

If you want to get an estimate of what percent of poll's AVW is or was without 
doing the calculation yourself, [gridcoinstats.eu](http://main.gridcoinstats.eu/poll)
lists the vote weight value for every poll as % of AVW in parenthesis


The exact formula for AVW can be found [here](#11-vote-weight-and-active-vote-weight "wikilink")


# Source Text
Text from the GitHub thread that defines the current poll definitions and requirements. 
It was written as something to be voted on which is why it list some of the details 
about the vote itself that aren't relevant anymore since it was passed and approved

See the [GitHub thread](https://github.com/gridcoin-community/Gridcoin-Tasks/issues/227) 
for more details. Below is a verbatim quote of the proposal 


> This is the main discussion thread for the proposal
> 
> [Reddit Discussion Thread](https://www.reddit.com/r/gridcoin/comments/be9pbv/proposal_and_poll_poll_definitions_requirements/)
> 
> [Steemit Discussion thread](https://steemit.com/gridcoin/@jringo/> proposal-and-poll-poll-definitions-requirements-and-validation-parameters)
> 
> * * *
>
> # Introduction
> 
> * * *
> 
> Gridcoin polls help guide decision making on the Gridcoin network. It is difficult to use the polls without clear definitions and validation parameters. This will become increasingly difficult as we continue to grow and decentralize as a network and community.
> 
> This proposal seeks to establish rule-based requirements and definitions for the polling process. To do this polls are broken into seven categories each with unique requirements and parameters.
> 
> If approved, this document will be adopted as the network's polling definitions and protocol. There is no alternative proposal if rejected.
> 
> ### Changes Since Pre-proposal Post
> 
> [Pre-Proposal Post](https://steemit.com/gridcoin/@jringo/pre-poll-discussion-poll-defintions)
> 
> Based on the results of the [GUI Bounty Poll](https://steemit.com/gridcoin/@jringo/proposal-and-poll-gridcoin-gui-implementation-fund-match) that achieved 15+% TVW and 50+% AVW, I have reduced the AVW requirements for all poll types by 10%. I have also set all required poll time except for developer polls to 3 weeks (21 Days). Developer polls remain at a 6 week poll time requirement.
> 
> I have also reduced the validation requirements for this poll from 60% to 40%.
> 
> The goal of this proposal is to define achievable requirements along with a process for changing them as a framework to build on in the future.
> 
> ### Poll Details
> 
> **Duration:** 3 weeks [21 Days]
> 
> **Start Date:** April 17th  
> **End Time:** May 8th 16:13 UTC
> 
> **Question**  
> Do you approve of the proposed poll definitions, requirements, and validation parameters.
> 
> **Answers**
> 
> *   Yes
> *   No
> *   Abstain
> 
> **Validation**
> 
> 40% or more AVW participation
> 
> ### Credits
> 
> This proposal would not be possible without the work done by [@jamescowens](https://github.com/jamescowens) and everyone involved in the #economics slack discussion when putting together the CBR proposal and original AVW definitions. Credit for the original whitelist definitions and process just about copy and pasted into this proposal goes to [@guk](https://github.com/guk) and everyone in the #boinc_projects slack channel that contributed during that discussion.
> 
> And of course a huge thank you to everyone in #poll-definitions on slack and during the hangouts and fireside chats for helping assemble and debate the rules proposed below.
> 
> * * *
> 
> * * *
> 
> * * *
> 
> # Proposed poll definitions, requirements, and validation parameters
> 
> * * *
> 
> # 1.0 Voting
> 
> Gridcoin utilizes a protocol based voting mechanism to:
> 
> *   Gauge interest
> *   Inform development and organizational direction
> *   Utilize foundation funds
> 
> Any network participant with a balance of 100k GRC in a wallet can create a poll. A poll must meet all requirements for the appropriate poll type to be considered valid.
> 
> There are seven types of polls:
> 
> 1.  Opinion/Casual
> 2.  Development
> 3.  Marketing
> 4.  Outreach
> 5.  Management
> 6.  Community
> 7.  Whitelist
> 
> # 1.1 Vote Weight and Active Vote Weight
> 
> **Vote-weight** is the power given to a vote cast on the Gridcoin blockchain. It is measured as a modified sum of balance and magnitude. The formula for vote-weight is:
> 
> _VoterBalance+VoterMagnitude((TotalMoneySupply/TotalNetworkMagnitude)/5.67)_
> 
> **Total vote-weight (TVW)** is the total possible vote-weight of the network. It is calculated as a weighted sum of total minted coins and network magnitude.
> 
> _TotalMoneySupply+TotalMagnitude((TotalMoneySupply/TotalNetworkMagnitude)/5.67)_
> 
> **Active vote-weight (AVW)** is a calculated average of the vote weight actively securing the network for the duration of the poll, plus the network magnitude, less the magnitude of any crunching pools. The formula for AVW is:
> 
> _AV-W = (Average Difficulty* 9544371.769) + ((TotalNetworkMagntiude- Average Pool Magnitude)* (Average MoneySupply/TotalNetworkMagnitude)/5.67)_
> 
> AVW as a metric solves the validation problems of total vote-weight validation, including missing vote-weight due to lost and burned coins, coins in cold storage, coins held by exchanges, and vote-weight frozen by crunching pools.
> 
> AVW enables high weight validation via active network participants.
> 
> AVW enables super-validation. Super-validation is a validation percentage greater than 100%. Super-validation implies that inactive balances were brought online to vote on the proposal in question.
> 
> _Note: TotalNetworkMagnitude = 115,000_
> 
> # 1.2 Poll Validation by Active Vote Weight
> 
> Poll validation requirements are intended to ensure no proposal passes without significant network support. Each poll type has its own AVW validation parameter initially defined in this proposal. Validation parameters can be changed through management polls.
> 
> If a poll is not validated no action is taken.
> 
> # 1.3 Requesting Funds in Polls
> 
> Any proposal requesting reimbursement or funding from the foundation must be approved by a network poll.
> 
> Funding can be requested for all poll types except for Opinion/Casual and Whitelist polls. The following information is required if funding is requested in a proposal.
> 
> *   Intended use of funds
> *   The date of work begin
> *   The date of work end
> *   Total funding requested (denoted in GRC)
> *   When funds are released
> *   How funds are released
> *   The payee's name or alias
> *   The payee's wallet address
> *   Reliable contact information
> 
> # 1.4 Poll Types, Requirements, and Validation Parameters
> 
> There are seven poll types. All poll types except for Opinion/Casual must use "Magnitude and Balance" as weight metrics.
> 
> ## 1\. Opinion/Casual
> 
> Opinion/Casual polls are for early exploration of ideas or for fun.
> 
> ### Examples
> 
> *   Do you support the continued exploration of this CBR idea?
> *   Do you support the continued exploration of this protocol change idea?
> *   Masternodes, DPoS, PoS, or PoW?
> *   Cubes or curds?
> 
> ### Poll Requirements
> 
> NONE
> 
> ### Validation Parameters
> 
> NONE
> 
> ## 2\. Development
> 
> Development polls include polls to change a protocol value or for proposing changes to the protocol at large.
> 
> ### Examples
> 
> *   Implement CBR as proposed?
> *   What should the CBR value be at implementation?
> *   Remove the BOINC team requirement?
> *   What should the side-staking development requirement be at implementation?
> *   Implement MRC as defined in this proposal?
> *   Change CBR value to 3.1415?
> *   Change development side-stake requirement to 2%
> 
> ### Development Poll Requirements
> 
> *   Main Poll Discussion Thread on Github or Reddit
> *   Secondary discussion threads on Github, Reddit, and Steemit with links to each in each thread
> *   Minimum 6 weeks (42 days) Poll Time
> *   Unbiased Poll Phrasing and Options
> *   "Abstain" Vote Option
> 
> ### Development Poll Validation Parameter
> 
> *   AVW of 50% or greater
> 
> ## 3\. Marketing
> 
> Marketing polls include any proposal for marketing initiatives.
> 
> ### Examples
> 
> *   Do you support this proposal for taking out an ad in New Scientist magazine?
> 
> ### Marketing Poll Requirements
> 
> *   Main Poll Discussion Thread on Github or Reddit
> *   Secondary discussion threads on Github, Reddit, and Steemit with links to each in each thread
> *   Minimum 3 weeks (21 Days) Poll Time
> *   Unbiased Poll Phrasing and Options
> *   "Abstain" Vote Option
> 
> ### Marketing Poll Validation Parameter
> 
> *   AVW of 40% or greater
> 
> ## 4\. Outreach
> 
> Outreach polls include any proposal which seeks to:
> 
> 1.  Legitimize community representation
> 2.  Compile, build, or maintain proactive documentation
> 3.  Maintain channels of communication for those outside of the network and community
> 4.  Allocate resources to take advantage of outreach opportunities as they present themselves
> 
> ### Examples
> 
> *   Do you support representation at [Conference A] as detailed in this proposal?
> 
> ### Outreach Poll Requirements
> 
> *   Main Poll Discussion Thread on Github or Reddit
> *   Secondary discussion threads on Github, Reddit, and Steemit with links to each in each thread
> *   Minimum 3 weeks (21 Days) Poll Time
> *   Unbiased Poll Phrasing and Options
> *   "Abstain" Vote Option
> 
> ### Outreach Poll Validation Parameter
> 
> *   AVW of 40% or greater
> 
> ## 5\. Management
> 
> Management polls include any proposal which seeks to modify the management or organizational structure of Gridcoin.
> 
> ### Examples
> 
> *   Do you support the proposed management proposal?
> *   Change AVW validation parameter for development proposals to 50%?
> *   Change minimum required poll time for Outreach polls to 4 weeks?
> 
> ### Management Poll Requirements
> 
> *   Main Poll Discussion Thread on Github or Reddit
> *   Secondary discussion threads on Github, Reddit, and Steemit with links to each in each thread
> *   Minimum 3 weeks (21 Days) Poll Time
> *   Unbiased Poll Phrasing and Options
> *   "Abstain" Vote Option
> 
> ### Management Poll Validation Parameter
> 
> *   AVW of 20% or greater
> 
> ## 6\. Community
> 
> Community polls include any proposal or initiative related to the Gridcoin community, but unrelated to any other department.
> 
> ### Examples
> 
> *   Do you support this community competition?
> *   Do you support hosting this crunching competition?
> 
> ### Community Poll Requirements
> 
> *   Main Poll Discussion Thread on Github or Reddit
> *   Secondary discussion threads on Github, Reddit, and Steemit with links to each in each thread
> *   Minimum 3 weeks (21 Days) Poll Time
> *   Unbiased Poll Phrasing and Options
> *   "Abstain" Vote Option
> 
> ### Community Poll Validation Parameter
> 
> *   AVW of 10% or greater
> 
> ## 7\. Whitelist
> 
> A whitelist poll is used to add or remove a project from the whitelist. The whitelist is a larger mechanism within the operation of Gridcoin. Each project considered for whitelisting must meet a set of requirements, and several actions must be taken before a poll for adding or removing a project can be considered valid. A project can be removed from the whitelist at the discretion of the whitelist admin if it ever fails to meet a requirement described below.
> 
> More information including discussion threads that informed the creation of the whitelisting and greylisting processes, information about each project's Work Availability Score and Zero Credit Days, and details on the greylist process are linked at the end of this section.
> 
> ### Project Requirements for Whitelist Consideration
> 
> *   Project Work Availability Score is green
> *   Number of Zero Credit Days is less than or equal to 7 out of the last 20 days
> *   The project has a clear description of the work and the work is as described
> *   The project allows new user registration
> *   Project complies with the BOINC terms of service
> *   All crunchers that comply with the terms of service of both BOINC and the project have equal access to work units
> 
> ### Required Actions before Creation of Project Addition Poll
> 
> *   Direct contact with a project administrator
> *   An affirmative public response to whitelisting by a project administrator
> *   An agreed add date with both the Gridcoin whitelist administrator and project admin
> 
> ### Required Actions before Creation of Project Removal Poll
> 
> _These are necessary only if a project meets all whitelist requirements, is not greylisted, and is otherwise functioning as intended_
> 
> *   A public attempt at contact with a project admin is made
> 
> ### Examples
> 
> *   Add project SETI@Home to the whitelist?
> *   Remove project SETI@Home from the whitelist?
> 
> ### Whitelist Poll Requirements
> 
> *   Main Poll Discussion Thread on Github or Reddit
> *   Secondary discussion threads on Github, Reddit, and Steemit with links to each in each thread
> *   Minimum 3 weeks (21 Day) Poll Time
> *   Poll Options:
>     *   Yes
>     *   No
>     *   Abstain
> 
> ### Whitelist Poll Validation Parameter
> 
> *   AVW of 40% or greater
> 
> ### Whitelist Links
> 
> [Gridcoin Whitelist/Greylist Management Information](https://gridcoin.ddns.net/pages/project-list-process.php)
> 
> [Github Issue #194](https://github.com/gridcoin-community/Gridcoin-Tasks/issues/194)
> 
> [Github Issue #213](https://github.com/gridcoin-community/Gridcoin-Tasks/issues/213)
> 
> [Github Issue #201](https://github.com/gridcoin-community/Gridcoin-Tasks/issues/201)
> 
> * * *
> 
> * * *
> 
> # Conclusion
> 
> * * *
> 
> I believe that clearly defining a rules-based system for polling will substantially increase the efficiency of our decision making as a network and community. The rules-based approach should help us transition the polling process onto the blockchain should we ever find ourselves in a position to do so. I am very open to alternative approaches, however I believe it is time to move forward with what we've got and build on it to fit our needs as they grow. I look forward to the coming discussions and of course, I don't care which way you vote, just vote!
> 
> * * *
> 
> * * *
> 