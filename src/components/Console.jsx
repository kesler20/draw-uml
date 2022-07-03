import React, { Component } from "react";
import UmlDiagram from "./UmlDiagram";

class Console extends Component {
  state = { umlDiagrams: [{ id: 0 }] };
  handleCreateDiagram = () => {
    let { umlDiagrams } = this.state;
    umlDiagrams.push({ id: umlDiagrams.length + 1 });
    this.setState({ umlDiagrams });
  };
  render() {
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
              <button
                className="btn create-table-btn"
                onClick={this.handleCreateDiagram}
              >
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
              {this.state.umlDiagrams.map((diagram) => {
                return <UmlDiagram key={diagram.id} />;
              })}
            </div>
          </div>
          <div className="data-model data-model-grid"></div>
        </section>
      </div>
    );
  }
}

export default Console;
