import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";
import UmlDiagram from "./UmlDiagram.jsx";
import { initialEdges, initialNodes, getRandomColor } from "./initialState";
import NavbarComponent from "../components/Navbar";

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

  const handleCopy = () => {
    const url = `${process.env.REACT_APP_BACKEND_URL_PROD}/v1/files/new`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify([nodes, edges]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res
            .json()
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    let elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = JSON.stringify([nodes, edges]);
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    alert("Diagram Successfully Copied To Clipboard ☑️");
  };

  const handlePaste = () => {
    let elem2 = document.createElement("textarea");
    elem2.classList.add("elem2");
    elem2.addEventListener("change", (e) => {
      updateState(e);
    });
    let nav = document.querySelector(".nav");
    nav.appendChild(elem2);
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
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: `node-${nodes.length + 1}`,
        type: "umlDiagram",
        position: { x: 10, y: 10 },
        data: {
          dataclass: false,
          objectName: "Object Name",
          comment: "Object Description",
          color: getRandomColor(),
          gridTable: [
            {
              visibility: "+",
              signature: "",
              returnType: "",
              comment: "signature description",
              params: [{ name: "name", type: "str", comment : ["parameter comment","return comment"] }],
            },
          ],
        },
      },
    ]);
  };

  return (
    <div>
      <section style={{ margin: "0% 20%" }}>
        <NavbarComponent
          onCreateTable={createTable}
          onCopyDiagram={handleCopy}
          onPasteDiagram={handlePaste}
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
