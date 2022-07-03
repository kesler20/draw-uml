import React, { Component } from "react";

class UmlDiagram extends Component {
  // array of input objects array[ {visibility : '+', signature: 'functionName', type: 'int' } ]
  state = {
    gridTable: [{ visibility: "+", signature: "", type: "" }],
  };

  componentDidMount() {
    this.enableDrag();
  }

  getRandomNumber = (maxNum) => {
    return Math.floor(Math.random() * maxNum);
  };

  getRandomColor = () => {
    const r = this.getRandomNumber(200);
    const g = this.getRandomNumber(200);
    const b = this.getRandomNumber(200);

    return `rgb(${r}, ${g}, ${b})`;
  };

  enableDrag = () => {
    const dragDiagrams = document.querySelectorAll(".diagram");
    dragDiagrams.forEach((diagram) => {
      const drag = (e) => {
        diagram.style.top = e.pageY + "px";
        diagram.style.left = e.pageX + "px";
      };

      /*function drag(e) {
        
      }*/

      diagram.addEventListener("mousedown", () => {
        window.addEventListener("mousemove", drag);
      });

      window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", drag);
      });
    });
  };

  addRow = (e) => {
    let gridTable = this.state.gridTable;
    gridTable.push({ visibility: "+", signature: "", type: "" });
    console.log(gridTable);
    this.setState({ gridTable });
    setTimeout(() => {
      let umlTable =
        e.target.parentNode.classList.value === "grid-table"
          ? e.target.parentNode
          : e.target.parentNode.children.item(1);
      let signatureBox = umlTable.children.item(umlTable.children.length - 3);
      console.log(signatureBox);
      signatureBox.focus();
    }, 0);
  };

  deleteRow = (e) => {
    let gridTable = this.state.gridTable;
    gridTable.pop();
    console.log(gridTable);
    this.setState({ gridTable });
    let umlTable =
      e.target.parentNode.classList.value === "grid-table"
        ? e.target.parentNode
        : e.target.parentNode.children.item(1);
    let signatureBox = umlTable.children.item(umlTable.children.length - 7);
    signatureBox.focus();
  };

  findIndex = (collection, item) => {
    let i = 0;
    for (let j of collection) {
      if (j === item) return i;
      i++;
    }
  };

  handleNavigation = (e) => {
    if (e.key === "Enter") {
      this.addRow(e);
    } else if (e.keyCode === 8 && e.target.value === "") {
      this.deleteRow(e);
    } else if (e.key === "ArrowRight") {
      try {
        let nextRow = e.target.parentNode.children.item(
          this.findIndex(e.target.parentNode.children, e.target) + 1
        );
        nextRow.focus();
      } catch (e) {
        console.log(e);
      }
    } else if (e.key === "ArrowLeft") {
      try {
        let nextRow = e.target.parentNode.children.item(
          this.findIndex(e.target.parentNode.children, e.target) - 1
        );
        nextRow.focus();
      } catch (e) {
        console.log(e);
      }
    } else if (e.key === "ArrowUp") {
      try {
        let nextRow = e.target.parentNode.children.item(
          this.findIndex(e.target.parentNode.children, e.target) - 4
        );
        nextRow.focus();
      } catch (e) {
        console.log(e);
      }
    } else if (e.key === "ArrowDown") {
      try {
        let nextRow = e.target.parentNode.children.item(
          this.findIndex(e.target.parentNode.children, e.target) + 4
        );
        nextRow.focus();
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log(e.key);
    }
  };

  render() {
    return (
      <div className="diagram" style={{ top: 285, left: 534 }}>
        <div className="uml">
          <input
            type="text"
            placeholder="Object Name"
            className="object-name"
            style={{ borderTop: `25px solid ${this.getRandomColor()}` }}
            onKeyDown={(e) => this.handleNavigation(e)}
          />
          <div className="grid-table">
            {this.state.gridTable.map((inputElement) => {
              return (
                <React.Fragment key={inputElement.visibility}>
                  <input
                    value={inputElement.visibility}
                    onChange={(e) => (inputElement.visibility = e.target.value)}
                    onKeyDown={(e) => this.handleNavigation(e)}
                  />
                  <input
                    onChange={(e) => (inputElement.signature = e.target.value)}
                    onKeyDown={(e) => this.handleNavigation(e)}
                  />
                  <input
                    onChange={(e) => (inputElement.type = e.target.value)}
                    onKeyDown={(e) => this.handleNavigation(e)}
                  />
                  <div className="arrowBtn">
                    <i className="fas fa-plus" aria-hidden="true"></i>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default UmlDiagram;
