const GRAPH_VIS_OPTIONS = {
  physics: false,
  autoResize: true,
  layout: {
    hierarchical: {
      enabled: false,
    },
  },
  edges: {
    color: 'black',
    arrows: {
      to: {
        enabled: true,
      },
    },
    smooth: {
      enabled: true,
    },
  },
  nodes: {
    borderWidth: 0,
    shape: 'box',
    margin: 10,
    color: {
      background: '#707070',
      hover: {
        background: '#a39e9e',
      },
    },
    font: {
      size: 14,
      face: 'roboto',
      color: 'white',
    },
  },
  interaction: {
    zoomView: false,
    dragNodes: false,
    dragView: false,
    hover: true,
    selectable: true,
  },
};

export default GRAPH_VIS_OPTIONS;
