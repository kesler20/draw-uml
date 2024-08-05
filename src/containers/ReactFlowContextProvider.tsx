import React from "react";
import { useStoredValue } from "../customHooks";
import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  useEdgesState,
  useNodesState,
} from "reactflow";
import {
  CanvasType,
  EdgeType,
  NodeDataType,
  NodeType,
  SimulationType,
} from "../pages/data_stream_designer/types";
import { CardDetail } from "../pages/data_stream_designer/DataStreamDesignerPage";
import { getColumnWithFewestRows } from "../utils";

// define the type of the context value
interface IReactFlowContext {
  nodes: NodeType[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<NodeType[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onNodesChange: (nodes: NodeChange[]) => void;
  onEdgesChange: (edges: EdgeChange[]) => void;
  canvas: CanvasType;
  setCanvas: React.Dispatch<React.SetStateAction<CanvasType>>;
}

// define the interface for the function providing the context (context provider)
interface IReactFlowContextProvider {
  children: React.ReactNode;
}

export const defaultCanvas: CanvasType = {
  name: "Default Canvas Name",
  nodes: [],
  edges: [],
  simulationStart: 0,
  simulationEnd: 100,
  simulationType: SimulationType.STREAM,
};

const ReactFlowContext = React.createContext<IReactFlowContext>({
  nodes: [],
  edges: [],
  setNodes: () => {},
  setEdges: () => {},
  onNodesChange: () => {},
  onEdgesChange: () => {},
  canvas: defaultCanvas,
  setCanvas: () => {},
});

export const ReactFlowContextProvider: React.FC<IReactFlowContextProvider> = ({
  children,
}) => {
  const [canvas, setCanvas] = useStoredValue<CanvasType>(defaultCanvas, "canvas");
  const [edges, setEdges, onEdgesChange] = useEdgesState(canvas.edges);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    canvas.nodes as Node<NodeDataType>[]
  );

  // Every time you load in a data set adjust the size of the simulation window.
  React.useEffect(() => {
    nodes.forEach((node) => {
      if (node.data.cardDetail === CardDetail.DataSet) {
        let dataSet: { [key: string]: number[] } = {};
        node.data.outputParams.forEach((outputParam) => {
          dataSet[outputParam.name] = outputParam.values;
        });
        // Adjust the size of the simulation window
        const shortestColumnInDataSet = getColumnWithFewestRows(dataSet);
        const numberOfRowsInShortestColOfDataSet =
          dataSet[shortestColumnInDataSet].length;
        if (
          numberOfRowsInShortestColOfDataSet >
          Math.round(canvas.simulationEnd - canvas.simulationStart)
        ) {
          setCanvas((prevCanvas) => {
            return {
              ...prevCanvas,
              simulationEnd:
                canvas.simulationStart + numberOfRowsInShortestColOfDataSet,
            };
          });
        }
      }
    });
  }, [nodes]);

  // re adjust the size of the data set cards when the simulation window changes
  React.useEffect(() => {
    setNodes((prevNodes) => {
      return prevNodes.map((prevNode) => {
        if (prevNode.data.cardDetail === CardDetail.DataSet) {
          return {
            ...prevNode,
            data: {
              ...prevNode.data,
              outputParams: prevNode.data.outputParams.map((outputParam) => {
                return {
                  name: "", // Add the required 'name' property here
                  values: outputParam.values.slice(
                    0,
                    Math.round(canvas.simulationEnd - canvas.simulationStart)
                  ),
                };
              }),
            },
          };
        } else {
          return prevNode;
        }
      });
    });
  }, [canvas.simulationEnd, canvas.simulationStart]);

  return (
    <ReactFlowContext.Provider
      value={{
        nodes,
        edges,
        canvas,
        setNodes: setNodes as React.Dispatch<React.SetStateAction<NodeType[]>>,
        setEdges,
        onNodesChange,
        onEdgesChange,
        setCanvas,
      }}
    >
      {children}
    </ReactFlowContext.Provider>
  );
};

export const useStateContext = () => React.useContext(ReactFlowContext);
