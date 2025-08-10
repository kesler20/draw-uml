# Draw UML

<div style="display:flex;">
  <h1>UML Diagraming Tool</h1>
  <img src="src\assets\logo.svg" style="width:15%" />
</div>

drawUML is a UML diagraming Tool inspired by [drawSQL](https://drawsql.app/). The
first version is hosted [here](https://draw-uml-production.up.railway.app/) and is powered by
[React Flow](https://reactflow.dev/docs/guides/custom-nodes/)
![drawUML](/drawUML.png) at the moment the only way to save the diagram is to copy it
to clipboard and paste it within the code as the initial state

# Software Design

### Folder Structure

The folder is organised as a module: the code cna be found in the `src` folder,
`documents` like the design_doc.md file and the readme pictures can be found

The source code folder is organised into 5 main sections, `assets` where images and
static assets are kept, `__test__` where all the tests are kept, `apis` where the api
interfaces are specified, `pages` where the code for the page is kept, `containers`
where stateful react components are specified and `components` where all the
re-usable components are found.

#### Design Overview

the following diagram displays the main react components

```mermaid
classDiagram
   Console <|-- UmlDiagram
   Console <|-- NavbarComponent
   Console : - edges
   Console : - nodes
   Console : + handleCopy()
   Console : + createTable()

   UmlDiagram : - gridTable
   UmlDiagram : + viewComment
   UmlDiagram : + objectComment
   UmlDiagram : + insertMode
   UmlDiagram : + findIndex()
   UmlDiagram : + addRow()
   UmlDiagram : + deleteRow()
   UmlDiagram : + handleNavigation()
   UmlDiagram : + handleObjectClick()

   NavbarComponent : - sideBarView
```

#### Console Design

**view** The view of the react component is divided into 2 sections using the HTML
`<section/>` tag.

The first section contains the `NavComponent` which uses the `createTable` and the
`handleCopy` which are used by the container to modify its internal state.

The second section contains the react flow grid which uses `UmlDiagrams` as nodes:

```jsx
const nodeTypes = { umlDiagram: UmlDiagram };
```

**state** The react component uses the following data structure stored in the node
state,

```jsx
{
  id: `node-${nodes.length + 1}`,
  type: "umlDiagram",
  position: { x: 10, y: 10 },
  data: {
    objectName: "Object Name",
    comment: "Object Description",
    color: getRandomColor(),
    gridTable: [
      {
        visibility: "+",
        signature: "",
        type: "",
        comment: "signature description",
      },
    ],
  },
},
```

this data structure is passed to the `UmlDiagram` component using the prop `data`. It
is then modified using the `addRow`, `deleteRow` , `handleObjectClick` methods.

expand on how the data structure cna be modified expand on the nodes

### TODOs:

- [ ] improve the UI for pasting things
- [ ] make the state persistent
- [ ] the the ability to take design notes which would be persistent in local storage
- [ ] create a function on drawUML to make a boundary around some tables to enclose
      systems and to select the colors of some tables to create your own legends
- [ ] make the tests from drawuml unimplemented and implement them one after the
      other as the tdd cycle unfolds
- [ ] Look at UML dioagrams and inset what is missing such as the interface and the
      dataclass Header of the various tables
- [ ] Add ai powered class recommendation
- [ ] Change the test generation to one test case and remove the docs
- [ ] Add ai curated template recommendation
- [ ] Improve the UI and UX of the application, make it solely for template
      generation and easy to understand/ use

Think about developer experience to alolow the fast development of UML diagramsa make
a lot of short cuts.

Fix every bug try to implement tests and typescript.

Add the ability to get a specific file or a folder from the system

Create typescript and React components from this

Create servers given the endpoints and the return forms (JSON)

Refactor front end and backend
