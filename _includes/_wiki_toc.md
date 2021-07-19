{% comment %}
This is a work around to use kramdown's table of contents generator, but
on a side bar. High level: renders the full Markdown with the toc and 
take out just the list

Take the page data, replace the front matter with a comment so no false
positive headers from that, convert the markdown to HTML, and then split 
by the "markdown-toc-divider" text as a divider for the table. Remove the
extra paragraph tags around the divider text
{% endcomment %}
{% capture page_data %}
{% include_relative {{include.page}} %}

markdown-toc-divider
* replace
{:toc}
markdown-toc-divider

{% endcapture %}
{%- assign data = page_data | replace_first: "---", "<!--" | replace_first: "---", "-->" | markdownify | split: "markdown-toc-divider" -%}
{{ data[1] | remove: "<p>" | remove: "</p>" }}