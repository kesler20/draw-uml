import * as React from "react";
import { FaPlus } from "react-icons/fa6";
import { Badge, DesignNotes } from "./StyledElements";
import CheckBox from "./CheckBox";
import type { UmlRow } from "../types/uml";

type ModalCardProps = {
  nodeId: string;
  currentRowIndex: number;
  objectName: string;
  objectComment: string;
  gridTable: UmlRow[];
  objectDataclassStatus: boolean;
  onEventUpdateParamType: (
    nodeId: string,
    rowIndex: number,
    paramIndex: number,
    type: string
  ) => void;
  onEventUpdateParamName: (
    nodeId: string,
    rowIndex: number,
    paramIndex: number,
    name: string
  ) => void;
  onEventUpdateParamComment: (
    nodeId: string,
    rowIndex: number,
    paramIndex: number,
    commentType: number,
    comment: string
  ) => void;
  onEventUpdateObjectComment: (nodeId: string, comment: string) => void;
  onEventUpdateSignatureComment: (
    nodeId: string,
    rowIndex: number,
    comment: string
  ) => void;
  onEventToggleDataclass: (nodeId: string) => void;
  onEventAddParamRow: (nodeId: string, rowIndex: number) => void;
  onEventDeleteParamRow: (nodeId: string, rowIndex: number) => void;
};

const ModalCard = (props: ModalCardProps) => {
  const currentRow = props.gridTable[props.currentRowIndex];
  const params = currentRow?.params ?? [];
  const signatureComment = currentRow?.comment ?? "";
  const signatureLabel =
    currentRow?.signature && currentRow.signature !== ""
      ? currentRow.signature
      : "signature";
  
  const findIndex = (
    elements: HTMLCollection,
    target: Element | null
  ) => {
    for (let i = 0; i < elements.length; i++) {
      if (elements.item(i) === target) {
        return i;
      }
    }
    return -1;
  }

  /**
   * handle the navigation by focusing the right input element depending on
   * the targeted input element and the key that has been pressed
   * @param e - onKeyPressed event from the input element
   */
  const handleNavigation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let next: { focus: () => void } | HTMLElement = {
      focus: () => "placeholder",
    };

    if (
      e.currentTarget === e.currentTarget.parentElement?.children.item(0) &&
      e.key === "ArrowRight"
    ) {
      next = e.currentTarget.parentElement?.children.item(1) as HTMLElement;
    } else if (
      e.currentTarget === e.currentTarget.parentElement?.children.item(1) &&
      e.key === "ArrowLeft"
    ) {
      next = e.currentTarget.parentElement?.children.item(0) as HTMLElement;
    } else if (e.key === "ArrowDown") {
      const nextF = findIndex(
        e.currentTarget.parentElement?.parentElement?.children ?? [],
        e.currentTarget.parentElement
      );
      next = e.currentTarget.parentElement?.parentElement?.children
        .item((nextF ?? 0) + 1)
        ?.children.item((nextF ?? 0) % 2 === 0 ? 0 : 1) as HTMLElement;
    } else if (e.key === "ArrowUp") {
      const nextF = findIndex(
        e.currentTarget.parentElement?.parentElement?.children ?? [],
        e.currentTarget.parentElement
      );
      next = e.currentTarget.parentElement?.parentElement?.children
        .item((nextF ?? 0) - 1)
        ?.children.item((nextF ?? 0) % 2 === 0 ? 0 : 1) as HTMLElement;
    } else if (e.key === "Backspace") {
      if (e.currentTarget.value === "") {
        props.onEventDeleteParamRow(props.nodeId, props.currentRowIndex);
      }
    } else if (e.key === "Enter") {
      props.onEventAddParamRow(props.nodeId, props.currentRowIndex);
    } else {
      next = { focus: () => "placeholder" };
    }

    try {
      next.focus();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DesignNotes>
      <h3>{props.objectName}</h3>
      <div className="flex-row-start">
        <Badge>
          <img
            src="https://uploads-ssl.webflow.com/612b579592e3bf93283444b6/612b69f61d22d5ca878550af_chevron-right.svg"
            loading="lazy"
            alt=""
            className="image-2-copy-copy"
          />
        </Badge>
        <p>Description</p>
      </div>
      <textarea
        className="class"
        value={props.objectComment}
        onChange={(e) =>
          props.onEventUpdateObjectComment(props.nodeId, e.target.value)
        }
      />
      <div className="flex-row-around">
        <CheckBox
          label="set dataclass"
          checked={props.objectDataclassStatus}
          onEventToggle={() => props.onEventToggleDataclass(props.nodeId)}
        />
      </div>
      <div className="flex-row-start">
        <Badge>
          <img
            src="https://uploads-ssl.webflow.com/612b579592e3bf93283444b6/612b69f61d22d5ca878550af_chevron-right.svg"
            loading="lazy"
            alt=""
            className="image-2-copy-copy"
          />
        </Badge>
        <p>{signatureLabel} params</p>
      </div>
      <textarea
        value={signatureComment}
        onChange={(e) =>
          props.onEventUpdateSignatureComment(
            props.nodeId,
            props.currentRowIndex,
            e.target.value
          )
        }
      />
      {params.map((param, index) => {
        return (
          <React.Fragment key={`${param.name}-${index}`}>
            <hr style={{ marginTop: "15px" }} />
            <div className="flex-row-around margin-small">
              <input
                value={param.name}
                onChange={(e) =>
                  props.onEventUpdateParamName(
                    props.nodeId,
                    props.currentRowIndex,
                    index,
                    e.target.value
                  )
                }
                onKeyDown={handleNavigation}
              />
              <input
                value={param.type}
                onChange={(e) =>
                  props.onEventUpdateParamType(
                    props.nodeId,
                    props.currentRowIndex,
                    index,
                    e.target.value
                  )
                }
                onKeyDown={handleNavigation}
              />
              <div
                className="add-row-btn"
                onClick={() =>
                  props.onEventAddParamRow(props.nodeId, props.currentRowIndex)
                }
              >
                <FaPlus />
              </div>
            </div>
            <div className="flex-row-around margin-small">
              <input
                style={{ width: "125px" }}
                value={param.comment[0]}
                onChange={(e) =>
                  props.onEventUpdateParamComment(
                    props.nodeId,
                    props.currentRowIndex,
                    index,
                    0,
                    e.target.value
                  )
                }
              />
              <input
                style={{ width: "125px" }}
                value={param.comment[1]}
                onChange={(e) =>
                  props.onEventUpdateParamComment(
                    props.nodeId,
                    props.currentRowIndex,
                    index,
                    1,
                    e.target.value
                  )
                }
              />
            </div>
          </React.Fragment>
        );
      })}
    </DesignNotes>
  );
};

export default ModalCard;
