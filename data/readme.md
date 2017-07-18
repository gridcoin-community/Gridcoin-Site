# Contributing towards the whitelist
So that you don't need to mess around with HTML tables when adding a new BOINC project to the whitelist, we make use of data files in Middleman to generate a row for each project listed within the whitelist.yml file.

## Template

```
- name: ""
  link: ""
  goal: ""
  sponsor: ""
  cpu: ""
  gpu: ""
  team: ""
  stats: ""
```

## Field descriptions

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

## To Do
* OS support? Problem is that existing wiki entries for this data are 6+ years old.
* GPU vendor support (Nvidia/AMD/Intel/Other)
* ARM support?
* Mouse hover info for vendor info, or additional columns?