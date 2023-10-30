---
title: Whitelist Process 
description: Overview of how projects get added to the whitelist
layout: wiki
---

# Notice

Are you a project admin? Jump to the [information for project admins](#information-for-project-admins "wikilink") section  
Looking for what projects are on the whitelist? Go to [this whitelist page](/guides/whitelist.htm "sitelink")

# General Overview

The whitelist is a list or projects that you can be rewarded Gridcoin for doing
work on BOINC in. One aim of the process is to make sure that things are fair
for cruncher or to project admins.

## The Process

The overall process looks like this: 
1. A project is found that meets criteria for being considered for whitelisting
2. The project admin is contacted to see if they would be interested in going on the whitelist
    * They must agree somewhere public (at least before a poll) so people can verify
3. If they agree, a valid poll is made
4. If the community votes to add the project, it is then whitelisted

### Criteria For Being Considered

*  Project Work Availability Score (WAS) is green
    * Means that the seven day median new credit / the 40 day median credit is greater than 0.1
        * Checks that there isn't a low amount of credit recently given out compared
          to its past
^
*   Number of Zero Credit Days (ZCD) is less than or equal to 7 out of the last 20 days
    * Means that there can't be more than 7 days out of the last 20 that the project didn't give out
      credits
^
*   The project has a clear description of the what it does and the project 
    work is as described

*   The project allows new user registration

*   Project complies with the BOINC terms of service

*   All crunchers that comply with the terms of service of both BOINC and the 
    project have equal access to work units

### Admin Contact

The project admin should reached out to and if they agree to wanting to be whitelisted,
should say this somewhere public such as on a project forum, social media, etc.
This should also say when they would like to be whitelisted. If it's anytime, 
they should say that. If they want to wait x months, say for ramping up their 
servers, they should say that as well.

If they are not interested, please do not pester the project admin. Some admins 
aren't interested and that's ok. There are plenty of reasons such as server capacity 
concerns that are completely valid for why they wouldn't want to be whitelisted

### Whitelist poll
If the admins approves, a whitelist [poll](voting "wikilink") can be made. Currently 
polls can only be made by people with over a balance of 100 thousand Gridcoin. 
It doesn't cost 100k GRC --- you just need to have 100k GRC. The aim of this is 
to reduce the number of spam in polls. If you do not have 100k GRC, try to find someone 
that does who can make it for you (can ask on Reddit, Discord, Slack, etc.)

A whitelist poll must have

*   A main poll discussion thread on Github or Reddit

*   Secondary discussion threads on Github, Reddit, and Steemit with links to each in each thread

*   Minimum 3 weeks (21 Day) poll time

*   A "Yes" option, a "No" option, and an "Abstain" option

A whitelist poll is approved if the majority (excluding abstentions) vote yes, it gets an
[active vote weight](https://github.com/gridcoin-community/Gridcoin-Tasks/issues/227#:~:text=Active%20vote-weight) 
of 20% or greater, and the above steps are met, the project is now on the whitelist

### What Happens Next

Now the project is on the whitelist. In the next [superblock](superblock "wikilink"), you will start
to see people able to earn rewards for the project. 


# Greylisting

If a whitelist project gets a WAS that is red or a ZCD that is above 7, 
it will be temporarily put on the greylist. Projects on the greylist act as if they
aren't whitelisted (no one earns anything from these projects). As soon as the
project meets both requirements again, they will be put off the greylist and 
you will be able to earn rewards again. 

If a project doesn't meet this requirements
for a while, a poll can be made for delisting the project and removing it from
the whitelist. Contact must be attempted with the admin before a poll and only
after that poll passes will a project be removed 


---

# Information for project admins

## What's the whitelist?
Gridcoin has a list of projects that it rewards called the whitelist. People crunching on these projects are able to earn new Gridcoin from it. The creation and distribution of new Gridcoin is what sends the rewards to people crunching on a project, so a project does not have to spend anything for people to earn Gridcoin. You don't have to worry about distributing the rewards either, Gridcoin handles all of that. All you have to do is publish your user's stats for Gridcoin to base rewards off.

## What are the advantages of being on the whitelist?
The main advantage of being on the whitelist is that more people will be interested in crunching on your project. Whitelisting usually leads to a large increase in users on the project increasing the available computing power. This could help you expand the scope of the work computed and or get faster results. Secondly, being on the whitelist helps increase awareness of the project. More people will see that the project exists since people using Gridcoin will often look at the whitelist to decide what to use BOINC for.

## What are the disadvantages?
Similar to the main advantage, whitelisting generally leads to a large number of users. There also are a few bots ([scrapers](scraper "wikilink")) that will gather statistics to help distribute Gridcoin for the amount of work done. Currently in 2021 there are 11 scrapers. The scrapers pull the users.gz file
around once every 24 hours. The scrapers and the increase in users can potentially put extra strain on your servers. 

Secondly, this can potentially incentivize more cheating because people now can earn money from credits. However it also incentivises people to try and catch cheating since they would be losing out on the Gridcoin gained by the cheater 

## What's the whitelisting process?

1. The first step is making sure you as the admin of the project want to be whitelisted. You should state somewhere publicly that you are interested and a date when they would want this to happen (anywhere that someone could check such as project forums, Reddit, etc). 
2. Find someone to make a poll for you on Gridcoin (or make one yourself)
3. If the community votes "yes", then you get whitelisted. So far nearly every project put to a whitelist poll has been whitelisted, our users are enthusiastic about contributing to science!

## Some things you might want to do beforehand
Check that your servers can handle an increase in demand and check that credit is distributed evenly

## What if I change my mind?
If at any point in the future you want to be removed form the whitelist, you can request a removal and the project will be removed from the whitelist 

## What about whitelisting further in the future?
That's a valid option too. You don't have to whitelist right away

## How much are the rewards my user's receive worth?

Rewards are distributed across all projects equally through a system called <a href="magnitude.html">magnitude</a>. There are 28,750 GRC minted per day as rewards, so your project's users would receive 1/n of these rewards, with n being the total number of whitelisted projects (currently {{ site.data.whitelist.projects.size }}).

Each user will receive a portion of the rewards allocated to your project. Their portion is relative to other crunchers on your project. So, for example, if a user completed 10% of your project's total recent average credit, they would receive 10% of the total reward. As a project admin, you can use any system you like for allocating credit so long as it is reasonable. For example, you can allocate extra credit for the quick turnaround of workunits or for certain types of workunits.

Users can then keep these GRC, sell them via an exchange, donate them, or use them to purchase goods or services from vendors which accept GRC.

The formula for figuring out the daily rewards your users will receive in total is:

`(current GRC value) * (28750/ number of whitelisted projects)`

You can find GRC's current and historical price through an exchange monitoring site like <a href="https://coinmarketcap.com/currencies/gridcoin/" rel="nofollow">CoinMarketCap</a>. Gridcoin does not control the price of GRC, it is determined by market conditions.

## Can I increase the amount of rewards my user's receive?

Absolutely! Increasing the reward amount can incentivize additional crunching on your project and is often much cheaper than purchasing additional computation from cloud and compute providers, as users are often crunching at a loss or break-even. You can do this via the `rainbymagnitude` feature, which allows you to distribute additional rewards to users based on their relative contribution to your project. This will work just as if the amount of GRC allocated to your project the day of your "rain" is +x where x is the amount you are "raining". Note that this does not provide _guaranteed_ compute, but does help incentivize people to compute more.

1. Choose an amount to add to your total incentive. We suggest at least the current total amount of your incentive. So if your project normally receive x GRC per month, make your "rain" x GRC as well.
2. Let your users know that you will be dispensing additional rewards, the amount of the additional rewards, and when the amount will be "rained". You can do this via an announcement on your site. It's probably a good idea to also post about it on Gridcoin's reddit, discord, and other communities. Giving users a heads up of several weeks will give them time to reconfigure their machines and increase their recent average credit.
3. Purchase GRC from an <a href="../guides/acquire-grc.htm">exchange</a> or a community member. If you buy them on an exchange, you'll need to move them to your wallet.
4. On the day you wish to dispense the rewards, open your Gridcoin wallet and wait until it is fully synced (cloud icon bottom right of wallet).
5. In the wallet, go to Hamburger menu (top left) -> Help -> Debug Window -> Console
6. Type in the command `listprojects` to find your project name
7. Type in the command `rainbymagnitude "your_project_name" amount "message"`. For example: `rainbymagnitude "universe@home" 300 "Thank you for crunching universe!"`

---

# Source Text

In 2019, a poll was made that set the current standards and requirements for polls.
Section 7 goes into depth about whitelist requirements and what the whitelist
polls need to look like

From the [github thread for poll](https://github.com/gridcoin-community/Gridcoin-Tasks/issues/227)

>  ---
> 
> ## 7. Whitelist
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

---
