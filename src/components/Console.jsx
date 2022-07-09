import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";
import Navbar from "./Navbar.jsx";
import UmlDiagram from "./UmlDiagram.jsx";


const storageSize = 1000;

const getRandomNumber = (maxNum) => {
  return Math.floor(Math.random() * maxNum);
};

const getRandomColor = () => {
  const r = getRandomNumber(200);
  const g = getRandomNumber(200);
  const b = getRandomNumber(200);

  return `rgb(${r}, ${g}, ${b})`;
};

const loadItemsFromLocalStorage = () => {
  let storedItems = [];
  for (let i = 0; i < storageSize; i++) {
    storedItems.push(localStorage.key(i));
  }
  return storedItems.filter((item) => item !== null);
};

const initialNodes = [
  {
    id: "node-1",
    type: "umlDiagram",
    position: { x: 0, y: 0 },
    data: {
      color: getRandomColor(),
      gridTable: [{ visibility: "+", signature: "", type: "" }],
      connection: false,
    },
  }
];

const initialEdges = [];

const nodeTypes = { umlDiagram: UmlDiagram };

const Console = () => {

  const [edges, setEdges] = useState(initialEdges);
  const [nodes, setNodes] = useState(initialNodes);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const loadNodesFromLocalStorage = () => {
    let nodesFromLocalStorage = [];
    let elementsNodesKeys;
    let elementsFromLocalStorage = loadItemsFromLocalStorage();
    elementsNodesKeys = elementsFromLocalStorage.filter((item) =>
      item.includes("node")
    );
    elementsNodesKeys.forEach((nd) => {
      nodesFromLocalStorage.push(JSON.parse(localStorage.getItem(nd)));
    });
    nodesFromLocalStorage.forEach((nds) => {
      nds.id = `node-${nodes.length + 1}`
      nodes.push(nds)
      console.log(nds)
    })
    setNodes(nodes)
  };

  const saveToLocalStorage = () => {
    nodes.forEach((node) => {
      localStorage.setItem(node.id, JSON.stringify(node));
    });
    console.log("the following nodes have been saved", nodes);
    alert('Diagram Saved Successfully ☑️')
  };

  const createTable = () => {
    nodes.push({
      id: `node-${nodes.length + 1}`,
      type: "umlDiagram",
      position: { x: 0, y: 0 },
      data: {
        color: getRandomColor(),
        gridTable: [{ visibility: "+", signature: "", type: "" }],
      },
    });
    setNodes(nodes);
    console.log(nodes);
  };

  return (
    <div>
      <section style={{ margin: "0% 20%" }}>
        <Navbar
          onCreateTable={() => createTable()}
          onDownloadDiagram={() => loadNodesFromLocalStorage()}
          onSaveDiagram={() => saveToLocalStorage()}
          onCopyDiagram={() => loadNodesFromLocalStorage()}
        />
      </section>

      <section style={{ margin: "0% 2%" }}>
        <div className="functions-list"></div>
        <div className="data-model-canvas">
          <div style={{ width: "100%", height: "85vh" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              defaultNodes={nodes}
              defaultEdges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
            >
              <Background />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Console;



