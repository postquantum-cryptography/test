window.Edges = (function() {
    function startEdge(e) {
      if (window.Utils.state.currentTool !== 'connect') return;
      const startNodeElement = e.target.closest('.node');
      if (!startNodeElement) return; // Ensure click is on a node
      window.Utils.state.isCreatingEdge = true;
      window.Utils.state.edgeStartNodeId = startNodeElement.id;
      const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tempPath.classList.add('temp-edge');
      document.getElementById('edges').appendChild(tempPath);
      window.Utils.state.tempEdge = tempPath;
  
      const startNode = window.Nodes.getNodeById(window.Utils.state.edgeStartNodeId);
      if (startNodeElement) {
        const startX = (startNode.x + startNodeElement.offsetWidth / 2) * window.Utils.state.zoom + window.Utils.state.panOffsetX;
        const startY = (startNode.y + startNodeElement.offsetHeight / 2) * window.Utils.state.zoom + window.Utils.state.panOffsetY;
        tempPath.setAttribute('d', `M${startX},${startY} L${startX},${startY}`);
      }
      e.stopPropagation();
    }
  
    function renderEdges(e) {
      const edgesGroup = document.getElementById('edges');
      edgesGroup.innerHTML = '';
      window.Utils.state.edges.forEach(edge => {
        const fromNode = window.Nodes.getNodeById(edge.from);
        const toNode = window.Nodes.getNodeById(edge.to);
        if (fromNode && toNode) {
          const fromElement = document.getElementById(edge.from);
          const toElement = document.getElementById(edge.to);
  
          const startX = (fromNode.x + fromElement.offsetWidth / 2) * window.Utils.state.zoom + window.Utils.state.panOffsetX;
          const startY = (fromNode.y + fromElement.offsetHeight / 2) * window.Utils.state.zoom + window.Utils.state.panOffsetY;
          const endX = (toNode.x + toElement.offsetWidth / 2) * window.Utils.state.zoom + window.Utils.state.panOffsetX;
          const endY = (toNode.y + toElement.offsetHeight / 2) * window.Utils.state.zoom + window.Utils.state.panOffsetY;
  
          const controlX1 = startX + (endX - startX) * 0.3;
          const controlX2 = startX + (endX - startX) * 0.7;
          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;
  
          const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          group.classList.add('edge-group');
          group.dataset.edgeId = edge.id;
  
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.classList.add('edge-path');
          path.setAttribute('d', `M${startX},${startY} C${controlX1},${startY} ${controlX2},${endY} ${endX},${endY}`);
          if (window.Utils.state.selectedEdgeId === edge.id) path.classList.add('selected');
  
          group.appendChild(path);
  
          if (edge.label) {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.classList.add('edge-label');
            text.setAttribute('x', midX);
            text.setAttribute('y', midY - 5);
            text.textContent = edge.label;
            group.appendChild(text);
          }
  
          edgesGroup.appendChild(group);
  
          path.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.Utils.state.currentTool === 'select') {
              selectEdge(edge.id, midX / window.Utils.state.zoom - window.Utils.state.panOffsetX / window.Utils.state.zoom, midY / window.Utils.state.zoom - window.Utils.state.panOffsetY / window.Utils.state.zoom);
            }
          });
  
          if (window.Utils.state.selectedEdgeId === edge.id) {
            document.getElementById('edge-menu').style.left = `${(midX + 10)}px`;
            document.getElementById('edge-menu').style.top = `${midY}px`;
            document.getElementById('edge-menu').classList.add('visible');
          }
        }
      });
  
      // Render temporary edge if creating one and event is provided
      if (window.Utils.state.isCreatingEdge && window.Utils.state.tempEdge && window.Utils.state.edgeStartNodeId && e) {
        const startNode = window.Nodes.getNodeById(window.Utils.state.edgeStartNodeId);
        const startNodeElement = document.getElementById(window.Utils.state.edgeStartNodeId);
        if (startNodeElement) {
          const rect = document.getElementById('workspace').getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          const startX = (startNode.x + startNodeElement.offsetWidth / 2) * window.Utils.state.zoom + window.Utils.state.panOffsetX;
          const startY = (startNode.y + startNodeElement.offsetHeight / 2) * window.Utils.state.zoom + window.Utils.state.panOffsetY;
          const endX = mouseX;
          const endY = mouseY;
          const controlX1 = startX + (endX - startX) * 0.3;
          const controlX2 = startX + (endX - startX) * 0.7;
          window.Utils.state.tempEdge.setAttribute('d', `M${startX},${startY} C${controlX1},${startY} ${controlX2},${endY} ${endX},${endY}`);
        }
      }
    }
  
    function selectEdge(edgeId, midX, midY) {
      if (window.Utils.state.selectedEdgeId) {
        const prevSelected = document.querySelector(`.edge-group[data-edge-id="${window.Utils.state.selectedEdgeId}"] .edge-path`);
        if (prevSelected) prevSelected.classList.remove('selected');
      }
      if (window.Utils.state.selectedNodeId) {
        document.getElementById(window.Utils.state.selectedNodeId).classList.remove('selected');
        window.Utils.state.selectedNodeId = null;
      }
  
      window.Utils.state.selectedEdgeId = edgeId;
      const selectedPath = document.querySelector(`.edge-group[data-edge-id="${edgeId}"] .edge-path`);
      if (selectedPath) selectedPath.classList.add('selected');
      document.getElementById('edge-menu').style.left = `${(midX * window.Utils.state.zoom + window.Utils.state.panOffsetX + 10)}px`;
      document.getElementById('edge-menu').style.top = `${(midY * window.Utils.state.zoom + window.Utils.state.panOffsetY)}px`;
      document.getElementById('edge-menu').classList.add('visible');
  
      const edge = window.Utils.state.edges.find(e => e.id === edgeId);
      const propertiesPanel = document.getElementById('properties-panel');
      propertiesPanel.classList.add('visible');
      document.getElementById('property-icon').innerHTML = '';
      document.getElementById('property-title').textContent = 'Edge Properties';
      document.getElementById('property-type').value = 'EDGE';
      document.getElementById('property-label').value = edge.label || '';
      document.getElementById('property-value').style.display = 'none';
      document.getElementById('property-notes').value = edge.notes || '';
      document.getElementById('platform-group').style.display = 'none';
      document.getElementById('confidence-group').style.display = 'none';
      document.getElementById('ip-warning').style.display = 'none';
  
      document.getElementById('property-label').oninput = () => {
        edge.label = document.getElementById('property-label').value;
        renderEdges();
      };
      document.getElementById('property-notes').oninput = () => {
        edge.notes = document.getElementById('property-notes').value;
      };
  
      document.getElementById('edge-delete').onclick = () => {
        document.getElementById('delete-prompt').classList.add('visible');
        document.getElementById('delete-confirm').onclick = () => {
          removeEdge(edgeId);
          document.getElementById('delete-prompt').classList.remove('visible');
          document.getElementById('edge-menu').classList.remove('visible');
          propertiesPanel.classList.remove('visible');
        };
        document.getElementById('delete-cancel').onclick = () => {
          document.getElementById('delete-prompt').classList.remove('visible');
        };
      };
  
      document.getElementById('edge-reverse').onclick = () => {
        reverseEdge(edgeId);
        document.getElementById('edge-menu').classList.remove('visible');
        propertiesPanel.classList.remove('visible');
      };
    }
  
    function deselectEdge() {
      if (window.Utils.state.selectedEdgeId) {
        const selectedPath = document.querySelector(`.edge-group[data-edge-id="${window.Utils.state.selectedEdgeId}"] .edge-path`);
        if (selectedPath) selectedPath.classList.remove('selected');
        document.getElementById('edge-menu').classList.remove('visible');
        document.getElementById('properties-panel').classList.remove('visible');
        document.getElementById('property-value').style.display = 'block';
        window.Utils.state.selectedEdgeId = null;
      }
    }
  
    function removeEdge(edgeId) {
      window.Utils.state.edges = window.Utils.state.edges.filter(e => e.id !== edgeId);
      renderEdges();
      updateEdgeCount();
      if (window.Utils.state.selectedEdgeId === edgeId) {
        window.Utils.state.selectedEdgeId = null;
        document.getElementById('properties-panel').classList.remove('visible');
      }
    }
  
    function reverseEdge(edgeId) {
      const edge = window.Utils.state.edges.find(e => e.id === edgeId);
      if (edge) {
        [edge.from, edge.to] = [edge.to, edge.from];
        renderEdges();
      }
    }
  
    function updateEdgeCount() {
      document.getElementById('edges-count').textContent = `${window.Utils.state.edges.length} Connections`;
    }
  
    return {
      startEdge,
      renderEdges,
      selectEdge,
      deselectEdge,
      removeEdge,
      reverseEdge,
      updateEdgeCount
    };
  })();