export type UmlParam = {
  name: string;
  type: string;
  comment: [string, string];
};

export type UmlRow = {
  visibility: string;
  signature: string;
  returnType: string;
  comment: string;
  params: UmlParam[];
};

export type UmlNodeData = {
  dataclass: boolean;
  objectName: string;
  comment: string;
  color: string;
  gridTable: UmlRow[];
  connection: boolean;
  viewObjectMetadata: boolean;
  currentRowIndex: number;
  insertMode: boolean;
};
