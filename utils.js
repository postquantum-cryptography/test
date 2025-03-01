window.Utils = (function() {
    const state = {
      nodes: [],
      edges: [],
      selectedNodeId: null,
      selectedEdgeId: null,
      zoom: 1,
      isDragging: false,
      isPanning: false,
      dragOffsetX: 0,
      dragOffsetY: 0,
      panOffsetX: 0,
      panOffsetY: 0,
      isCreatingEdge: false,
      edgeStartNodeId: null,
      tempEdge: null,
      currentTool: 'select',
      isDarkTheme: true,
      useStickers: false
    };
  
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^([0-9A-Fa-f]{0,4}:){7}[0-9A-Fa-f]{0,4}$/;
  
    const confidenceLabels = {
      1: 'Known False Positive',
      2: 'Questionable',
      3: 'Likely Correct',
      4: 'Confirmed'
    };
  
    return {
      state,
      ipv4Regex,
      ipv6Regex,
      confidenceLabels
    };
  })();