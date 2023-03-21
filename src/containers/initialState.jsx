export const getRandomNumber = (maxNum) => {
  return Math.floor(Math.random() * maxNum);
};

export const getRandomColor = () => {
  const r = getRandomNumber(200);
  const g = getRandomNumber(200);
  const b = getRandomNumber(200);

  return `rgb(${r}, ${g}, ${b})`;
};

export const initialEdges = [];

export const initialNodes = [
  {
    id: "node-1",
    type: "umlDiagram",
    position: { x: 500, y: 500 },
    data: {
      objectName: "Object Name",
      color: getRandomColor(),
      comment: "Object Description",
      dataclass: false,
      gridTable: [
        {
          visibility: "+",
          signature: "",
          returnType: "",
          comment: "signature description",
          params: [{ name: "name", type: "type" }],
        },
      ],
      connection: false,
    },
  },
];
