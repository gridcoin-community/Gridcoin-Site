---
title: How to Edit the Wiki
layout: wiki
---

# Introduction

This wiki is written in [markdown](https://www.markdownguide.org/) 
which basically is just regular text with a little fancy things like adding 
\* around text \*like this\* to make your text *look like this*. 

The actual files for the wiki are located [here](https://github.com/gridcoin-community/Gridcoin-Site/tree/master/wiki) 
on GitHub. Each page on the wiki has a file associated with it like this one
being `wiki-editing.md`. It's the same name as the URL, but with `.md` at the end
instead of `.html`


## Notes

Editing this will require a GitHub account. Create one [here](https://github.com/join) 
to get started if you don't already have an account

If you are writing/editing in another language besides english go to the folder 
with the [two letter code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 
for the language like the folder de for German.

# Editing Existing Pages


1. Go to the [wiki folder in the Gridcoin-Site repository on GitHub](https://github.com/gridcoin-community/Gridcoin-Site/tree/master/wiki)

2. Find the page you want to edit

3. Press the edit icon 

4. Make your edits 

5. Scroll down on the page to where you see the `Propose file changes` button

6. Give your edits a descriptive title and description in the text boxes above

7. Press the `Propose file changes` then on the next screen press the 
`Create Pull Request` button

8. Wait for site developers to review your proposed changes

   a) don't feel discouraged if they suggest changes to your edits. Everyone
   sees suggestions to their changes frequently. It means nothing about your
   writing ability or knowledge

   b) If it has been a while (5+ days) you can try pinging the developers. Don't
      overuse this, but it can be helpful when things just sometimes get missed

See what this looks like in general on with [GitHub's guide to editing files](https://docs.github.com/en/free-pro-team@latest/github/managing-files-in-a-repository/editing-files-in-another-users-repository)


# Making New Pages

1. Go to the [wiki folder in the Gridcoin-Site repository on GitHub](https://github.com/gridcoin-community/Gridcoin-Site/tree/master/wiki)

2. Press add file then press create new file

3. Type the name of the page you want to create (in lowercase)

4. When creating the page add this at the top
   ```
   ---
   title: PAGE_TITLE
   layout: wiki
   ---
   ```

   with `PAGE_TITLE` being what you want the page's name to look like in the page
   list and the title in a browser tab. This all just lets the website builder
   know its a wiki page and the title to give it 

   (if writing in another language besides English use `layout:wiki-LANGUAGECODE` 
   like `wiki-de` for German)

5. Use markdown like normal for the rest of the file

6. When done scroll down to the bottom 

7. Add a descriptive title and description for your changes and press propose changes then press
 `Propose file changes` then on the next screen press the `Create Pull Request` button

8. Wait for site developers to review your proposed new page
   
   a) Don't feel discouraged if they suggest changes to the page. Everyone
   sees suggestions to their changes frequently. It means nothing about your
   writing ability or knowledge

     b) If it has been a while (5+ days) you can try pinging the developers.  Don't
      overuse this, but it can be helpful when things just sometimes get missed


# Contacts

Currently Roboticmind is one of the main users working on the wiki. If there's anything
you want to clarify or need help, please reach out to them. They can be contacted 
on the Gridcoin Discord, Slack, or on Reddit. 