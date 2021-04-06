# What are these pages?

To avoid manually editing HTML repetitively by hand, we make use of [templates](https://middlemanapp.com/basics/templating-language/) and [data files](https://middlemanapp.com/advanced/data-files/) for the whitelist for the Gridcoin website.

## Contributing towards the whitelist

### Template

```
- name: "text"
  link: "url"
  goal: "text"
  sponsor: "text"
  cpu: "yes|no"
  gpu: "yes|no"
  gdpr: "yes"|"no"
  gdpr-enable-steps: "url"             (only added if gdpr is "yes")
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
gdpr: Does the project require you to enable gdpr stats export
gdpr-enable-steps: Link to instruction for enabling stats export on that project
team: A hyperlink to team 'Gridcoin' within each BOINC project.
stats: A hyperlink to the project's gridcoinstats.eu page.  
```

### To Do
* OS support? Problem is that existing wiki entries for this data are 6+ years old.
* GPU vendor support (Nvidia/AMD/Intel/Other)
* ARM support?
* Mouse hover info for vendor info, or additional columns?


## Adding to the exchange list


### Template
```
name: "text"
image: "url"
link: "url"
```

### Field descriptions
```
name: The name of the exchange
image: Link to the image in /asset/ of the icon of the exchange 
link: Link to the exchange itself
```