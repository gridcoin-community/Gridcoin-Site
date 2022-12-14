---
title: Staking
layout: wiki-pt
description: Visão geral do que é staking, como apostar, quais são as recompensas e muito mais
redirect_from:
  - "/Wiki/pt/staking"
---

# Introdução
*Staking* é o que gera recompensas e faz novos [blocos](#blocos "wikilink") no Gridcoin.
Quando alguém faz o *stake* (aposta), um novo bloco é criado e a pessoa que apostou é recompensada por isso.

O stake é todo baseado em probabilidade. Quanto mais Gridcoin você tiver, mais
risco você toma e mais provavel que sua aposta sua participação seja válida. Muitas vezes, isso pode ser frustrante para muitos, mas é inevitável sem criar um sistema extremamente inseguro

O nome stake/staking vem de [Proof of Stake](https://www.investopedia.com/terms/p/proof-stake-pos.asp)(Prova de Participação) o que é o sistema que o Gridcoin usa para reduzir a quantidade de energia que vai para executar a rede Gridcoin. O objetivo é dedicar esse poder computacional em projetos científicos.

## Recompensas da prova de participação
Ao apostar, você recebe moedas recém-cunhadas. Você obtem 10 GRC + [recompensas da pesquisa](#recompensas-de-pesquisa "wikilink"). Se você é um *solo cruncher*, as recompensas da pesquisa são adicionadas juntas. *[Pool](../pools "wikilink") cruncher* (consulte a seção [participação coletiva](#participação-coletiva "wikilink")) e *non-crunchers* receberão apenas 10 GRC quando apostar. Este 10 GRC sempre estará presente, pois fazem parte do bloco de recompensa constantes ou CBR(Constant Block Rewards). Isso é necessário para incentivar as pessoas a apostar porque quanto mais pessoas estiverem apostando, mais seguro é a rede.

Anteriormente (antes da versão v4.0.0.0), a Gridcoin utilizava um sistema baseado em porcentagem, mas tinha uma menor dificuldade (poucas pessoas apostando) o que causou boas discussões. 

Consulte a seção [Mais Informações](#mais-informações "wikilink") para saber mais sobre.

## Como apostar
Se você estiver usando a interface gráfica, procure pelo ícone ![Ícone de quadrados empilhados totalmente iluminados](/assets/img/wiki/staking_on.svg) para ver se você está apostando. Certifique-se de continuar vendo esse ícone e apenas deixe sua carteira rodando --- sua carteira continuará apostando.
Se, em vez disso, você ver um ícone vermelho ou apagado, passe o mouse sobre ele para ver por que ele diz que você não está apostando

Quando você apostar, você verá ![Purple Gridcoin Logo](/assets/img/wiki/tx_por.svg)
se você é um *solo cruncher* ou ![Golden Gridcoin Logo](/assets/img/wiki/tx_pos.svg)
se você não é. Se você estiver com [sidestaking](#sidestaking "wikilink") ativado, você
também verá o mesmo ícone com um detalhe vermelho.

Você precisa manter sua carteira funcionando para apostar porque a cada 16 segundos, sua carteira vai olhar para ver se você "ganhou uma moeda no cara ou coroa" para ver se pode apostar. Se você fizer isso, seu wallet criará um bloco e o enviará junto com a prova de que você "ganhou". Você também precisa deixar a carteira desbloqueada se você a criptografou para que ela possa enviar um bloco e permitem que você ganhe recompensas

## Probabilidades de aposta
Suas chances de apostar são baseadas apenas no número de moedas que você tem e quantas moedas outras pessoas na rede estão tentando apostar (conhecido como dificuldade).
A quantidade de pesquisa que você fez afetará apenas sua recompensa --- não suas chances
de aposta.

Para ver suas probabilidades, passe o mouse sobre o ícone ![Ícone de quadrados empilhados totalmente iluminados](/assets/img/wiki/staking_on.svg).
Você verá uma estimativa da frequência com que provavelmente apostará. Infelizmente como a aposta é baseada em probabilidade, seu tempo real para apostar pode variar mais ou menos tempo do que o mostrado.

**Avisos**

1) Se você não administrar sua carteira 24 horas por dia, 7 dias por semana ou quase, isso o tornará menos provável apostar. É como jogar menos moedas --- você vai ganhar terá menos chances de acertar o resultado desejado

2) Cooldowns mudarão suas chances de apostar nas 16 horas em que estiverem ativos porque menos de suas moedas são capazes de apostar. A carteira leva isso em consideração em sua previsão

## Cooldown
Depois de apostar ou mover algumas de suas moedas, essas moedas irão ficar 16 horas em 
cooldown onde eles não poderão serem utilizadas para apostar.

## Stakesplit
Se você vê muitas moedas no cooldown com frequência, tente adicionar `enablestakesplit=1` no arquivo de configuração da sua carteira e reinicie. Isso dividirá grandes [UTXOs](../utxos "wikilink") quando apostam para reduzir a quantidade de moedas no cooldown. Veja o [arquivo de configuração](../config-file "wikilink") página wiki para mais detalhes sobre como configurar isso.

### Equívocos Comuns
Colocar coisas em um grande UTXO não aumentará suas chances de aposta. Isso só vai prejudicar as coisas para apostar. Colocando-o em UTXOs menores aumentará a eficiência porque quando você apostar uma quantia menor entrará em um cooldown. A principal razão pela qual você pode querer colocar coisas em UTXOs maiores é reduzir as taxas quando
você tenta fazer transações em certas situações --- não apostando. 

Quando nenhuma de suas moedas estiver em cooldown, o tamanho de seus UTXOs não irá
mudar suas chances de apostar.

## Sidestaking

Ao apostar, você pode optar por enviar uma porcentagem de suas recompensas para outros endereços. Isso é chamado de *sidestaking* (lateralidade).

Com o *sidestaking* ativado, você verá ícones adicionais ao apostar. Se você é um *solo-cruncher*, você verá um ou mais de ![Purple Gridcoin Icon With Red Indent](/assets/img/wiki/tx_por_side_stake_sent.svg). 
Caso contrário, você verá um ou mais de ![Golden Gridcoin Icon With Red Indent](/assets/img/wiki/tx_pos_side_stake_sent.svg)

Se você receber o *sidestaking* de alguém, também verá um ícone especial. Se for de um *solo-cruncher* você verá ![Purple Gridcoin Icon With Green Indent](/assets/img/wiki/tx_por_side_stake_receive.svg). Se não, ![Golden Gridcoin Icon With Green Indent](/assets/img/wiki/tx_pos_side_stake_receive.svg) aparecerá.

Para enviar apostas para outros endereços quando você apostar, vá para o seu [config file](../config-file "wikilink") e adicione

```
enablesidestaking=1
sidestake=<address>,<allocation percentage>
```
com `<address>` e `<allocation percentage>` sendo valores que você altera.
Consulte a página wiki do [config file](../config-file "wikilink") para obter mais informações.

## As Pools

Se você é um minerador de pool, pode estar se perguntando como obter suas recompensas de pesquisa. A resposta é que o pool aposta para você. Quando você tritura, você o faz na conta do pool. A ideia da piscina é que elas tenham um balanço grande e assim
eles podem apostar com mais frequência do que você. Eles então calculam que porcentagem
da recompensa para a qual você contribuiu e enviar de volta sua porcentagem da recompensa.

**Nota**: Como um *pool-cruncher*, você também pode apostar separadamente no que recebeu
da pool. Você só ganhará 10 GRC ao apostar desde a rede Gridcoin realmente não saiba que você contribuiu para uma pool.

---
## Mais Leitura

Mais informações técnicas sobre staking podem ser encontradas no [staking blue paper](/assets/docs/grc-bluepaper-section-1.pdf "sitelink").
Isso entra em muito mais detalhes das estatísticas envolvidas e muito mais.

Os valores de recompensa atualmente usados ​​foram escolhidos por meio de uma pesquisa intitulada ["Constant Block Reward (cbr) Proposal And Poll"](http://main.gridcoinstats.eu/poll/22c2ee5e0c049ce93acc6f40d0430f6335367da1c3f61c66d211863cb346600d/1/ended:2).

A opção 75/25 foi escolhida, o que significa uma divisão de 75% a 25% das novas moedas entre trituradores e não trituradores, respectivamente.

Se você gostaria de uma leitura aprofundada sobre a economia disso, veja o
[reddit](https://www.reddit.com/r/gridcoin/comments/8bcrlz/constant_block_reward_cbr_value_proposal_and_poll/), [github](https://github.com/gridcoin-community/economics/issues/1) ou [steem](https://steemit.com/gridcoin/@jringo/constant-block-reward-cbr-value-proposal-and-poll) thread. Isso entrou em
efeito na versão 4.0.0.0 após um [hard fork](forks#hard-forks "wikilink") (consulte [este post do reddit para obter mais informações](https://www.reddit.com/r/gridcoin/comments/9pgg7m /gridcoin_mandatory_update_4000_released_cbr/) para detalhes)

---
## Definições
Lista de algumas definições de coisas que são úteis saber

### Blocos
Blocos são o que armazenam transações. Eles ajudam a dar uma ordem quando as transações acontecer deixando sua carteira concordar com outras pessoas que uma transação conteceu em bloco X.

### Recompensas de Pesquisa
A quantia que você ganhou trabalhando no BOINC com seu computador