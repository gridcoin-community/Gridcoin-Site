---
title: RPC Commands
layout: wiki
redirect_from:
  - "/Dev/rpc-reference.htm"
  - "/Wiki/RPC"
---

# Introduction

RPC commands are a way to preform various actions on the wallet or get 
information from the wallet through text. They can take in parameters
to tell the command more information. They are run like `command parameter`.
They can be run in a few main ways: 

1. Enter RPC commands in the console by going to help -> debug window -> console 
 * Use this if you are on Windows, MacOS, or are otherwise using the 
   gridcoinresearch-qt version of the wallet

2. if you are running the daemon, type `gridcoinresearchd [RPC COMMAND]`
in a terminal. 
 * this requires configuring the gridcoinresearch.conf with `rpcuser=gridcoinrpc`   
   and `rpcpassword=[LONG_PASSWORD]` and `rpcallowip=127.0.0.1` replacing 
   `[LONG_PASSWORD]` with something long (you do not have to memorize it)

If you want to understand more about the technicals of RPC as a protocol (used by
more than just Gridcoin) see the [RPC Wikipedia page](https://en.wikipedia.org/wiki/Remote_procedure_call)

# Command List

Commands here are grouped into the categories displayed by the help command
explained further down. If a command requires the wallet to be unlocked, it will 
have a bullet point in italics. Rarely some commands may show 
`Error: Keypool ran out` and require you to unlock. These commands are not 
listed, but unlock your wallet if you see this error

Parameters listed in `<>` are required, and parameters listed in `[]` are 
optional. Parameters in `[]` can be nested if an optional parameter needs 
another parameter to be used. Example: `[parameter1 [parameter2]]` in here 
parameter 2 is optional but needs parameter 1 if you use it, and parameter 1 
is optional with no requirements. Parameters in `()` are all optional

Note that commands referencing account are not referring to addresses. Accounts 
are basically just a system of labels. This is likely to be depreciated at some
point in the future and overhauled

If you have a specific command you want to find, searching with 
ctrl-f (Windows/Linux) or command-f (MacOS) is recommended 

* help `[category or command]`
  * Use help with either a specific command or category to learn more about it.
    For instance, `help wallet` will list out commands that are related to 
    the wallet and your coins. `help getwalletinfo` would  display information 
    about the getwalletinfo command. Running just `help` will give you the list 
    of categories and information on how to use the help command


## Wallet

* addmultisigaddress `<nrequired> <'["key","key"]'> [account]`
  * Adds a multisignature address to the wallet. Returns the address addeded. 
    Requires to tell the number of keys needed for a transaction and list of 
    keys (keys are either addresses or a hexadecimal public key).If an account 
    is given, the address will go into that account. Multisignature addresses 
    make it so that you can share a wallet with multiple people and 
    require `nrequired` people to approve of a transaction. The maximum number 
    keys is 16.
    Example usage: `addmultisigaddress 2 '["key1","key2","key3"]'`


* addredeemscript `<redeemScript> [account]`
  * Adds a reedemscript specified in hex to the wallet. Will return the address
    generated.  If `account` is given, the pay to script hash will go into 
    that account. For more information about what a redeemscript is see the 
    [Bitcoin's reedemscript Wiki Page](https://bitcoin.org/en/glossary/redeem-script) 
    on it. For information about the concept of a pay to script hash see 
    [Bitcoin's Pay To Script Hash wiki page](https://en.bitcoin.it/wiki/Pay_to_script_hash)

* backupprivatekeys
  * *Requires the wallet to be fully unlocked*

  * Creates a backup of the private keys and creates a keys.dat files (also 
    includes the date in the filename). The data in the file is formatted 
    like this: `Address: ADDRESS, Secret: PRIVATE KEY`. File location and 
    `"result": true` will be given if it successes, otherwise it will show 
    an error message. 

* backupwallet
  * Creates a backup of the wallet.dat and gridcoinresearch.conf files 
    (it also adds dates in the backup files' names). Returns if it was 
    successful for each file The files will be created in the walletbackups 
    folder. See the [Config Wiki Page](Config-File) to find the location for 
    your operating system of the walletbackups folder and other Gridcoin files 

* burn `<amount> [hex string]`
  * *Requires the wallet to be fully unlocked*

  * Creates a transaction that will send the given amount (rounded to 0.00000001) 
    to no one making the coins disappear permanently. **No one can get back
    the coins spent by this command.** If `[hex string]` is specified, 
    it will add on to the script used in the transaction.

* checkwallet
  * Checks that the wallet is reporting the correct balance and is not missing 
    any transactions. Returns `"wallet check passed": true` if it finds no 
    issues. On error it will return:
    ```
    "mismatched spent coins": nMismatchSpent
    "amount in question": nBalanceInQuestion
    ``` with nMismatchSpent  numbers showing the number of transactions missed 
    (either counted when it shouldn't be or not counted when it should) and 
    nBalanceInQuestion showing the amount involved in those transactions 
    (absolute value, does not subtract)
    . 
* consolidatemsunspent `<address> <multi-sig-type> <block-start> <block-end> <max-grc> <max-inputs>`
  * Applies to multisignature addresses only and searches for UTXOs smaller than
    `<max-grc>` to combine into one UTXO. `<address>` is the multisignature
    address, `<multi-sig-type>` is a number which tells many signatures you 
    have and how many are total (1 = 2 out of 3  
    2 = 3 out of 4   
    3 -> 3 out of 5   
    4 ->  4 out of 5). `<block-start>` is the first block you want to search for
    UTXOs from. `<block-end>` is the block number where you want the search to
    stop. `<max-grc>` is the largest transaction size to combine. `<max-inputs>`
    is the maximum number of transactions to consolidate. 
* consolidateunspent `<address> [[UTXO size [maximum number of inputs]]`
  * **This does not help with staking** the only exception to this is if you
    are combining transactions under 0.0125 GRC, otherwise this will not help

  * *Requires the wallet to be full unlocked*

  *  This command will combine UTXOs together into one. A UTXO is what's 
     leftover from a transaction (unspent transaction output). The command looks 
     for UTXOs only on on the given address. `UTXO size` is limit of the size of 
     the new combined UTXO (i.e the maximum amount to combine together). 
     `maximum number of inputs` is the limit on the number of UTXOs to combine.
     If it can't find UTXOs to consolidate, it will return `result: false` and
     `UTXOs consolidated: 0`. If it succeeds, it will return `result:true` and
     `UTXOs consolidated: NUMBER` and `Output UTXO value: AMOUNT` where `NUMBER`
     and `AMOUNT` are numbers. Other errors will show error messages with error:
     whatever error.

* createrawtransaction `[{"txid":"id","vout":n},...] {"address":amount,"data":"hex",...}`
  * Creates a hex version of a transaction from raw JSON data. First parameter 
    is the inputs, the second parameter is the outputs. Returns the hex encoding 
    of the transaction. Does not send or store this transaction. 

* decoderawtransaction `<hex string>`
  * Takes in a raw hexadecimal encoding of a transaction and converts into JSON.
    Does the opposite of the createsrawtransaction command. 

* decodescript `<hex string>`
  * Takes in the raw hexidecimal form of a transaction script and returns it in
    JSON form. Example Usage:  
    `decodescript 76a914caf8b5c9a8f18317fa86dbdd549631cd1cd5d05088ac`  
    Example Returns:  
    ```{
    "asm": "OP_DUP OP_HASH160 caf8b5c9a8f18317fa86dbdd549631cd1cd5d050 OP_EQUALVERIFY OP_CHECKSIG",
      "reqSigs": 1,
      "type": "pubkeyhash",
      "addresses": [
        "SGTcVAUpiYhC7MHy8CpcqxNh8krjjYAH4Y"
      ],
      "p2sh": "bVBBhWk5k9cWsR2pNzhmjuBEAYDS2CtLBg"
    }```


* dumpprivkey `<gridcoinaddress>`
  * *Requires the wallet to be fully unlocked*

  * Returns the private key for `<gridcoinaddress>`. The private key is what
    your wallet uses to prove it owns coins which lets it send your coins. 
    **Do not give the output of this command to anyone** as they would be able to
    spend all your coins from that address.

* dumpwallet `<filename>`
  * *Requires the wallet to be fully unlocked*

  * Creates a file with all your private keys. Requires the path to a file
    with `<filename>` (can be relative or absolute) File formatted similar to 
    backupprivatekeys. Contains a few comments at the top about the file 
    creation. After that each line is formatted like: 
    `PRIVATE_KEY UTC_TIME [reserve=1, change=1 or label=LABEL] #addr=ADDRESS`
    the very last line of the file is `# End of dump`

* encryptwallet `<passphrase>`
  * Encrypts the wallet with the passphrase given. This gives some protection 
    (follow other security practices still) against an someone being able to 
    steal coins if they have access to your system. After encrypting, you 
    will have to restart the wallet. Creating a new backup of the wallet is 
    recommended since any old copies will not include any new addresses made 
    by the wallet. **Make sure to use a secure password.**

* getaccount `<gridcoinaddress>`
  * Returns the account name that goes with the given address. Note that account
    name is just a label you assign.

* getaccountaddress `<account>`
  * Finds if an existing address in under an account name and if not it 
    will generate a new address under that account name. Returns the address 
    (either existing or generated), nothing else is returned. 

* getaddressesbyaccount `<account>`
  * Returns a list of addresses under the account name. If no addresses are 
    found, an empty list of:  
    `[ 
    ]` will be returned

* getbalance `( "account" minconf includeWatchonly )`
  * Returns the balance of the wallet. If account is given, it will return the
    balance for only that account (if you set it to `*`, it will use all account).
    If `minconf` is given, it will only include transactions with at least that
    many confirmations. If includeWatchonly is given as true, it will include
    the balance from addresses which are watch only.

* getnewaddress `[account]`
  * Creates a new address to send Gridcoins to. If account is specified, it will
    go under that account label. 

* getnewpubkey `[account]`
  * Creates a new address and returns the hexadecimal form of the address. If an 
    account is given, the address will go into that account

* getrawtransaction `<txid> [verbose=bool]`
  * Lists out the raw hexidecimal data from a transaction. If verbose is given
    as true, it will list it as JSON data with other transaction information.
    Requires the transaction to be given from it's ID (txid).

* getreceivedbyaccount `<account> [minconf=1]`
  * Returns the total amount in the given account label. If minconf is given, it
   will limit the transactions it looks at to ones with at least that many
   confirmations. Confirmation are the number of blocks after a transaction

* getreceivedbyaddress `<Gridcoinaddress> [minconf=1]`
  * Returns the total amount received on `<Gridcoinaddress>`. If minconf is 
    given, it will limit the transactions it looks at to ones with at least that 
    many confirmations. Confirmation are the number of blocks after a 
    transaction

* gettransaction `<txid> [includeWatchonly]`
  * Returns JSON information about a transaction (`<txid`). includeWatchOnly 
    defaults to false. If set to true, it will search transaction which are from
    watch only addresses

* getunconfirmedbalance
  * Returns total unconfirmed balance of the wallet. Unconfirmed transactions
    are ones that have less than 10 blocks after them.

* getwalletinfo
  * Returns information about the wallet in JSON format. Returns:
      * the version of the wallet (walletversion)
      * the balance of the wallet (balance)
      * gridcoin from new stakes which have not yet matured (newmint)
      * the total amount staked (stake)
      * the oldest key from the keypool which is what's used to
        generate addresses (keypoololdest)
      * how many keys are in the keypool (keypoolsize)
      * If unlocked: when it will lock again (unlocked_until)
      * If the wallet is currently staking (staking)
      * Any errors stopping it from staking (mining-error)
    
* importprivkey `<gridcoinprivkey> [label] [bool:rescan]`
  * _require the wallet to be fully unlocked_

  * Adds a private key (can be gotten from dumpprivkey) to the wallet. If 
  `[label]` is given, it will go into that account label. `rescan` is set to
   true by default. If set to true, it will check for the balance of the private 
   key and update the wallet's balance and list of transactions. If set to 
   false, it will skip this check and not update the balance.

* importwallet `<filename>`
  * _requires the wallet to be fully unlocked_

  * Imports keys from a wallet dump file (generated from dumpwallet). 
  `<filename>` should be a path to the file. Does not return anything unless
  there's an error.

* keypoolrefill `[new-size]`
  * _requires that a passphrase had been set and requires the wallet to be fully 
    unlocked_

  * Fills up the keypool with new keys. The keypool is what's used to create 
    new addresses. If `[new-size]` is given, it will create that many keys.
    By default it will add 100 new keys. If the `-keypool` argument is given to
    the wallet, it will use that value by default instead.

* listaccounts `( minconf includeWatchonly)`
  * _Command only runs if you enable it with `enableaccounts=1` in the
    config file. This is because it is deprecated_

  * Returns a JSON listing of all the accounts labels in the wallet and their 
    balances. `minconf` is the minimum number of confirmations to use when 
    getting the balance. `includeWatchonly` includes addresses into the balance 
    that are watch only

* listaddressgroupings
  * Returns a list of what addresses can be proved to be linked together by 
    something looking at the blockchain such as an explorer. These addresses
    are group by: using the same inputs, are a change address, or if listed 
    alone are not publicly linked to others on the blockchain. 
    
  * *Note that there are other ways to accidentally show which addresses you own. 
    This just tells you what can be inferred from public transactions assuming 
    that you gave no other information.*

* listreceivedbyaccount `( minconf includeempty includeWatchonly)`
  * _Command only runs if you enable it with `enableaccounts=1` in the
    config file. This is because it is deprecated_
  
  * Returns a list of balances on each account in JSON format. `minconf` is the 
    minimum number of confirmations to use when getting the balance. 
    `includeWatchonly` includes addresses into the balance that are watch
    only. `includeempty` includes accounts that have no balance
  
* listreceivedbyaddress `( minconf includeempty includeWatchonly)`
  * Returns a list of the balance of each address. The list is formatted as:  
    `[
      {
        "involvesWatchonly" : TRUE/FALSE
        "address" : ADDRESS,  
        "account" : ADDRESS ACCOUNT,
        "amount\" : AMOUNT            
      }, ...
     ]`
     `minconf` is the minimum number of confirmations to use when getting the 
     balance. `includeWatchonly` includes addresses into the balance that 
     are watch only. `includeempty` includes addresses that have no balance 

* listsinceblock `( "blockhash" target-confirmations includeWatchonly)`
  * Lists transactions to and from your wallet since a given block. If no block
    is given, it will list all transactions. `blockhash` is the hash of the
    block you want to start your search from, `target-confirmation` is the
    number of confirmation a transaction needs to be in the results. 
    `includeWatchonly` includes transactions from addresses which are watch only

* listtransactions `( "account" count from includeWatchonly)`
  * Returns a JSON list of the most recent transactions to and from the wallet. 
    If `account` is given, it will list only transactions from that account. 
    `count` is the number of transactions to list (defaults to 10). `from` will
    skip over that number of transaction. `includeWatchonly` includes
    transactions from watch only addresses.

* listunspent `[minconf=1] [maxconf=9999999]  ["address",...]`
  * Returns a list of transaction which have not be used in another one (UTXOs).
    `minconf` is the minimum number of confirmations to include a transaction in
    the last.`maxconf` is the highest number confirmation to have the transaction
    included. `address` is a list of addresses, and if given it will look only
    at unspent transactions in those addresses 

* makekeypair `[prefix]`
  * Generates an address and returns the public and private key. This command 
    does not store the key anywhere. `[prefix]` adds a text to the front of the
    public key

* move `<fromaccount> <toaccount> <amount> [minconf=1] [comment]`
  * _Command only runs if you enable it with `enableaccounts=1` in the
    config file. This is because it is deprecated_
  
  * This command does not send a transaction. It moves `<amount>` from 
    `<fromaccount>` to `<toaccount>`. This can result in negative 
    and or incorrect balances. `[minconf]` is ignored. `[comment]` is just a 
    comment

* rain `[UniValue](UniValue::VARR)`
  * *Requires the wallet to be fully unlocked*

  * Rains Gridcoin to a list of a addresses. If you are looking to rain to 
    crunchers of a project, use rainbymagnitude instead . Addresses and amounts 
    should be given as a single string like this `ADDRESS<COL>AMOUNT<ROW>`. Note 
    that there is not any closing tag (`</>`) with COL or ROW. On success it 
    will return `Rain successful: Sent AMOUNT.` where `AMOUNT` is the amount 
    sent. 

* rainbymagnitude `<whitelisted project> <amount> [message]`
  * *Requires the wallet to have converged scraper statistics* 

  * Rains Gridcoin proportional to magnitude to the cruncher of a project. 
    `<whitelisted project>` is a whitelisted BOINC project. BOINC project name's
    can be seen with the projects command (note that it will list more than 
    whitelisted projects). If you want to rain to all projects, use `*`
    as the project name. `<amount>` is the amount you want to rain. `[message]`
    is a message that goes along with the transaction 

* repairwallet
  * Helps fix difference between what the wallet shows as the balance and what
    the balance should be (note this will not help if you are not synced). To
    check if there is any issues, run the checkwallet command. Returns the same
    output as the checkwallet command, but it will fix the issues instead, 

* resendtx
  * Resends transactions that are unconfirmed (meaning it has not been included
    in a block yet).

* reservebalance `[<reserve> [amount]]`
  * Reserves a certain balance to not stake keeping it spendable and from going
    on cooldown. `<reserve>` is set to either true to enable to or false to 
    disable a reserve. `[amount]` is the amount to reserve. If `[amount]` is set
    too high, you may not be able to stake.

* scanforunspent `<address> <block-start> <block-end> [bool:export] [export-type]`
  * Looks for UTXOs in `<address>` that are within blocks `<block-start>` to
    `<block-end>`. Blocks are given by number. If no UTXOs are found it will 
    return `Result: "No utxos found in specified range"`. If `[export]` is set to 
    true, it will create a file in backup-dir/rpc. `[export-type]` can be
    txt, xml or json and will control the type of the file created.

* sendfrom `<account> <gridcoinaddress> <amount> [minconf=1] [comment] [comment-to] [message]`
  * *Requires the wallet to be fully unlocked and requires that it has been
     encrypted*

  * Sends `<amount>` of Gridcoin from `<account>` to `<gridcoinaddress>`. 
  `[minconf]` is the minimum number of confirmations for a UTXO to be used. 
  `[comment]` is a personal comment about what the transaction is for (doesn't
   go into the transaction, it is only stored locally). `[comment-to]` is also 
   a personal comment about who you are sending to (also only local). `[message]`
   is a message/comment that is sent publicly on the transaction. 

* sendmany `<fromaccount> {address:amount,...} [minconf=1] [comment]`
    * *Requires the wallet to be fully unlocked and requires that it has been
     encrypted*

  * Send from `<fromaccount>` to a list of addresses. Use `''` if you don't
    want to limit to one account label. Addresses should be listed in JSON
    format. `[minconf]` limits to using UTXO with at least that many 
    confirmations. `[comment]` is just a comment 

* sendrawtransaction `<hex string>`
  * Send a transaction given from raw hexadecimal. These types of transaction
    can be created with createrawtransaction and signrawtransaction, 
    **but use extreme caution. It is easy to create a different transaction than 
    what you intended to make.** Returns the transaction id if successful

* sendtoaddress `<gridcoinaddress> <amount> [comment] [comment-to] [message]`
  * *Requires the wallet to be fully unlocked and requires that it has been
     encrypted*

  * Sends `<amount>` of Gridcoin  to `<gridcoinaddress>`. `[minconf]` is the 
    minimum number of confirmations for a UTXO to be used. `[comment]` is a 
    personal comment about what the transaction is for (doesn't go into the 
    transaction, it is only stored locally). `[comment-to]` is also a personal 
    comment about who you are sending to (also only local). `[message]` is a 
    message/comment that is sent publicly on the transaction. 

* setaccount `<gridcoinaddress> <account>`
  * Sets `<gridcoinaddress>` to be in `<account>` account label. Returns nothing
    if it succeeds.

* settxfee `<amount>`
  * Sets the transaction fee that the wallet will use in transactions. Rounds
    to 0.00000001 GRC

* signmessage` <Gridcoinaddress> <message>`
  * *Requires the wallet to be fully unlocked*

  * Returns a signed a message using the private key from `<Gridcoinaddress>`. 
    Lets you prove that this message came from the owner of an address. You can 
    verify a signed message with the verify message command. (It will not send 
    this message anywhere. You have to do that)

* signrawtransaction `<hex string> [{"txid":txid,"vout":n,"scriptPubKey":hex},...] [<privatekey1>,...] [sighashtype="ALL"]`
  * *Requires the wallet to be fully unlocked and requires that it has been
     encrypted*

  * Sign inputs for raw transaction from hexadecimal. Second argument (optional) 
    is an array of UTXOs that this transaction uses (may or may not be 
    in the blockchain). Third argument (optional) is an array of base58-encoded 
    private keys that, if given, will be the only keys used to sign the transaction. 
    `[sighashtype]` is a string with one of: ALL, NONE, SINGLE or 
    ALL|ANYONECANPAY, NONE|ANYONECANPAY, SINGLE|ANYONECANPAY.

    Returns with:
      * hex : raw transaction with signature(s) (hex-encoded string)
      * complete : 1 if transaction has a complete set of signature (0 if not)

* validateaddress `<gridcoinaddress>`
  * Returns information about the address given. Returns:
    * isvalid (if it's a valid address. If false this it all it returns)
    * address (the address you gave)
    * ismine  (if it's one of your addresses)
    * account (account label the address is in. Only given if ismine is true)

* validatepubkey `<gridcoinpubkey>`
  * Returns information about the public key given. Returns:
    * isvalid (if it's a valid address. If false this it all it returns)
    * address (the address it corresponds with)
    * ismine  (if it's one of your addresses)
    * iscompressed (if the public key is it's compressed form)
    * account (account label the address is in. Only given if ismine is true)

* verifymessage `<Gridcoinaddress> <signature> <message>`
  * Checks that a signed message (can be generated with the sign message command)
   is valid. Takes in the address the message is supposed to correspond with and
   the signature for the message along with the message itself. If no other
   error is returned, it will return true if the signed message is valid and
   false if it is not.

* walletlock
  * Locks the wallet if encrypted. Returns nothing on success 

* walletpassphrase `<passphrase> <timeout> [stakingonly]`
  * Unlocks the wallet for `<timeout>` amount of time. `<passphrase>` is the
    passphrase used to encrypt the wallet. If `[stakingonly]` is given as true, 
    it will only allow stakes to go through and will not allow any other 
    transaction. Unlocking with stakingonly if you intend to leave your wallet
    staking is recommended. However, some commands listed here may require you to 
    fully unlock your wallet and not just unlock for staking.

* walletpassphrasechange `<oldpassphrase> <newpassphrase>`
  * Changes the passphrase on a wallet if encrypted. Changes from 
 `<oldpassphrase>` to `<newpassphrase>`. Make sure to use a secure passphrase

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

