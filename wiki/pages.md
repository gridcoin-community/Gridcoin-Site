---
title: Gridcoin Wiki Pages
layout: wiki
---

# Wiki Pages

List of Gridcoin wiki pages in all languages.  
Pages in your current language can also be seen in the sidebar on the left (on desktop) or above (on mobile)

{% comment %} 

The code below for each language just loops through all the pages and creates a 
bullet point if the page is a wiki page and in that language. The bullet point
create a link to the wiki page and uses the page's title for the link text.

To add in another language, create a new header and copy the code and change 
the string compared to page.layout so it's the layout for the other language
Example: if page.layout == 'wiki' -> if page.layout == 'wiki-de'

{% endcomment %}


## English

{% for page in site.pages %}
    {% if page.layout == 'wiki'%}

* [ {{page.title}} ]( {{page.url}} "wikilink")

    {% endif %}
{% endfor %}


## Deutsch (German)

{% for page in site.pages %}
    {% if page.layout == 'wiki-de'%}

* [ {{page.title}} ]( {{page.url}} "wikilink")

    {% endif %}
{% endfor %}

## Svenska (Swedish)

{% for page in site.pages %}
    {% if page.layout == 'wiki-sv'%}

* [ {{page.title}} ]( {{page.url}} "wikilink")

    {% endif %}
{% endfor %}