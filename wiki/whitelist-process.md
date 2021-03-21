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
of 40% or greater, and the above steps are met, the project is now on the whitelist

### What Happens Next

Now the project is on the whitelist. In the next superblock, you will start
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
Gridcoin has a list of projects that it rewards called the whitelist. People crunching on these projects are able to earn new Gridcoin from it. The creation and distribution of new Gridcoin is what sends the rewards to people crunching on a project, so a project does not have to spend anything for people to earn Gridcoin. 

## What are the advantages of being on the whitelist?
The main advantage of being on the whitelist is that more people will be interested in crunching on your project. Whitelisting usually leads to a large increase in users on the project increasing the available computing power. This could help you expand the scope of the work computed and or get faster results. Secondly, being on the whitelist helps increase awareness of the project. More people will see that the project exists since people using Gridcoin will often look at the whitelist to decide what to use BOINC for.

## What are the disadvantages?
Similar to the main advantage, whitelisting generally leads to a large number of users. There also are a few bots ([scrapers](scraper "wikilink")) that will gather statistics to help distribute Gridcoin for the amount of work done. Currently in 2021 there are 11 scrapers. The scrapers pull the users.gz file
around once every 24 hours. The scrapers and the increase in users can potentially put extra strain on your servers. 

Secondly, this can potentially incentivize more cheating because people now can earn money from credits. However it also incentivises people to try and catch cheating since they would be losing out on the Gridcoin gained by the cheater 

## What's the whitelisting process?
The first step is making sure you as the admin of the project want to be whitelisted. If you, somewhere public you should say that you were interested and a date when they would want this to happen (anywhere that someone could check such as project forums, Reddit, etc). Following this, find someone to make a poll for you on Gridcoin. Lastly if the community votes votes "yes", then you
get whitelisted.

## Some things you might want to do beforehand: 
Check that your servers can handle an increase in demand and check that credit is distributed evenly

## What if I change my mind?
If at any point in the future you want to be removed form the whitelist, you can request a removal and the project will be removed from the whitelist 

## What about whitelisting further in the future?
That's a valid option too. You don't have to whitelist right away

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