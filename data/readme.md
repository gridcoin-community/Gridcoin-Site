# Contributing towards the whitelist
So that you don't need to mess around with HTML tables when adding a new BOINC project to the whitelist, we make use of data files in Middleman to generate a row for each project listed within the whitelist.yml file.

## Template

```
- name: ""
  link: ""
  goal: ""
  sponsor: ""
  cpu: "check"
  gpu: "times"
  linux: "check"
  windows: "check"
  macos: "check"
  team: "Gridcoin Team Link"
  thread: "Forum Link"
```

## Field descriptions

name: Project's name
link: Project's BOINC project homepage
goal: The purpose of the project
sponsor: Who runs/funds the operation of the project
cpu: Does the project provide CPU work?
gpu: Does the project provide GPU work?
linux: Does the project support linux?
windows: Does the project support linux?
macos: Does the project support linux?
team: A hyperlink to team 'Gridcoin' within each BOINC project.
thread: A hyperlink to the project's cryptocurrencytalk.com (Gridcoin forum) thread.

## Icon usage
The cpu/gpu/linux/windows/macos fields use the icons from fontawesome, specifically 'check' for yes, and 'times' for no.