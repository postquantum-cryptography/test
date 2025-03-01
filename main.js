document.addEventListener('DOMContentLoaded', () => {
    const { createNode, renderNode, removeNode, selectNode, updateNodeCount, updateNodeStyles, startDragging } = window.Nodes;
    const { startEdge, renderEdges, selectEdge, deselectEdge, removeEdge, reverseEdge, updateEdgeCount } = window.Edges;
    const { toggleApiStore, toggleSettingsPanel, updateZoom, setupUIListeners } = window.UI;
  
    const workspace = document.getElementById('workspace');
    const nodesContainer = document.getElementById('nodes-container');
  
    document.querySelectorAll('.widget-item').forEach(widget => {
      widget.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', widget.dataset.type);
        widget.classList.add('grabbed');
      });
  
      widget.addEventListener('dragend', () => {
        widget.classList.remove('grabbed');
      });
    });
  
    workspace.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
  
    workspace.addEventListener('drop', (e) => {
      e.preventDefault();
      const type = e.dataTransfer.getData('text/plain');
      if (WIDGET_TYPES[type]) {
        const rect = workspace.getBoundingClientRect();
        const x = (e.clientX - rect.left - window.Utils.state.panOffsetX) / window.Utils.state.zoom;
        const y = (e.clientY - rect.top - window.Utils.state.panOffsetY) / window.Utils.state.zoom;
        createNode(type, x, y);
        updateNodeCount();
      }
    });
  
    setupUIListeners({
      renderEdges,
      selectNode,
      deselectEdge,
      removeNode,
      startDragging,
      startEdge,
      updateNodeCount,
      updateEdgeCount,
      updateZoom
    });
  
    workspace.addEventListener('mousedown', (e) => {
      const { currentTool, selectedNodeId } = window.Utils.state;
      if (currentTool === 'select' && !e.target.closest('.node') && !e.target.closest('.edge-group') && !e.target.closest('.edge-menu')) {
        window.Utils.state.isPanning = true;
        window.Utils.state.dragOffsetX = e.clientX - window.Utils.state.panOffsetX;
        window.Utils.state.dragOffsetY = e.clientY - window.Utils.state.panOffsetY;
        workspace.style.cursor = 'grabbing';
        deselectEdge();
        if (selectedNodeId) {
          document.getElementById(selectedNodeId).classList.remove('selected');
          document.getElementById('properties-panel').classList.remove('visible');
          window.Utils.state.selectedNodeId = null;
        }
      }
    });
  
    document.addEventListener('mousemove', (e) => {
      const { isPanning, isCreatingEdge, tempEdge } = window.Utils.state;
      if (isPanning) {
        window.Utils.state.panOffsetX = e.clientX - window.Utils.state.dragOffsetX;
        window.Utils.state.panOffsetY = e.clientY - window.Utils.state.dragOffsetY;
        updateZoom();
      }
      if (isCreatingEdge && tempEdge) {
        renderEdges(e); // Call renderEdges with event to update temp edge
      }
    });
  
    document.addEventListener('mouseup', (e) => {
      const { isPanning, isCreatingEdge, tempEdge } = window.Utils.state;
      if (isPanning) {
        window.Utils.state.isPanning = false;
        workspace.style.cursor = 'default';
      }
      if (isCreatingEdge) {
        const target = e.target.closest('.node'); // End edge on any part of a node
        if (target && target.id !== window.Utils.state.edgeStartNodeId) {
          const edgeId = `edge-${Date.now()}`;
          window.Utils.state.edges.push({
            id: edgeId,
            from: window.Utils.state.edgeStartNodeId,
            to: target.id,
            label: '',
            notes: ''
          });
          renderEdges(e); // Pass event to renderEdges
          updateEdgeCount();
        }
        window.Utils.state.isCreatingEdge = false;
        window.Utils.state.edgeStartNodeId = null;
        if (tempEdge) {
          tempEdge.remove();
          window.Utils.state.tempEdge = null;
        }
      }
    });
  
    updateNodeCount();
    updateEdgeCount();
    renderEdges(); // Initial render without event
  });