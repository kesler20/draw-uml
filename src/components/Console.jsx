import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";
import RESTfulApiInterface from "../APIs/RESTfulApi.js";
import Navbar from "./Navbar.jsx";
import UmlDiagram from "./UmlDiagram.jsx";

const storageSize = 1000;

export const getRandomNumber = (maxNum) => {
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
    position: { x: 500, y: 500 },
    data: {
      objectName: "Object Name",
      color: getRandomColor(),
      gridTable: [{ visibility: "+", signature: "", type: "" }],
      connection: false,
    },
  },
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

  const handleSave = () => {
    let keysFromStorage = loadItemsFromLocalStorage();
    keysFromStorage =
      keysFromStorage.length === 0
        ? [...nodes.map((nds) => nds.id), ...edges.map((edg) => edg.id)]
        : loadItemsFromLocalStorage();

    console.log(keysFromStorage);
    keysFromStorage.forEach((key) => {
      nodes.forEach((nds) => {
        if (nds.id === key) {
          localStorage.setItem("s" + key, JSON.stringify(nds));
        }
      });
      edges.forEach((edg) => {
        if (edg.id === key) {
          localStorage.setItem(key, JSON.stringify(edg));
        }
      });
    });

    alert("Diagram Saved Successfully ☑️");
  };

  const loadNodesFromLocalStorage = () => {
    let keysFromStorage = loadItemsFromLocalStorage();
    let edgesFromStorage = [];
    let nodesFromStorage = [];
    keysFromStorage.forEach((key) => {
      if (key.includes("reactflow")) {
        edgesFromStorage.push(JSON.parse(localStorage.getItem(key)));
      } else if (key.includes("snode")) {
        nodesFromStorage.push(JSON.parse(localStorage.getItem(key)));
      }
    });

    setEdges(edgesFromStorage);
    setNodes(nodesFromStorage);
  };

  const handleCopy = () => {
    const api = new RESTfulApiInterface();
    api.putResource("draw-uml", [nodes, edges]);

    let elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = JSON.stringify([nodes, edges]);
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    alert("Diagram Successfully Copied To Clipboard ☑️");
  };

  const handlePaste = () => {
    const api = new RESTfulApiInterface();
    console.log(api.getResource("draw-uml"));

    let elem2 = document.createElement("textarea");
    elem2.classList.add("elem2");
    elem2.addEventListener("change", (e) => {
      updateState(e);
    });
    let nav = document.querySelector(".nav");
    nav.appendChild(elem2);
    console.log(nav);
  };

  const updateState = (e) => {
    try {
      setNodes(JSON.parse(e.target.value)[0]);
      setEdges(JSON.parse(e.target.value)[1]);
    } catch (e) {
      console.log(e);
    }
    let nav = document.querySelector(".nav");
    let elem2 = document.querySelector(".elem2");
    nav.removeChild(elem2);
  };

  const createTable = () => {
    nodes.push({
      id: `node-${nodes.length + 1}`,
      type: "umlDiagram",
      position: { x: 10, y: 10 },
      data: {
        objectName: "Object Name",
        color: getRandomColor(),
        gridTable: [{ visibility: "+", signature: "", type: "" }],
      },
    });
    setNodes(nodes);
    console.log(nodes);
  };

  const printDiagram = () => {
    setTimeout(() => {
      window.print();
    }, 2000);
  };

  return (
    <div>
      <section style={{ margin: "0% 20%" }}>
        <Navbar
          onCreateTable={() => createTable()}
          onDownloadDiagram={() => loadNodesFromLocalStorage()}
          onSaveDiagram={() => handleSave()}
          onCopyDiagram={() => handleCopy()}
          onPasteDiagram={() => handlePaste()}
          onPrintDiagram={() => printDiagram()}
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
