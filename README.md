# Mermaid Lite Editor

Browser based diagramming tool powered by Mermaid (https://github.com/mermaid-js/mermaid) and inspired by the [Mermaid Live Editor](https://github.com/mermaid-js/mermaid-live-editor). It has most of the same features but does not require a build process nor does it have a server-side component. It is pre-built as a standalone static HTML site.

## Features

- Create and preview flowcharts, sequence diagrams, gantt diagrams in real time.
- Save the result as a svg
- Get a link to a viewer of the diagram so that you can share it with others.

## Run locally (requires python3)

```bash
make serve  # runs: python3 -m http.server 8000
```

Visit: <http://localhost:8000>
