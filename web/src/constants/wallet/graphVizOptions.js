const GRAPH_VIS_OPTIONS = {
  physics: {
    enabled: true,
    stabilization: {
      enabled: true,
    },
  },
  autoResize: true,
  width: '100%',
  height: '100%',
  layout: {
    improvedLayout: true,
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
    dragNodes: false,
    dragView: false,
    hover: true,
    selectable: true,
    zoomView: false,
  },
};

export default GRAPH_VIS_OPTIONS;
