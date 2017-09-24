# What are these pages?

To avoid manually editing HTML repetitively by hand, we make use of [templates](https://middlemanapp.com/basics/templating-language/) and [data files](https://middlemanapp.com/advanced/data-files/) for both the blog and the whitelist for the Gridcoin website.

## Contributing towards the blog

### Template

```
posts:
- title: "text"
  link_primary_url: "url"
  link_primary_text: "text"
  link_secondary_url: "url"
  link_secondary_text: "text"
  content: "text"
```
### How to submit blog post

Either create an issue with the above template filled in, or submit a pull request with the template text prepended to the blog.yml data file.

## Contributing towards the whitelist

### Template

```
- name: "text"
  link: "url"
  goal: "text"
  sponsor: "text"
  cpu: "yes|no"
  gpu: "yes|no"
  team: "url"
  stats: "url"
```

### Field descriptions

```
name: Project's name
link: Project's BOINC project homepage
goal: The purpose of the project
sponsor: Who runs/funds the operation of the project
cpu: Does the project provide CPU work?
gpu: Does the project provide GPU work?
team: A hyperlink to team 'Gridcoin' within each BOINC project.
stats: A hyperlink to the project's gridcoinstats.eu page.  
```

### To Do
* OS support? Problem is that existing wiki entries for this data are 6+ years old.
* GPU vendor support (Nvidia/AMD/Intel/Other)
* ARM support?
* Mouse hover info for vendor info, or additional columns?