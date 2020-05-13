---
title: RPC Commands
layout: wiki
---

Enter RPC commands in the console visible at menu help - debug window -
console. In windows debug console you can type commands from below to
get textual answers. Assuming you are running the daemon, typing
gridcoinresearchd COMMAND may do the trick.

## Help Commands

  - list help
      - Displays help on various available list commands

<!-- end list -->

  - execute help
      - Displays help on various available execute commands

## Project / Network Information

  - list projects
      - This command will list all the BOINC projects that are available
        and valid for Gridcoin Magnitude and PoR (White-Listed
        Projects).
      - Consult <http://boinc.berkeley.edu/projects.php> if the output
        from 'list projects' contains some non-verified (information NOT
        researched and confirmed) BOINC projects.

<!-- end list -->

  - list network
      - Gets the current BOINC projects list and network magnitude (sums
        of every valid CPIDs magnitude)
      - With this command you can see if network averages are
        increasing/decreasing for a single project. E.g.: if Avg RAC is
        increasing for a project, it will drop your mag over time as
        competition heats up for that particular project.

<!-- end list -->

  - list magnitude
      - List magnitude (and more) for every CPID the network knows.
      - Here is the list of info shown for every CPID:
          - CPID
          - Magnitude
          - Payment Magnitude
          - Payment Timespan (Days)
          - Magnitude Accuracy
          - Long Term Owed (14 day projection)
          - Long Term Daily Owed (1 day projection)
          - Payments
          - InterestPayments
          - Last Payment Time
          - Current Daily Projection
          - Next Expected Payment
          - Avg Daily Payments

## CPID Related

  - list cpids
      - Shows ALL the BOINC projects you have contributed to, even ones
        that are no longer valid

<!-- end list -->

  - list validcpids
      - Shows ONLY your BOINC projects that are valid, in order to
        filter down the report to valid cpid projects with Verified RAC
        \> 100 and Verified Team = Gridcoin

<!-- end list -->

  - list explainmagnitude
      - This command breaks down how your CPID's magnitude is
        calculated.

<!-- end list -->

  - list rsa
      - "list rsa" = "list mymagnitude"
  - list mymagnitude
      - The list rsa / list mymagnitude commands looks at the last 1440
        blocks in the chain and reports the total payments for your
        CPID. So that is where "Payments:" come from and THAT is why it
        changes.
      - Long Term Owed: The projected amount of your magnitude \* mag
        multipler \* 14.
          - This changes as time goes on as your mag gets to be higher
            accuracy with us (we used weighted square of time to
            determine your mag). The numbers in the RSA are consensus
            numbers for your CPID, with more weight placed on the most
            recent verified mag by the node.
          - long\_term\_owed = payment\_timespan \*
            Cap(research\_magnitude\*GetMagnitudeMultiplier(locktime),
            GetMaximumBoincSubsidy(locktime));
      - Payment Magnitude Entry: This is only useful if you have a
        Magnitude \> Maxblocksubsidy\*.90 (IE 1800 today). This shows
        your adjusted lederstrumpf magnitude used in payment
        calculations.
      - Accuracy: That should be the amount of blocks in the chain for
        this CPID.
      - Last Payment Time: The last time the CPID was paid PoR in a
        block.
      - Long Term Owed (14 days) is what you would earn if all things
        remain the same, i.e. magnitude, etc. It's a guesstimate, as
        nothing remains totally constant.
      - Next Expected Payment is usually half of your total owed up to
        the daily maximum of 400GRC, in order to break up payments
        across blocks.

<!-- end list -->

  - list rsaweight
      - retrieve "RSA Weight", "Remote Magnitude", "RSA Owed"

<!-- end list -->

  - list magnitudecsv
      - Creates a magnitude report CSV in
        %appdata%\\GridcoinResearch\\Reports or
        \~/.GridcoinResearch/Reports/

<!-- end list -->

  - execute resetcpids
      - Gridcoin will reload CPIDs from the local BOINC client. If any
        new projects are detected, they will then be looked up in the
        Netsoft XML. This happens automatically after about 25 minutes,
        but this can speed up the process.

## Staking

  - reservebalance true AMOUNT
      - By default your client will try to stake with all available
        coins that have matured for 16 hours in your wallet.
      - This command allows you to reserve a set amount of coins that do
        not stake and are therefore always available for spending.
      - `Example: reservebalance true 455`

<!-- end list -->

  - getstakinginfo
      - "getstakinginfo" = "getmininginfo"
  - getmininginfo
      - Lists Information on the current block, mining settings, and
        network difficulty.
      - Documentation of Stake Miner and "getmininginfo"
            explanation.
          - <https://github.com/gridcoin/Gridcoin-Research/blob/master/doc/stake-miner.txt>

## Network/Peer Information

  - getinfo
      - Information about the current wallet version, balance and
        network state.

<!-- end list -->

  - getpeerinfo
      - Lists connected peers and their block heights.

## Block/Transaction Information

  - getblockhash <blockID>
      - Returns a hash to identify the specific block. This can be used
        to determine whether you are on the same fork as someone else.

<!-- end list -->

  - getblockbynumber \[blockID\]
      - Returns information related to the specified block

<!-- end list -->

  - getbalance
      - Displays the total balance of the loaded wallet.

<!-- end list -->

  - getreceivedbyaddress
      - Displays the total number of coins received by a Gridcoin
        address.

<!-- end list -->

  - listtransactions
      - Displays all transactions associated with the loaded wallet.

<!-- end list -->

  - createrawtransaction \[{"txid":txid,"vout":n},...\]
    {address:amount,...}
      - Create a raw transaction using specified inputs

<!-- end list -->

  - signrawtransaction <hex string>
    \[{"txid":txid,"vout":n,"scriptPubKey":hex},...\]
    \[<privatekey1>,...\] \[sighashtype="ALL"\]
      - Sign a raw transaction

## Wallet Related

  - checkwallet
      - Checks wallet for corruption.

<!-- end list -->

  - repairwallet
      - Attempts to repair a corrupted wallet if corruption is detected.

<!-- end list -->

  - walletpassphrase YOURPASSWORD TIMEOUT true
      - Unlock encrypted wallet for staking only

## Halt / Reboot

  - stop
      - Terminate the Gridcoin client.

<!-- end list -->

  - execute reboot
      - Reboots the Gridcoin client.

## Disable Windows Error Reporting

  - execute DISABLE\_WINDOWS\_ERROR\_REPORTING
      - Optional feature for windows users : Suppress Windows Error
        Reporting Dialog : to set this key execute this command from the
        rpc. This means that when an app crashes on the node, you will
        not receive the Windows Error Reporting Dialog - Would you like
        to check the internet for solutions or Debug this program? The
        program will just end.
      - Note: Crash dumps will still be created and stored in the
        standard location if you set this key.
      - This feature was requested August/September 2014 in testnet -
        its not really needed with a stable client, but may be useful
        when we go back to testnet.

## Gridcoinresearchd Commands

{% comment %} The captures are to allow multiliple lines and keep the table working properly {% endcomment %}

{% capture newline %}
{% endcapture %}

{% capture table %}
|Command|Parameters|Description|Requires unlocked wallet?|
|--- |--- |--- |--- |
|addmultisigaddress|<'["key","key"]'> [account]|Add a nrequired-to-sign multisignature address to the wallet. 
Each key is a Gridcoin address or hex-encoded public key. 
If [account] is specified, assign address to [account]. Returns a string containing the address.|N|
|addnode||Attempts add or remove  from the addnode list or try a connection to  once.|N|
|backupwallet||Safely copies wallet.dat to destination, which can be a directory or a path with filename.|N|
|createmultisig|<'["key,"key"]'>|Creates a multi-signature address and returns a json object||
|createrawtransaction|[{"txid":txid,"vout":n},...] {address:amount,...}|Creates a raw transaction spending given inputs.|N|
|decoderawtransaction||Produces a human-readable JSON object for a raw transaction.|N|
|dumpprivkey||Reveals the private key corresponding to|Y|
|encryptwallet||Encrypts the wallet with .|N|
|getaddednodeinfo|[node]|Returns information about the given added node, or all added nodes (note that onetry addnodes are not listed here) If dns is false, only a list of added nodes will be provided, otherwise connected information will also be available.|N|
|getbalance|[account] [minconf=1]|If [account] is not specified, returns the server's total available balance. If [account] is specified, returns the balance in the account.|N|
|getblock||Returns information about the block with the given hash.|N|
|getblockcount||Returns the number of blocks in the longest block chain.|N|
|getblockhash||Returns hash of block in best-block-chain at|N|
|getconnectioncount||Returns the number of connections to other nodes.|N|
|getdifficulty||Returns the proof-of-work difficulty as a multiple of the minimum difficulty.|N|
|getinfo||Returns an object containing various state info.|N|
|getmininginfo||Returns an object containing mining-related information: blocks currentblocksize currentblocktx difficulty stakeweight stakeinterest testnet Mininginfo|N|
|getnewaddress|[account]|Returns a new Gridcoin address for receiving payments. If [account] is specified payments received with the address will be credited to [account].|N|
|getpeerinfo||Returns data about each connected node.|N|
|getrawchangeaddress|[account]|Returns a new Gridcoin address, for receiving change. This is for use with raw transactions, NOT normal use.|N|
|getrawmempool||Returns all transaction ids in memory pool|N|
|getrawtransaction|[verbose=0]|Returns raw transaction representation for given transaction id.|N|
|getreceivedbyaccount|[account] [minconf=1]|Returns the total amount received by addresses with [account] in transactions with at least [minconf] confirmations. If [account] not provided return will include all transactions to all accounts. (version 0.3.24)|N|
|getreceivedbyaddress|[minconf=1]|Returns the amount received by  in transactions with at least [minconf] confirmations. It correctly handles the case where someone has sent to the address in multiple transactions. Keep in mind that addresses are only ever used for receiving transactions. Works only for addresses in the local wallet, external addresses will always show 0.|N|
|gettransaction||Returns an object about the given transaction containing:
"amount" : total amount of the transaction

"confirmations" : number of confirmations of the transaction
"txid" : the transaction ID
"time" : time associated with the transaction[1].
"details" - An array of objects containing:

"address"
"category"
"amount"
"fee"
|N|
|gettxout|[includemempool=true]|Returns details about an unspent transaction output (UTXO)|N|
|gettxoutsetinfo||Returns statistics about the unspent transaction output (UTXO) set|N|
|getwork|[data]|If [data] is not specified, returns formatted hash data to work on:

"midstate" : precomputed hash state after hashing the first half of the data
"data" : block data
"hash1" : formatted hash buffer for second hash
"target" : little endian hash target

If [data] is specified, tries to solve the block and returns true if it was successful.|N|
|help|[command]|List commands, or get help for a command.|N|
|importprivkey|[label] [rescan=true]|Adds a private key (as returned by dumpprivkey) to your wallet. This may take a while, as a rescan is done, looking for existing transactions. Optional [rescan] parameter added in 0.8.0. Note: There's no need to import public key, as in ECDSA (unlike RSA) this can be computed from private key.|Y|
|listaddressgroupings||Returns all addresses in the wallet and info used for coincontrol.|N|
|listreceivedbyaccount|[minconf=1] [includeempty=false]|Returns an array of objects containing:

"account" : the account of the receiving addresses
"amount" : total amount received by addresses with this account
"confirmations" : number of confirmations of the most recent transaction included|N|
|listreceivedbyaddress|[minconf=1] [includeempty=false]|Returns an array of objects containing:

"address" : receiving address
"account" : the account of the receiving address
"amount" : total amount received by the address
"confirmations" : number of confirmations of the most recent transaction included

To get a list of accounts on the system, execute:
$ gridcoinresearchd listreceivedbyaddress 0 true|N|
|listsinceblock|[blockhash] [target-confirmations]|Get all transactions in blocks since block [blockhash], or all transactions if omitted. [target-confirmations] intentionally does not affect the list of returned transactions, but only affects the returned "lastblock" value.1|N|
|listtransactions|[account] [count=10] [from=0]|Returns up to [count] most recent transactions skipping the first [from] transactions for account [account]. If [account] not provided it'll return recent transactions from all accounts.
Example, to show 100 transactions for the default account, skipping the last 20:
$ gridcoinresearchd listtransactions "" 100 20|N|
|listunspent|[minconf=1] [maxconf=999999]|Returns array of unspent transaction inputs in the wallet.|N|
|listlockunspent||Returns list of temporarily unspendable outputs||
|lockunspent|<unlock?> [array-of-objects]|Updates list of temporarily unspendable outputs||
|sendrawtransaction||Submits raw transaction (serialized, hex-encoded) to local node and network.|N|
|sendtoaddress|[comment] [comment-to]|is a real and is rounded to 8 decimal places. Returns the transaction ID  if successful. 
Comment fields are for sending wallet only and are not sent with the transaction.|Y|
|setaccount||Sets the account associated with the given address. Assigning address that is already assigned to the same account will create a new address associated with that account.|N|
|setgenerate|[genproclimit]|is true or false to turn generation on or off.
Generation is limited to [genproclimit] processors, -1 is unlimited.|N|
|settxfee||is a real and is rounded to the nearest 0.00000001|N|
|signmessage||Sign a message with the private key of an address.|Y|
|signrawtransaction|[{"txid":txid,"vout":n,"scriptPubKey":hex},...] [,...]|Adds signatures to a raw transaction and returns the resulting raw transaction.|Y/N|
|stop||Stop Gridcoin server.|N|
|validateaddress||Return information about .|N|
|verifymessage||Verify a signed message.|N|
|walletlock||Removes the wallet encryption key from memory, locking the wallet. After calling this method, you will need to call walletpassphrase again before being able to call any methods which require the wallet to be unlocked.|N|
|walletpassphrase||Stores the wallet decryption key in memory for  seconds.|N|
|walletpassphrasechange||Changes the wallet passphrase from  to .|N|
{% endcapture %}
{{table | newline_to_br | strip_newlines | replace: "|<br />",newline | remove: "<br />"}}

{% comment %} 
  See comments at the bottom for explination of how the capture works and why its needed
  for the wbesite
{% endcomment %}


## Generic List of Commands

  - execute commands
      - Usage: execute <string::itemname> <string::parameter>
      - Found in code:
        <https://github.com/gridcoin/Gridcoin-Research/blob/733c1078253e4e17d43c256cb15e730ea73c9b9a/src/rpcblockchain.cpp#L1411>
      - list of Commands
          - restorepoint
          - reboot
          - neuralrequest
          - advertisebeacon
          - syncdpor2
          - gatherneuralhashes
          - beaconstatus
          - beaconreport
          - neuralreport
          - myneuralhash
          - superblockage
          - unusual - not finished
          - neuralhash
          - vote
            <title>
            <answer>
          - addpoll
            <title>
            <days> <question> \<answer1;answer2;answer\#\> <ShareType>
              - Sharetype -
                1=Magnitude,2=Balance,3=Both,4=CPIDCount,5=ParticipantCount
              - note that you must use underscores in place of spaces
          - votedetails
            <title>
          - listpolls
          - listpolldetails
          - listpollresults
            <title>
          - staketime
          - testnewcontract
          - rac <cpid>
          - encrypt <passphrase>
          - testboinckey
          - genboinckey
          - encryptphrase <phrase> - not working that I can tell
          - decryptphrase <phrase> - not working that I can tell
          - contract - not finished
          - wcgtest - a testing command
          - syncrac
          - dportally
          - superblockaverage
          - getlistof <keytype>
              - beacon
              - neuralsecurity
              - poll
              - project
              - vote
              - superblock
          - listdata <key>
          - chainrsa <cpid>- not working that I can tell
          - testcpidv2
          - testcpidv2
          - DISABLE\_WINDOWS\_ERROR\_REPORTING
          - testcpid
          - reindex
          - downloadblocks
          - executecode
          - volatilecode
          - startwireframe
          - tally
          - testhash
          - resetcpids
          - backupwallet
          - restorewallet
          - resendwallettx
          - postcpid
          - encrypt\_deprecated
          - findrac
  - list commands
      - Usage: list <string::itemname>
      - Found in code:
        <https://github.com/gridcoin/Gridcoin-Research/blob/733c1078253e4e17d43c256cb15e730ea73c9b9a/src/rpcblockchain.cpp#L3143>
      - list of Commands
          - networktime
          - rsaweight
          - explainmagnitude
          - magnitude
          - debug3
          - currenttime
          - magnitudecsv
          - opencontracts
          - detailmagnitudecsv
          - mymagnitude
          - rsa
          - projects
          - leder <magnitude>
          - network
          - validcpids
          - cpids

<!-- end list -->

1.  From block timestamp, unless transaction was already in memory pool
    then the local time when the client added the transaction to its
    memory pool



{% comment %}
  Explanation on the captures from above:

  The first capture labled newline just captures a newline so that it can be used for replacement (escape codes don't work).
  The Second caputre gets the table then it's then fed to a few filters.
  The filters replace the newlines in the table's text with <br>, then it replaces only <br>'s after
  pipes, then it removes all other <br>'s. This makes it so that if you have something go over in text length such as:
       | Text too long to fit on
       one line and be legible |
       
  it will ignore all the newlines in between and just put in the one after the pipe to make the table work
{% endcomment %}

