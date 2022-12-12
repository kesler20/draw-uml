import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";
import RESTfulApiInterface from "../apis/RESTfulApi.js";
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
    const api = new RESTfulApiInterface();
    api.putResource("draw-uml", [nodes, edges]).then((res) => console.log(res));

    let elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = JSON.stringify([nodes, edges]);
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    alert("Diagram Successfully Copied To Clipboard ☑️");
  };

  const createTable = () => {
    setNodes((prevNodes) => [
      ...prevNodes,
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
              returnType: "",
              comment: "signature description",
              params: [{ name: "name", type: "type" }],
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
