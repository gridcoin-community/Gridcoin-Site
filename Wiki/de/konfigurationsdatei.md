---
title: Gridcoin Konfigurationsdatei
layout: wiki-de
---

## Standardverzeichnis der Datei gridcoinresearch.conf 

    Windows:  %AppData%\GridcoinResearch\

    Linux:    ~/.GridcoinResearch/

    macOS:    /Users/USERNAME/Library/Application Support/GridcoinResearch/

## Testnet

Hinweis: Der Eintrag *testnet=1* in der Konfigurationsdatei 
wird nicht unterstüzt. Das Argument *-testnet* muß in der Kommandozeile definiert werden.
In der Konfigurationsdatei führt das Schlüsselwort *testnet* zu einem unvorhersehbaren 
Verhalten. Siehe [Testnet](testnet "wikilink") für weitere Informationen.


## Standard Konfigurationsdatei

    #############################################################################
    ################ Beispiel der Datei gridcoinresearch.conf ###################
    #############################################################################
    ##
    ## Für weiterführende Informationen siehe [Testnet](testnet "wikilink")
    ##
    ## 	  Standardverzeichnis gridcoinresearch.conf :
    ##
    ##  Win:   %AppData%\GridcoinResearch\
    ##  Linux: ~/.GridcoinResearch/
    ##  macOS: /Users/USERNAME/Library/Application/Support/GridcoinResearch/
    ##
    ## Einfache # Kommentiert die Zeile aus, Aktivierung der Zeile durch Löschung des Zeichenk
    ## doppelte ## Zeilen weerden zu Kommentaren.
    ##
    #############################################################################
    ############ Erforderliche Einstellungen (Alle Betriebssysteme) #############
    #############################################################################

    ## Von der Community bereitgestellte Liste verfügbare Addnodes [Addnodes](Addnodes "wikilink")
    #~~~~~Addnodes kopieren und hier einfügen~~~~~


    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    ## E-Mailadresse des BOINC Kontos
    ## Leer lassen oder INVESTOR eintragen um im Pool zu rechnen oder im Investormodus zu agieren
    ## Hinweis: Das Feld PrimaryCPID ist ceraltet und wird seit der Version Denise 
	## nicht mehr unterstützt.
    email=

    ## Port 32749/TCP offen; erorderlich für eingehende Verbindungen 
    ## (Deise Einstellung ist nicht zwingend notwendig, wird aber sehr empfohlen)
    listen=1

    ## Erforderlich für Headless set-ups
    #daemon=1

    #############################################################################
    ############# RPC Einstellungen fpr Fernzugriff und Headless Benutzer #######
    ############ Warnung: Nutze ein sicheres Passwort und schütze dein System ###
    #############################################################################

    #server=1
    #rpcallowip=127.0.0.1
    #rpcallowip=<IP Adresse des entfernten Systems>
    #rpcport=<Port für die Kommunikation per Fernzugriff>
    #rpcuser=<Wähle eine Benutzernamen für den Fernzugriff>
    #rpcpassword=<Wähle ein sicheres Passwort für den Fernzugriff>

    #############################################################################
    ######################## Optionale BOINC Einstellungen#######################
    #### (wird benötigt falls BOINC mnicht im Standardverzeichnis liegt ) #######
    #############################################################################

    ## Windows (Hinweis: Die doppelten backslashes sind notwendig)
    #boincdatadir=C:\\ProgramData\\BOINC\\

    ## Linux
    #boincdatadir=/var/lib/boinc-client/

    ## macOS
    #boincdatadir=/Library/Application Support/BOINC Data/

    #############################################################################
    ######################## Optionale Neztwerkeinstellungen ####################
    #############################################################################

    ## maximale Anzahl ein- und ausgehender Verbindungen. Standard = 125
    maxconnections=125
    ## maximale Anzahl ausgehender Verbindungen. Standard = 8
    maxoutboundconnections=8
    ## Ports manuell einrichten
    #upnp=false
    #externalip=<Your IP Address>

    #############################################################################
    ########################## Weitere Eintellungen #############################
    #############################################################################

    ## Siehe weiter unten für den Abschnitt mit der Beschreibung der weiteren Einstellungen.

    #debug=true
    #debug=<Kategorie>

    #enablestakesplit=1
    #stakingefficiency=<Prozentsatz zwischen 75 und 98, Standard = 90>
    #minstakesplitvalue=<Wert in GRC, minimum und Standard = 800>

    #enablesidestaking=1
    #sidestake=<Adresse>,<Prozentsatz der Zuweisung>


## Addnodes

Der Client stellt ausgehende Verbindungen mit den Knoten (Nodes) der Liste 
der angegebenen Addnodes her. Die Standardkonfiguration enthält keine Einträge.
Eine vollständige Liste aktueller Addnodes  ist hier [List of Addnodes](addnodes "wikilink") zu finden.

Falls die Syncronisation fehlschlägt, überprüfe die Liste der Addnodes [List of
Addnodes](addnodes "wikilink").

Die Liste der Addnodes, welche aus IP-Adressen besteht, darf keinen Eintrag mit der eigenen IP enthalten. Ein Eintrag eines Addnodes mit der eigenen IP führt zur Verbannung. 

## Weitere Einträge

Die meisten Einstellungen der Konfigurationsdatei und der Befehlszeilenargumente von Gridcoin entstammen direkt vom Bitcoin. Eine ausführliche Liste mit Erklärungen zu den Optionen befindet sich hier: <https://en.bitcoin.it/wiki/Running_Bitcoin>

**debug=true**  
**debug=\<Kategorie>**

Diese Option erlaubt eine detaillierte Auflistung von sämtlichen Meldungen zum Debuggen. Ab der Version 4.1.0.0 besteht die Möglichkeit die Meldungen nach Katgorien zu sortieren. 
Dieses Protokoll wird mit dem Kommando "logging" erstellt. 
Hinweis: Derzeit sind nicht alle Kategorien verfügbar, da das Wallet von der traditionellen Protokollierung auf die kategorisierte Protokollierung umgestellt wird.

Weitere Gridcoin spezifische Einstellungen:

**enablestakesplit=1**  
**stakingefficiency=\<Prozentsatz zwicshen 75 and 98, Standard = 90>**  
**minstakesplitvalue=\<Wert in GRC, minimum und Standard = 800>**

enablestakesplit=1 aktiviert die automatische Aufspaltung von UXTO's in den Coinstake-Tranaktionen (stake output). Null ist die Standardeinstellung, also deaktiviert. 

stakingefficiency=xx Wird als Integer Zahl angegeben und entpricht der gewünschten Stake Effizienz. Dieser Wert wird durch den Programmcode kontrolliert auf Werte von 75% bis 98% beschränkt, falls unsinnige Werte angegeben werden.

minstakesplitvalue=xxx Dieser Wert wird als Integer Zahl angegeben und definiert die kleinste UTXO Größe nach dem Teilen um eine sekundäre Kontrolle der UTXO  Größe zu ermöglichen. Wenn der Schwierigkeitsgrad sinkt, es aber eine hohe Effizienz angegeben wird, würde allein die Effizienz die UTXO in kleinere Mengen aufteilen als es gewünscht ist. Dies wird hierdurch verhindert. Falls ein Benutzer weniger als 800 GRC angibt, greift der Programmcode ein und setzt den Wert automatisch auf 800 GRC. Zur Berechnung der Schwierigkeit und Glättung der Schwierigkeisschwankungen wird ein Mittelwert über 160 Blöcke gebildet. .

**enablesidestaking=1**  
**sidestake=\<Adresse>,\<Prozentsatz der Zweisung>**

Es können mehrere Sidetake-Einträge angeben werden, genau wie Addnode oder Connect.
Zu beachten ist, dass die Gesamtzahl der Ausgaben für den Coinstake begrenzt ist auf 8 in Blockversion 10+, und vout[0] muss leer sein, so dass sich 7 verwertbare Ergebnisse ergeben. 
Einer muss immer für den aktuellen Coinstake Output reserviert sein, so dass bis zu 6 nutzbare Ausgaben für Verteilung der Belohnungen übrig bleiben. Es können mehr als sechs Einträge für Sidestaking angeben werden.
Werden mehr als sechs Einträge angegeben, werden sechs Einträge pro Einsatz nach dem Zufallsprinzip aus der Liste ausgewählt.
Beachte, dass die Summe aller Prozentsätze weniger als 100% beträgt, wobei in diesen Fällen die übrig gebliebene Belohnung an den Verwalter der Coinstake(s) zurückerstattet wird.
