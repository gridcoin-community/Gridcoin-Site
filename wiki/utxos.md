---
title: UTXOs
layout: wiki
description: Information about how what UTXOs are, how they work, and why they matter
---


# Introduction

An unspent transaction output (UTXO) is what's left over from a transaction.
Under the hood of most cryptocurrencies, Gridcoin included, everything runs
on this concept.

UTXOs are like bills.[^1]When you receive a transaction, you get a "bill" of a
specific size. When you send a transaction you make "bills" of other sizes. 
To make a transaction you must use up those "bills" exactly

The network doesn't think in terms of balances.  Everything is checked
through transaction inputs and outputs. Balances are simply a nicer way for 
people to look at thing --- not how the network thinks

# Sending Transactions
When you make a transaction it has to use up existing UTXOs (as inputs) and create new ones (as outputs). 
The network doesn't look at balances --- just what came out of one transaction. 
After an output is used up, they are no longer UTXOs and become spent transaction outputs.

## Example Diagram
![Diagram showing a "wallet" with different UTXOs that looks like "bills". Shows two being selected  as inputs(and becoming spent) that are 15 and 45 Gridcoin. Shows and arrow represent a transaction of 60 Gridcoin and three new UTXOs as outputs of 20 Gridcoin, 35 Gridcoin, and 15 Gridcoin](/assets/img/wiki/utxo-diagram.svg){: class="img-fluid mx-auto"}

## Verbal Examples

### Example 1

You only ever received 50 Gridcoin in a transaction from Bob and you want to send 
25 Gridcoin to Alice.

You would use up that 50 Gridcoin UTXO to in a transaction as an input and have 
two outputs: one to Alice with the 25 Gridcoin and another to yourself 
with the leftover 25 Gridcoin (you must use up all of a UTXO). 

You went from having 1 UTXO that was 50 Gridcoin large to having 1 new UTXO that
is 25 Gridcoin large. The 50 Gridcoin output is now spent and cannot be used again


### Example 2
Suppose you wanted to send 400 Gridcoin of your balance of 500 Gridcoin 
to Alice and Bob. You have only ever received 5 transactions each 
made of 100 Gridcoin

To make this transaction you would use 4 UTXOs (totals 400 Gridcoin) 
as an input and you would have two outputs: one to Bob of 200 Gridcoin and one 
to Alice with 200 Gridcoin. No output to yourself is needed here

You went from having 5 UTXO that were 100 Gridcoin large to having 1 UTXO that
is 100 Gridcoin large. Four of the five 100 Gridcoin outputs are now spent 
and cannot be used again

## Example Looking at a Real Transaction
(Randomly selected transaction)

Transaction ID:  
`c9ac9f4e771a2c8510411fa007cd0ac501d10c74dfdfa225eab1be98108bb12a`

* Involves 6 006.0311 GRC because it uses up an output from the transaction
  `a1a2050495ac7e44f0c8727f2c430520fb1eea6724a992b8801e7095e116ac17` that is
  that exact size

* Has only one input

* Has two outputs
    * One with `1.1705 GRC` 
    * One with `6 004.8596 GRC` (likely sent back to the original sender)
   
* {% include _start_dropdown.htm 
    dropdown-header="More technical transaction details (click to expand)"
    %}
      
    Below is the JSON output from `gettransaction` but annotated and simplified
    (irrelevant details & alternative formats removed). Don't worry if you
    don't understand what's below. It's not something you need to know to
    understand UTXOs 

    Everything with `-----` around it is annotation. You may have to
    scroll to the right to read all of them

    ```
    {
    "vin": [ ----- (INPUTS) -----
        {
        "txid": "a1a2050495ac7e44f0c8727f2c430520fb1eea6724a992b8801e7095e116ac17", ----- (INPUT TRANSACTION) -----
        "vout": 0, ----- (FIRST OUTPUT FROM THAT TX IS USED UP) -----
        "scriptSig": { ----- (PROVE OWNERSHIP OF INPUT) -----
            "asm": "3044022065fb8633839d5188f2545a71fb6a116dbf362388848d0bca5f9dad2f42ef616c02204e1f871b31f72a3b4772fc404bbf8c7681862fff1a9629da082b194c21d3becc01 0348e0c550c94114f3874c02769b748f167177f1786b0d6e269f26183af8f6e9a1",
        },
        "sequence": -1
        }
    ],
    "vout": [ ----- (OUTPUTS) -----
        { ----- (FIRST UTXO) -----
        "value": 5904.04678755,
        "n": 0,
        "scriptPubKey": {  ----- (REQUIREMENTS TO SPEND NEW UTXO) -----
            "asm": "OP_DUP OP_HASH160 c4602570098f0a40cb7d44a05d896bb021cc278d OP_EQUALVERIFY OP_CHECKSIG", ---- (REQUIRE KEY TO SEND)  --------
            "addresses": [
            "SFrjfgyAJXmAgeasfNbYGEe7yYPmaMKKhG" ----- (RECIPIENT OR OTHER ADDRESS OF SENDER ) -----
            ]
        }
        },
        { ----- (SECOND UTXO) -----
        "value": 100.81185269,
        "n": 1,
        "scriptPubKey": { ----- (REQUIREMENTS TO SPEND NEW UTXO) -----
            "asm": "OP_DUP OP_HASH160 bf39722f50a3ec44c057a86fc1541e76bcabb860 OP_EQUALVERIFY OP_CHECKSIG",  ----- (REQUIRE KEY TO SEND)  -----
            "addresses": [
            "SFPVvnxuL9vr4ojRtuoVKbyWZvuhu8wvgn" ----- (RECIPIENT OR OTHER ADDRESS OF SENDER ) -----
            ]
        }
        }
    ]
    }
    ```
    {% include _end_dropdown.htm %}

# Staking

[Staking](staking "wikilink") similarly works on a UTXO level. When you stake, it is actually an
individual UTXO that stakes.


## Probability

Staking working with UTXOs may be confusing at first if you have read about
how total balance is the only factor (excluding cooldowns) that changes odds of staking.
The odds are just designed so that 1 UTXO or any number of UTXOs of the same 
total will have the same *total* odds to stake. 

Think of it as if your coins were part of a "raffle" and your UTXOs were a chunk
of "tickets". No matter how you segment your "tickets" (total GRC), you still 
have the same odds of "winning" (staking).

## Reward Coinstake Transaction 

The UTXO that staked is used up and a new special transaction 
is formed to send rewards. This special transaction is called a coinstake. A coinstake uses
your staked UTXO as an input, but it's allowed to send more coins than the input[^2]to 
send you your rewards for staking. Coinstake are where the new coins come from. They include the new
coins and fees from other transactions in the block.
Coinstakes (and coinbases) are also how the very first UTXOs on the network were made.

Note that in Proof of Work cryptocurrencies, this is called a coinbase[^3]instead 
of a coinstake. Gridcoin technically does still have a coinbase transaction,[^4]in 
every block but they are not used any more (since block 2049 --- the last PoW block). The coinstake
is where the actual reward comes from after then

The new UTXO from staking is unable to used in as an input for the next 100 blocks,
and like any UTXO, it will also undergo a cooldown for staking


## Relation to Cooldown & Efficiency

When a new UTXO is created, it is unable to stake for the first 16 hours.[^5]This time 
is called a cooldown. The aim of the cooldown is to make a 51% attack more difficult

Since staking creates a new UTXO, that UTXO goes on cooldown. This means that
when you stake, part of your balance will be offline and unable to stake. Thus
having your balance split across smaller UTXOs will make staking more efficient 
since less of your total balance will be offline after a stake. 

More efficient staking can be achieved with adding `stakesplit=1` to your
[config file](config-file "wikilink"). This will make the reward transaction
have multiple outputs to yourself instead of one thus splitting your 
UTXO into multiple (if it helps efficiency by a reasonable amount)

# Rational Behind UTXOs

The reason that the network uses UTXOs instead of storing balances is because
it is much easier and quicker to lookup and validate a UTXO. Using total balances
requires looking at every transaction that ever occurred on an address and 
makes transaction validation much more complex


# Other Miscellaneous Notes

* You can control which exact UTXOs are used as inputs and created as outputs
using the coin control feature in the GUI. If on Ingrid (5.3.1.0) or higher this
is the dropdown that shows when you send a transaction


* The size in bytes (and thus fees) of a transaction is determined largely 
by the number of inputs and output and not directly with the number of Gridcoin moved

* Trying to use too many UTXOs as either an input or an output in one transaction 
can make a transaction too big in bytes to send. This can be fixed
by either making multiple transaction or consolidating your UTXOs if inputs are 
the problem. See the [troubleshooting section of the FAQ](faq#troubleshooting "wikilink") for
how to consolidate your UTXO


# Footnotes
[^1]: Not literally --- there's no physical "bill" for them 
[^2]: It's not allowed to send as many coins as you want --- just what you are owed for staking (new coins) and the fees from the transactions in the block (not new coins)
[^3]: A coinbase transaction is what the company Coinbase is named after, but they are otherwise unrelated to the actual coinbase transaction
[^4]: The coinbase transaction is the 0th (index 0) transaction in every block and the coinstake is the 1st (index 1) transaction in the block since 2049
[^5]: This is not an approximation of the number of blocks. It is defined in the code in terms of time
