import * as React from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "react-flow-renderer";
import NavbarComponent from "../components/Navbar";
import UmlDiagram, { type UmlDiagramData } from "./UmlDiagram";
import { getRandomColor, initialEdges, initialNodes } from "./initialState";
import type { UmlNodeData, UmlParam, UmlRow } from "../types/uml";

const nodeTypes = { umlDiagram: UmlDiagram };

type RowField = "visibility" | "signature" | "returnType";

type UploadResponse = {
  response: string[];
};

const Console = () => {
  // ====================== //
  //   STATE VARIABLES      //
  // ====================== //

  const [edges, setEdges] = React.useState<Edge[]>(initialEdges);
  const [nodes, setNodes] = React.useState<Node<UmlNodeData>[]>(initialNodes);
  const [sideBarView, setSideBarView] = React.useState(false);
  const [downloadableLinks, setDownloadableLinks] = React.useState<string[]>(
    []
  );
  const [downloadableServerLinks, setDownloadableServerLinks] = React.useState<
    string[]
  >([]);
  const [linksView, setLinksView] = React.useState(false);
  const [linksServerView, setLinksServerView] = React.useState(false);
  const [viewFileUpload] = React.useState(false);

  // ====================== //
  //   OBSERVE STATE        //
  // ====================== //

  console.log("nodes", nodes);
  console.log("edges", edges);
  console.log("linksView", linksView);
  console.log("linksServerView", linksServerView);

  // ====================== //
  //   SIDE EFFECTS         //
  // ====================== //

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL_PROD}/v1/files`)
      .then((res) => {
        if (res.ok) {
          return res
            .json()
            .then((data: UploadResponse) => {
              console.log(data);
              setDownloadableLinks(data.response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        return undefined;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL_PROD}/v1/servers`)
      .then((res) => {
        if (res.ok) {
          return res
            .json()
            .then((data: UploadResponse) => {
              console.log(data);
              setDownloadableServerLinks(data.response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        return undefined;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ====================== //
  //   UI EVENT HANDLERS    //
  // ====================== //

  // ------------------------------------------------------ Diagram
  const handleEventNodesChange = React.useCallback(
    (changes: NodeChange[]) =>
      setNodes((prevNodes) => applyNodeChanges(changes, prevNodes)),
    []
  );

  const handleEventEdgesChange = React.useCallback(
    (changes: EdgeChange[]) =>
      setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges)),
    []
  );

  const handleEventConnect = React.useCallback(
    (connection: Connection) =>
      setEdges((prevEdges) => addEdge(connection, prevEdges)),
    []
  );

  const handleEventCreateTable = () => {
    setNodes((prevNodes) => {
      const nextNode: Node<UmlNodeData> = {
        id: `node-${prevNodes.length + 1}`,
        type: "umlDiagram",
        position: { x: 10, y: 10 },
        data: {
          dataclass: false,
          objectName: "Object Name",
          comment: "Object Description",
          color: getRandomColor(),
          gridTable: [createDefaultRow()],
          connection: false,
          viewObjectMetadata: false,
          currentRowIndex: 0,
          insertMode: true,
        },
      };
      return [...prevNodes, nextNode];
    });
  };

  const handleEventCopyDiagram = () => {
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
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        return undefined;
      })
      .catch((error) => {
        console.log(error);
      });

    const elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = JSON.stringify([nodes, edges]);
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    alert("Diagram Successfully Copied To Clipboard ☑️");
  };

  const handleEventPasteDiagram = () => {
    const elem = document.createElement("textarea");
    elem.classList.add("elem2");
    elem.addEventListener("change", handleEventPasteChange);
    const nav = document.querySelector(".nav");
    if (nav) {
      nav.appendChild(elem);
    }
  };

  const handleEventPasteChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement | null;
    if (!target) {
      return;
    }

    try {
      const parsed = JSON.parse(target.value) as [
        Node<UmlNodeData>[],
        Edge[]
      ];
      setNodes(parsed[0]);
      setEdges(parsed[1]);
    } catch (error) {
      console.log(error);
    }

    const nav = document.querySelector(".nav");
    const elem = document.querySelector(".elem2");
    if (nav && elem) {
      nav.removeChild(elem);
    }
  };

  const handleEventUploadFile = (contents: string) => {
    const url = `${process.env.REACT_APP_BACKEND_URL_PROD}/v1/files/existing`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(contents),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res
            .json()
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        return undefined;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEventToggleSidebar = () => {
    setSideBarView((prevState) => !prevState);
  };

  const handleEventToggleLinksView = () => {
    setLinksView((prevState) => !prevState);
  };

  const handleEventToggleLinksServerView = () => {
    setLinksServerView((prevState) => !prevState);
  };

  // ------------------------------------------------------ Node
  const updateNodeData = React.useCallback(
    (nodeId: string, update: (data: UmlNodeData) => UmlNodeData) => {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id !== nodeId
            ? node
            : {
                ...node,
                data: update(node.data),
              }
        )
      );
    },
    []
  );

  const handleEventToggleModal = (nodeId: string, rowIndex: number) => {
    updateNodeData(nodeId, (data) => ({
      ...data,
      currentRowIndex: rowIndex,
      viewObjectMetadata: !data.viewObjectMetadata,
    }));
  };

  const handleEventToggleDataclass = (nodeId: string) => {
    updateNodeData(nodeId, (data) => ({
      ...data,
      dataclass: !data.dataclass,
    }));
  };

  const handleEventToggleInsertMode = (nodeId: string) => {
    updateNodeData(nodeId, (data) => ({
      ...data,
      insertMode: !data.insertMode,
    }));
  };

  const handleEventUpdateObjectName = (nodeId: string, name: string) => {
    updateNodeData(nodeId, (data) => ({
      ...data,
      objectName: name,
    }));
  };

  const handleEventUpdateObjectComment = (nodeId: string, comment: string) => {
    updateNodeData(nodeId, (data) => ({
      ...data,
      comment,
    }));
  };

  const handleEventUpdateSignatureComment = (
    nodeId: string,
    rowIndex: number,
    comment: string
  ) => {
    updateNodeData(nodeId, (data) => ({
      ...data,
      gridTable: data.gridTable.map((row, index) =>
        index !== rowIndex ? row : { ...row, comment }
      ),
    }));
  };

  const handleEventUpdateRowField = (
    nodeId: string,
    rowIndex: number,
    field: RowField,
    value: string
  ) => {
    updateNodeData(nodeId, (data) => ({
      ...data,
      gridTable: data.gridTable.map((row, index) =>
        index !== rowIndex ? row : { ...row, [field]: value }
      ),
    }));
  };

  const handleEventAddRow = (nodeId: string) => {
    updateNodeData(nodeId, (data) => ({
      ...data,
      gridTable: [...data.gridTable, createDefaultRow()],
    }));
  };

  const handleEventDeleteRow = (nodeId: string) => {
    updateNodeData(nodeId, (data) => ({
      ...data,
      gridTable:
        data.gridTable.length > 1
          ? data.gridTable.slice(0, data.gridTable.length - 1)
          : data.gridTable,
    }));
  };

  const handleEventAddParamRow = (nodeId: string, rowIndex: number) => {
    updateNodeData(nodeId, (data) => ({
      ...data,
      gridTable: data.gridTable.map((row, index) =>
        index !== rowIndex
          ? row
          : {
              ...row,
              params: [...row.params, createDefaultParam()],
            }
      ),
    }));
  };

  const handleEventDeleteParamRow = (nodeId: string, rowIndex: number) => {
    updateNodeData(nodeId, (data) => ({
      ...data,
      gridTable: data.gridTable.map((row, index) =>
        index !== rowIndex
          ? row
          : {
              ...row,
              params:
                row.params.length > 1
                  ? row.params.slice(0, row.params.length - 1)
                  : row.params,
            }
      ),
    }));
  };

  const handleEventUpdateParamName = (
    nodeId: string,
    rowIndex: number,
    paramIndex: number,
    name: string
  ) => {
    updateNodeData(nodeId, (data) => ({
      ...data,
      gridTable: data.gridTable.map((row, index) =>
        index !== rowIndex
          ? row
          : {
              ...row,
              params: row.params.map((param, idx) =>
                idx !== paramIndex ? param : { ...param, name }
              ),
            }
      ),
    }));
  };

  const handleEventUpdateParamType = (
    nodeId: string,
    rowIndex: number,
    paramIndex: number,
    type: string
  ) => {
    updateNodeData(nodeId, (data) => ({
      ...data,
      gridTable: data.gridTable.map((row, index) =>
        index !== rowIndex
          ? row
          : {
              ...row,
              params: row.params.map((param, idx) =>
                idx !== paramIndex ? param : { ...param, type }
              ),
            }
      ),
    }));
  };

  const handleEventUpdateParamComment = (
    nodeId: string,
    rowIndex: number,
    paramIndex: number,
    commentType: number,
    comment: string
  ) => {
    updateNodeData(nodeId, (data) => ({
      ...data,
      gridTable: data.gridTable.map((row, index) =>
        index !== rowIndex
          ? row
          : {
              ...row,
              params: row.params.map((param, idx) =>
                idx !== paramIndex
                  ? param
                  : {
                      ...param,
                      comment: param.comment.map((value, valueIndex) =>
                        valueIndex !== commentType ? value : comment
                      ) as [string, string],
                    }
              ),
            }
      ),
    }));
  };

  // ====================== //
  //   UTILS METHODS        //
  // ====================== //

  const createDefaultParam = (): UmlParam => ({
    name: "name",
    type: "str",
    comment: ["parameter comment", "return comment"] as [string, string],
  });

  const createDefaultRow = (): UmlRow => ({
    visibility: "+",
    signature: "",
    returnType: "",
    comment: "signature description",
    params: [createDefaultParam()],
  });

  const nodesWithHandlers = React.useMemo<Node<UmlDiagramData>[]>(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onEventAddRow: handleEventAddRow,
        onEventDeleteRow: handleEventDeleteRow,
        onEventToggleModal: handleEventToggleModal,
        onEventToggleDataclass: handleEventToggleDataclass,
        onEventToggleInsertMode: handleEventToggleInsertMode,
        onEventUpdateObjectName: handleEventUpdateObjectName,
        onEventUpdateObjectComment: handleEventUpdateObjectComment,
        onEventUpdateSignatureComment: handleEventUpdateSignatureComment,
        onEventUpdateRowField: handleEventUpdateRowField,
        onEventAddParamRow: handleEventAddParamRow,
        onEventDeleteParamRow: handleEventDeleteParamRow,
        onEventUpdateParamName: handleEventUpdateParamName,
        onEventUpdateParamType: handleEventUpdateParamType,
        onEventUpdateParamComment: handleEventUpdateParamComment,
      },
    }));
  }, [
    nodes,
    handleEventAddParamRow,
    handleEventAddRow,
    handleEventDeleteParamRow,
    handleEventDeleteRow,
    handleEventToggleDataclass,
    handleEventToggleInsertMode,
    handleEventToggleModal,
    handleEventUpdateObjectComment,
    handleEventUpdateObjectName,
    handleEventUpdateParamComment,
    handleEventUpdateParamName,
    handleEventUpdateParamType,
    handleEventUpdateRowField,
    handleEventUpdateSignatureComment,
  ]);

  // ====================== //
  //   UI COMPONENTS        //
  // ====================== //

  return (
    <div>
      {/* Top bar */}
      <section style={{ margin: "0% 20%" }}>
        <NavbarComponent
          sideBarView={sideBarView}
          downloadableLinks={downloadableLinks}
          downloadableServerLinks={downloadableServerLinks}
          linksView={linksView}
          linksServerView={linksServerView}
          viewFileUpload={viewFileUpload}
          onEventCreateTable={handleEventCreateTable}
          onEventCopyDiagram={handleEventCopyDiagram}
          onEventPasteDiagram={handleEventPasteDiagram}
          onEventToggleSidebar={handleEventToggleSidebar}
          onEventToggleLinksView={handleEventToggleLinksView}
          onEventToggleLinksServerView={handleEventToggleLinksServerView}
          onEventUploadFile={handleEventUploadFile}
        />
      </section>

      {/* Main layout */}
      <section style={{ margin: "0% 2%" }}>
        <div className="functions-list"></div>
        <div className="data-model-canvas">
          <div style={{ width: "100%", height: "85vh" }}>
            <ReactFlow
              nodes={nodesWithHandlers}
              edges={edges}
              onNodesChange={handleEventNodesChange}
              onEdgesChange={handleEventEdgesChange}
              onConnect={handleEventConnect}
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
