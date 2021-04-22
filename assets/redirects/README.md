---
published: false
---

# Overview
Redirect for things in the assets folder. **Don't use this for regular pages**

Since these are binary files, using jeykll-redirect with the front matter doesn't work well.
To work around this, individual files are created using `redirect_to` instead. 

As well in another work around, files must end with `.html` such as `.pdf.html` or the redirect will 
not work since it needs to parse it as HTML. This works because it will still be reachable 
from the original filetype, and it will use a content type of `text/html`.

# Make a redirect

Create a file with `FILENAME.NORMAL_ENDING.html` like `whitepaper.pdf.html`. Then
add this to the file:

```
---
permalink: /PATH/TO/REDIRECT/FROM.NORMAL_ENDING.html
redirect_to: /PATH/TO/REDIRECT/TO.NORMAL_ENDING
---
```
