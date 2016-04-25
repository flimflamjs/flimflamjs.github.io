# flimflamjs.github.io
directory of flimflam components

flimflam is a **curated** directory of frontend web modules that follow a certain set of standards.

flimflam is a collection of UI modules that:
- follow a set of standards and use a design pattern
- have complete tests
- have one discrete purpose
- are curated
- are not styled

flimflam is not:
- a framework
- a package manager

flimflam module requirements:
- render HTML using **snabbdom**
- handle asynchronous data using **flyd** and its modules
- practice functional programming and immutability with **Ramda**
- organize components according to the **flimflam architecture**, which combines the usage of the above three libraries
- host components on **npm**
- have complete test coverage across browsers
- have complete documentation about the component
- have a working demo of the component

# the flimflam architecture

```
view :: (events, state, config) -> vtree

init :: (events, state) -> {defaultState, events, updates, children}

defaultState is an object of data for the view set on page load.

events are a collection of streams that handle DOM events.

updates are a collection of pairs of streams and state updater functions

children are any child components you want to use

flyd.construct(component) -> state$
flyd.map(view, state) -> vtree$
flyd.scan(patch, domContainer, vtree$) -> dom$
```

# Todo

**ui components**

- Modal 
- Wizard
- Notification
- Pagination/show more
- Navigation
- Typeahead/automplete
- Date-picker/time-picker (wrap pikaday?)
- Wysiwyg (wrap another thing)
- Color picker
- Orderable/draggable list/table
- Form validator

**flyd modules**
- ajax
- file input stream
- FormData post stream
- time delay


