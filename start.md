# Get Started

**flimflam** isn't a single framework, but simply a recommended pattern for creating UI modules. The best way to get started is with these tutorials and examples: 
- counter [tutorial](https://github.com/flimflamjs/flimflam-docs/blob/master/tutorials/quick-start-counter.md) and [example](https://github.com/flimflamjs/flimflam-docs/tree/master/examples/counter)
- todo [tutorial](https://github.com/flimflamjs/flimflam-docs/blob/master/tutorials/comprehensive-todo.md) (coming soon) and [example](https://github.com/flimflamjs/flimflam-docs/tree/master/examples/todo)

To master flimflam, you must also master these libraries. Use their documentation for your reference when creating flimflam components: 
- [ramda]() for general functional programming -- this is our "standard library"
- [flyd]() for FRP (functional reactive programming)
- [snabbdom]() for dynamically rendering HTML/SVG onto the page

**flimflam** is a specification for combining the above three libraries into composable, reusable, modular UI components. What does this mean?
- composable: you can nest UI components inside any other component
- reusable: you can re-initialize UI components, each with its own state and streams
- modular: every UI component is discrete, nestable, and has a standard API of `{init, view}`

You can also view [the flimflam specification](https://github.com/flimflamjs/flimflam-docs/blob/master/specification.md).

You may also want a [more in-depth guide on the concepts from FRP](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) (note that this guide is not about flimflam, but a general guide to the ideas in FRP)

You can also [read the source code from some of the core flimflam components](https://github.com/flimflamjs/ff-core/tree/master/modules)

