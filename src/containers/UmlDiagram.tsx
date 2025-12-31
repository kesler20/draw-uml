import * as React from "react";
import { Handle, Position, type NodeProps } from "react-flow-renderer";
import { FaPlus } from "react-icons/fa6";
import ModalCard from "../components/ModalCard";
import type { UmlNodeData } from "../types/uml";

type RowField = "visibility" | "signature" | "returnType";

type UmlDiagramHandlers = {
  onEventAddRow: (nodeId: string) => void;
  onEventDeleteRow: (nodeId: string) => void;
  onEventToggleModal: (nodeId: string, rowIndex: number) => void;
  onEventToggleDataclass: (nodeId: string) => void;
  onEventToggleInsertMode: (nodeId: string) => void;
  onEventUpdateObjectName: (nodeId: string, name: string) => void;
  onEventUpdateObjectComment: (nodeId: string, comment: string) => void;
  onEventUpdateSignatureComment: (
    nodeId: string,
    rowIndex: number,
    comment: string
  ) => void;
  onEventUpdateRowField: (
    nodeId: string,
    rowIndex: number,
    field: RowField,
    value: string
  ) => void;
  onEventAddParamRow: (nodeId: string, rowIndex: number) => void;
  onEventDeleteParamRow: (nodeId: string, rowIndex: number) => void;
  onEventUpdateParamName: (
    nodeId: string,
    rowIndex: number,
    paramIndex: number,
    name: string
  ) => void;
  onEventUpdateParamType: (
    nodeId: string,
    rowIndex: number,
    paramIndex: number,
    type: string
  ) => void;
  onEventUpdateParamComment: (
    nodeId: string,
    rowIndex: number,
    paramIndex: number,
    commentType: number,
    comment: string
  ) => void;
};

export type UmlDiagramData = UmlNodeData & UmlDiagramHandlers;

const UmlDiagram = ({ id, data }: NodeProps<UmlDiagramData>) => {
  const findIndex = (elements: HTMLCollection, target: Element | null) => {
    for (let i = 0; i < elements.length; i++) {
      if (elements.item(i) === target) {
        return i;
      }
    }
    return -1;
  };

  const handleNavigation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Control") {
      data.onEventToggleInsertMode(id);
    }

    if (event.key === "Enter") {
      data.onEventAddRow(id);
    } else if (event.key === "Backspace" && event.currentTarget.value === "") {
      data.onEventDeleteRow(id);
    } else if (!data.insertMode) {
      if (event.key === "ArrowRight") {
        try {
          const nextRow = event.currentTarget.parentElement?.children.item(
            (findIndex(
              event.currentTarget.parentElement?.children ?? [],
              event.currentTarget
            ) ?? 0) + 1
          ) as HTMLElement | null;
          nextRow?.focus();
        } catch (error) {
          console.log(error);
        }
      } else if (event.key === "ArrowLeft") {
        try {
          const nextRow = event.currentTarget.parentElement?.children.item(
            (findIndex(
              event.currentTarget.parentElement?.children ?? [],
              event.currentTarget
            ) ?? 0) - 1
          ) as HTMLElement | null;
          nextRow?.focus();
        } catch (error) {
          console.log(error);
        }
      } else if (event.key === "ArrowUp") {
        try {
          const nextRow = event.currentTarget.parentElement?.children.item(
            (findIndex(
              event.currentTarget.parentElement?.children ?? [],
              event.currentTarget
            ) ?? 0) - 4
          ) as HTMLElement | null;
          nextRow?.focus();
        } catch (error) {
          console.log(error);
        }
      } else if (event.key === "ArrowDown") {
        try {
          const nextRow = event.currentTarget.parentElement?.children.item(
            (findIndex(
              event.currentTarget.parentElement?.children ?? [],
              event.currentTarget
            ) ?? 0) + 4
          ) as HTMLElement | null;
          nextRow?.focus();
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(event.key);
      }
    }
  };

  return (
    <div className="diagram" style={{ top: 285, left: 534 }}>
      {data.viewObjectMetadata && (
        <ModalCard
          nodeId={id}
          currentRowIndex={data.currentRowIndex}
          objectName={data.objectName}
          objectComment={data.comment}
          gridTable={data.gridTable}
          objectDataclassStatus={data.dataclass}
          onEventUpdateParamType={data.onEventUpdateParamType}
          onEventUpdateParamName={data.onEventUpdateParamName}
          onEventUpdateParamComment={data.onEventUpdateParamComment}
          onEventUpdateObjectComment={data.onEventUpdateObjectComment}
          onEventUpdateSignatureComment={data.onEventUpdateSignatureComment}
          onEventToggleDataclass={data.onEventToggleDataclass}
          onEventAddParamRow={data.onEventAddParamRow}
          onEventDeleteParamRow={data.onEventDeleteParamRow}
        />
      )}

      {data.dataclass && (
        <div className="object-type">
          <h2 className="object-type__header">{"<<Dataclass>>"}</h2>
        </div>
      )}

      <div className="uml">
        {data.gridTable.map((row, index) => {
          const offSet = index * 50 + 100;
          return (
            <Handle
              key={`target-${index}`}
              type="target"
              id={offSet + "b" + data.objectName + row.signature}
              position={Position.Right}
              style={{
                width: 20,
                height: 20,
                top: offSet,
                backgroundColor: "yellow",
              }}
            />
          );
        })}

        <input
          type="text"
          placeholder={data.objectName}
          onChange={(event) => data.onEventUpdateObjectName(id, event.target.value)}
          className="object-name"
          style={{
            borderTop: data.dataclass
              ? `35px solid ${data.color}`
              : `20px solid ${data.color}`,
          }}
          onKeyDown={handleNavigation}
        />

        <div className="grid-table">
          {data.gridTable.map((inputElement, index) => {
            return (
              <React.Fragment key={`${inputElement.visibility}-${index}`}>
                <input
                  placeholder={inputElement.visibility}
                  onChange={(event) =>
                    data.onEventUpdateRowField(
                      id,
                      index,
                      "visibility",
                      event.target.value
                    )
                  }
                  onKeyDown={handleNavigation}
                />
                <input
                  placeholder={inputElement.signature}
                  onChange={(event) =>
                    data.onEventUpdateRowField(
                      id,
                      index,
                      "signature",
                      event.target.value
                    )
                  }
                  onKeyDown={handleNavigation}
                />
                <input
                  placeholder={inputElement.returnType}
                  onChange={(event) =>
                    data.onEventUpdateRowField(
                      id,
                      index,
                      "returnType",
                      event.target.value
                    )
                  }
                  onKeyDown={handleNavigation}
                />
                <div className="arrowBtn">
                  <FaPlus onClick={() => data.onEventToggleModal(id, index)} />
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {data.gridTable.map((row, index) => {
          const offSet = index * 50 + 100;
          return (
            <Handle
              key={`source-${index}`}
              type="source"
              id={offSet + "a" + data.objectName + row.signature}
              position={Position.Left}
              style={{
                width: 20,
                height: 20,
                top: offSet,
                backgroundColor: "green",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UmlDiagram;
