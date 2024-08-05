import { z } from "zod";

// ------------------------------ //
//                                //
//       REACT FLOW TYPES         //
//                                //
// ------------------------------ //

export const NodeParamsSchema = z.object({
  name: z.string(),
  values: z.array(z.number()),
  originalValues: z.array(z.number()).optional(), // TODO: in the future you can have a currentValue and values
});

/**
 * # Example
 * ```js
 * {
 * inputParams: [{ handleID: "a" }],
 * outputParams: [{ handleID: "b" }],
 * cardName: "This is the first card",
 * cardDetail: "Plus",
 * }
 * ```
 */
export const NodeDataSchema = z.object({
  inputParams: z.array(NodeParamsSchema),
  outputParams: z.array(NodeParamsSchema),
  cardName: z.string(),
  cardDetail: z.string(),
  streamRate: z.number(),
  switchedOn: z.boolean(),
  version: z.number().optional(),
  mode: z.optional(z.union([z.literal("range"), z.literal("random")])), // for sensors
  stepSize: z.optional(z.number()), // for sensors
  minValue: z.optional(z.number()), // for variables
  maxValue: z.optional(z.number()), // for variables
  content: z.optional(z.string()), // for models
});

export enum ModeType {
  RANGE = "range",
  RANDOM = "random",
}

/**
 * # Example
 * ```js
 * import {Position} from "reactflow";
 * {
  id: "1",
  type: "input",
  position: { x: 250, y: 5 },
  data: { label: "Node 1" },
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
 * }
  ```
 */
export const NodeSchema = z
  .object({
    id: z.string(),
    type: z.string().optional(),
    position: z.object({ x: z.number(), y: z.number() }),
    data: NodeDataSchema,
    sourcePosition: z.string().optional(),
    targetPosition: z.string().optional(),
  })
  .passthrough();

/**
 * # Example
 * ```js
 * {
    id: "e2b-4", // "e2b-4" means edge from node 2 handle b to node 4
    source: "2",
    target: "4",
    sourceHandle: "b",
    type:"smoothstep", // this is optional and when not provided, it will be "curvy"
    animated: true,
    style: { stroke: "#fff" },
 *  },
  ```
 */
export const EdgeSchema = z
  .object({
    id: z.string(),
    source: z.string(),
    target: z.string(),
    sourceHandle: z.string(),
    targetHandle: z.string(),
    type: z.string().optional(),
    animated: z.boolean(),
    style: z.object({ stroke: z.string() }),
  })
  .passthrough();

// ==================//
//                   //
//   CANVAS TYPES    //
//                   //
// ==================//

export const CanvasSchema = z.object({
  name: z.string(),
  nodes: z.array(NodeSchema),
  edges: z.array(EdgeSchema),
  simulationStart: z.number(),
  simulationEnd: z.number(),
  simulationType: z.union([z.literal("stream"), z.literal("batch")]),
});

// ------------------------ //
//                          //
//       EXPORTS            //
//                          //
// -------------------------//

export type NodeDataType = z.infer<typeof NodeDataSchema>;
export type NodeParamsType = z.infer<typeof NodeParamsSchema>;
export type NodeType = z.infer<typeof NodeSchema>;
export type EdgeType = z.infer<typeof EdgeSchema>;
export type CanvasType = z.infer<typeof CanvasSchema>;
