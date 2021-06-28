---
layout:
---
(function () {
  const pageData = {
    {%- for page in site.html_pages -%}
      {%- if page.content != "" and page.layout != ""-%}
        "{{ page.url | slugify }}": {
          "title": "{{ page.title | xml_escape }}",
          "content": {{ page.content | strip_html | markdownify | strip_html | normalize_whitespace | jsonify }}, 
          "url": "{{ page.url | xml_escape }}",
        }
        {% unless forloop.last %},{% endunless %}
      {%- endif -%}
    {%- endfor -%} 
  };
  {% comment %} strip HTML the first time so it removes from .htm page and then do it again to remove from markdown pages after rendering. Markdown rendering will escape HTML so has to be this order{% endcomment %}


  function determineMatchesToShow(matches) {
      //find how close the matches are and display the first bunch
      //returns the index of the last match

      if (!matches["content"]) {
          return null; //doesn't make sense to look if it matched only in the tile
      }

      const positions = matches["content"].position;

      var diff = 0;

      for (var i = 0; i < (positions.length - 2) && diff < 200; i++) {
          // compare start of the next to end of the current
          diff = positions[i + 1][0] - (positions[i][0] + positions[i][1]);
      }

      //increment in for loop is done before check, so subtract 1
      return Math.max(0, i - 1);
  }

  function closestWordIndex(string, start) {
      for (var i = start; i > 0 && string[i] != ' '; i--) {
          //seeks backward until space or start of the string
      }

      return i;
  }

  function displaySearchResults(results, store) {
      var searchResults = document.getElementById('search-results');

      if (results.length) { // display message about no results if there are none

          for (var i = 0; i < results.length; i++) {
              var result = results[i];
              var item = store[result.ref];


              var li = document.createElement('li');

              var h3 = document.createElement('h3');
              var a = document.createElement('a');
              a.href = item.url;
              a.textContent = item.title;

              h3.appendChild(a);
              li.appendChild(h3);

              var p = document.createElement('p');

              var matchData = Object.values(result.matchData.metadata)[0];
              //workaround for weird bug where some search terms don't get the correct label

              var matchCount = determineMatchesToShow(matchData);

              if (matchCount !== null) {
                  var positions = matchData["content"].position;

                  const lookBackMin = 10;
                  const firstPos = closestWordIndex(item.content, positions[0][0] - lookBackMin);

                  var lookAhead = 10;

                  if (matchCount === 0) {
                      //give a little context in case there's only one match
                      lookAhead = 75; //roughly length of average sentence
                  }
                  const lastPos = closestWordIndex(item.content, positions[matchCount][0] + positions[matchCount][1] + lookAhead);

                  if (firstPos !== 0) {
                      p.textContent += "...";
                  }
                  p.textContent += item.content.substring(firstPos, lastPos);

                  if (lastPos != item.content.length - 1) {
                      p.textContent += "...";
                  }

              } else {
                  //if only title or other matches, just put first 150 chars 
                  p.textContent = item.content.substring(0, 150) + "...";
              }

              li.appendChild(p);

              searchResults.appendChild(li);
          }

      } else {
          var li = document.createElement("li");
          li.innerText = "No Results Found";

          searchResults.appendChild(li);
      }
  }

  //reference: https://learn.cloudcannon.com/jekyll/jekyll-search-using-lunr-js/
  function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split('&');

      for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');

          if (pair[0] === variable) {
              return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
          }
      }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
      document.getElementById('search-box')
              .setAttribute("value", searchTerm);

      var idx = lunr(function () {
          this.field('id');
          this.field('title', {boost: 10});
          this.field('content');

          this.metadataWhitelist = ['position'];

          for (key in pageData) {
              this.add({
                  'id': key,
                  'title': pageData[key].title,
                  'content': pageData[key].content
              })
          };
      });
      var results = idx.search(searchTerm);
      displaySearchResults(results, pageData);
  }
})();
