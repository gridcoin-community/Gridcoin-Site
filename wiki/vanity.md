---
title: Vanity Addresses
layout: wiki
---

# Overview
Vanity addresses are personalized addresses that are created with the intention to include a phrase or name in the address.

This allows the creation of addresses such as: **SDeLtA**zzaNkvom9HzVgdHHGToEjZ7sYipp

# Generating Vanity Addresses
1. Download the latest release of [vanitygen-plus](https://github.com/exploitagency/vanitygen-plus)
2. Disconnect your computer from the internet (optional)
3. Run the program:
Linux CPU: `./vanitygen -C GRC -o results.txt -i -k YOUR_PREFIX`  
Linux GPU (OpenCL): `./oclvanitygen -C GRC -o results.txt -i -k YOUR_PREFIX`  
Windows CPU: `vanitygen.exe -C GRC -o results.txt -i -k YOUR_PREFIX`  
Windows GPU (OpenCL): `oclvanitygen.exe -C GRC -o results.txt -i -k YOUR_PREFIX`  

 * `-C GRC` : Chooses to generate Gridcoin addresses
 * `-o results.txt` : saves the matches to results.txt  
 * `-i` : case-Insensitive(do not add this flag to match exact case)  
 * `-k` : keep going even after match is found (do not add this flag to stop after the first match)  
 * `YOUR_PREFIX` : the address prefix you are searching for (Check the list of valid address prefixes in the next section.)

## Importing private keys.

1. Open results.txt
2. Choose your desired address
3. Open your wallet and navigate to Help -> Debug window
4. Execute `importprivkey PRIVATE_KEY LABEL False` - More details can be found in `help importprivkey`
  * `importprivkey` : command to import private keys (addresses) into the wallet
  * `PRIVATE_KEY` : the private key of the address you have chosen
  * `LABEL` : a friendly name that you can assign to your new address
  * `False` : since the address has not been used before you can skip the long process of checking the chain for pre-existing transactions using your new address

# Valid Prefixes
Gridcoin addresses start with either R or S. There are also a restricted set of characters which are allowed for the second character (see the table below). The rest of the address can only have base58 characters (`123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz`)

Thanks to Random Daz for compiling this list of valid addresses.

| Starting with R | Starting with S |
|-|-|
| Rw, Rx, Ry, Rz | S1, S2, S3, S4, S5, S6, S7, S8, S9, SE, SA, SD, SF, SG, SH, SJ, SK, SL, SC, SB, SM |
