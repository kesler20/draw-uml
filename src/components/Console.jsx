import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "react-flow-renderer";
import UmlDiagram from "./UmlDiagram.jsx";

const getRandomNumber = (maxNum) => {
  return Math.floor(Math.random() * maxNum);
};

const getRandomColor = () => {
  const r = getRandomNumber(200);
  const g = getRandomNumber(200);
  const b = getRandomNumber(200);

  return `rgb(${r}, ${g}, ${b})`;
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
  },
  {
    id: "node-2",
    type: "umlDiagram",
    position: { x: 0, y: 0 },
    data: {
      color: getRandomColor(),
      gridTable: [{ visibility: "+", signature: "", type: "" }],
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
    setNodes(nodes)
    console.log(nodes)
  };
  return (
    <div>
      <section>
        <div className="site-info flex-row">
          <div className="info flex-row">
            <h1>drawUML</h1>
            <p>Verison 0.0.1</p>
          </div>
          <div></div>
          <div style={{ color: "blue" }}>
            <i className="fas fa-save fa-2x" style={{ margin: 40 }}></i>
            <i className="fas fa-copy fa-2x"></i>
          </div>
          <div className="info-btn flex-row">
            <button className="btn create-table-btn" onClick={createTable}>
              Create Table
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 15 15"
                width="12"
                height="12"
                style={{ marginLeft: "0.33em" }}
              >
                <g
                  stroke="currentColor"
                  strokeWidth="1.75"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M4.497 1H3a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-1.5h0"
                    opacity=".6"
                  ></path>
                  <path d="M9 1.008L14 1v5M14 1L6 9"></path>
                </g>
              </svg>
            </button>
            <i
              className="fa fa-question-circle fa-2x"
              style={{ color: "blue" }}
            ></i>
          </div>
        </div>
      </section>

      <section>
        <div className="data grid">
          <div className="functions-list"></div>
          <div className="data-model-canvas">
            <div style={{ width: "100%", height: "100vh" }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
              />
            </div>
          </div>
        </div>
        <div className="data-model data-model-grid"></div>
      </section>
    </div>
  );
};

export default Console;
