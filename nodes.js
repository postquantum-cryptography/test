window.Nodes = (function() {
    function createNode(type, x, y) {
      const nodeId = `node-${Date.now()}`;
      const nodeType = WIDGET_TYPES[type];
      
      const node = {
        id: nodeId,
        type: type,
        label: nodeType.label,
        value: '',
        notes: '',
        x: x,
        y: y,
        confidence: 3 // Default confidence: Likely Correct
      };
      if (type === 'SOCIAL_MEDIA') {
        node.platform = 'Discord';
      } else if (type === 'CRYPTO_WALLET') {
        node.platform = 'Bitcoin';
      }
  
      window.Utils.state.nodes.push(node);
      renderNode(nodeId);
      return nodeId;
    }
  
    function getNodeById(id) {
      return window.Utils.state.nodes.find(n => n.id === id) || document.getElementById(id);
    }
  
    function renderNode(nodeId) {
      const node = getNodeById(nodeId);
      if (!node) return;
  
      const nodeType = WIDGET_TYPES[node.type];
      let nodeIcon = nodeType.icon;
      if (node.type === 'SOCIAL_MEDIA' && node.platform) {
        nodeIcon = nodeType.icons[node.platform];
      } else if (node.type === 'CRYPTO_WALLET' && node.platform) {
        nodeIcon = nodeType.icons[node.platform];
      }
  
      let nodeElement = document.getElementById(nodeId);
  
      if (!nodeElement) {
        nodeElement = document.createElement('div');
        nodeElement.id = nodeId;
        nodeElement.className = 'node';
        nodeElement.innerHTML = `
          <div class="node-header">
            <div class="node-icon-label">
              <svg class="node-icon" style="stroke: ${nodeType.color}">${nodeIcon}</svg>
              <span class="node-label">${node.label}</span>
            </div>
            <button class="node-close">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="node-content ${node.value ? '' : 'node-empty'}">
            ${node.value || 'No value'}
          </div>
          <div class="node-connector start" data-node="${nodeId}"></div>
          <div class="node-connector end" data-node="${nodeId}"></div>
        `;
        document.getElementById('nodes-container').appendChild(nodeElement);
  
        nodeElement.addEventListener('mousedown', (e) => {
          if (window.Utils.state.currentTool === 'select') {
            startDragging(e);
          } else if (window.Utils.state.currentTool === 'connect') {
            window.Edges.startEdge(e); // Trigger startEdge from anywhere on the node
          }
        });
        nodeElement.querySelector('.node-close').addEventListener('click', (e) => {
          e.stopPropagation();
          document.getElementById('delete-prompt').classList.add('visible');
          document.getElementById('delete-confirm').onclick = () => {
            removeNode(nodeId);
            document.getElementById('delete-prompt').classList.remove('visible');
          };
          document.getElementById('delete-cancel').onclick = () => {
            document.getElementById('delete-prompt').classList.remove('visible');
          };
        });
      }
  
      nodeElement.style.left = `${node.x}px`;
      nodeElement.style.top = `${node.y}px`;
  
      const nodeLabel = nodeElement.querySelector('.node-label');
      const nodeContent = nodeElement.querySelector('.node-content');
      const nodeIconElement = nodeElement.querySelector('.node-icon');
      nodeLabel.textContent = node.label;
      nodeContent.textContent = node.value || 'No value';
      nodeContent.classList.toggle('node-empty', !node.value);
      nodeIconElement.innerHTML = nodeIcon;
      nodeIconElement.style.stroke = nodeType.color;
  
      updateNodeStyle(nodeElement, node.confidence);
    }
  
    function updateNodeStyle(nodeElement, confidence) {
      nodeElement.classList.remove('confidence-1', 'confidence-2', 'confidence-3', 'confidence-4', 'color');
      if (nodeElement.querySelector('.confidence-sticker')) {
        nodeElement.removeChild(nodeElement.querySelector('.confidence-sticker'));
      }
  
      if (window.Utils.state.useStickers) {
        const sticker = document.createElement('div');
        sticker.className = 'confidence-sticker';
        nodeElement.appendChild(sticker);
      } else {
        nodeElement.classList.add('color');
      }
      nodeElement.classList.add(`confidence-${confidence}`);
    }
  
    function updateNodeStyles() {
      window.Utils.state.nodes.forEach(node => {
        const nodeElement = document.getElementById(node.id);
        if (nodeElement) updateNodeStyle(nodeElement, node.confidence);
      });
    }
  
    function startDragging(e) {
      if (window.Utils.state.currentTool !== 'select' || e.target.classList.contains('node-connector')) return;
      const nodeElement = e.target.closest('.node');
      if (!nodeElement) return;
  
      const nodeId = nodeElement.id;
      const node = getNodeById(nodeId);
  
      window.Utils.state.isDragging = true;
      window.Utils.state.dragOffsetX = e.clientX / window.Utils.state.zoom - node.x - window.Utils.state.panOffsetX;
      window.Utils.state.dragOffsetY = e.clientY / window.Utils.state.zoom - node.y - window.Utils.state.panOffsetY;
      nodeElement.classList.add('selected');
      nodeElement.classList.add('dragging');
      selectNode(nodeId);
  
      const moveHandler = (moveEvent) => {
        if (window.Utils.state.isDragging) {
          node.x = moveEvent.clientX / window.Utils.state.zoom - window.Utils.state.dragOffsetX - window.Utils.state.panOffsetX;
          node.y = moveEvent.clientY / window.Utils.state.zoom - window.Utils.state.dragOffsetY - window.Utils.state.panOffsetY;
          nodeElement.style.left = `${node.x}px`;
          nodeElement.style.top = `${node.y}px`;
          window.Edges.renderEdges();
        }
      };
  
      const upHandler = () => {
        if (window.Utils.state.isDragging) {
          window.Utils.state.isDragging = false;
          nodeElement.classList.remove('dragging');
          nodeElement.classList.add('selected');
          document.removeEventListener('mousemove', moveHandler);
          document.removeEventListener('mouseup', upHandler);
        }
      };
  
      document.addEventListener('mousemove', moveHandler);
      document.addEventListener('mouseup', upHandler);
      e.stopPropagation();
    }
  
    function removeNode(nodeId) {
      window.Utils.state.nodes = window.Utils.state.nodes.filter(n => n.id !== nodeId);
      const nodeElement = document.getElementById(nodeId);
      if (nodeElement) nodeElement.remove();
      window.Utils.state.edges = window.Utils.state.edges.filter(e => e.from !== nodeId && e.to !== nodeId);
      updateNodeCount();
      window.Edges.updateEdgeCount();
      window.Edges.renderEdges();
      if (window.Utils.state.selectedNodeId === nodeId) {
        document.getElementById('properties-panel').classList.remove('visible');
        window.Utils.state.selectedNodeId = null;
      }
    }
  
    function selectNode(nodeId) {
      const prevSelected = document.querySelector('.node.selected');
      if (prevSelected) prevSelected.classList.remove('selected');
      if (window.Utils.state.selectedEdgeId) window.Edges.deselectEdge();
  
      window.Utils.state.selectedNodeId = nodeId;
      window.Utils.state.selectedEdgeId = null;
      const node = getNodeById(nodeId);
      const nodeType = WIDGET_TYPES[node.type];
  
      const propertiesPanel = document.getElementById('properties-panel');
      const propertyIcon = document.getElementById('property-icon');
      const propertyTitle = document.getElementById('property-title');
      const propertyType = document.getElementById('property-type');
      const propertyLabel = document.getElementById('property-label');
      const propertyValue = document.getElementById('property-value');
      const propertyNotes = document.getElementById('property-notes');
      const propertyConfidence = document.getElementById('property-confidence');
      const confidenceLabel = document.getElementById('confidence-label');
      const platformGroup = document.getElementById('platform-group');
      const propertyPlatform = document.getElementById('property-platform');
      const ipWarning = document.getElementById('ip-warning');
  
      propertiesPanel.classList.add('visible');
      propertyIcon.innerHTML = nodeType.icon;
      if (node.type === 'SOCIAL_MEDIA' && node.platform) {
        propertyIcon.innerHTML = nodeType.icons[node.platform];
      } else if (node.type === 'CRYPTO_WALLET' && node.platform) {
        propertyIcon.innerHTML = nodeType.icons[node.platform];
      }
      propertyIcon.style.stroke = nodeType.color;
      propertyTitle.textContent = nodeType.label;
      propertyType.value = node.type;
      propertyLabel.value = node.label;
      propertyValue.value = node.value;
      propertyNotes.value = node.notes;
      propertyConfidence.value = node.confidence;
      confidenceLabel.textContent = window.Utils.confidenceLabels[node.confidence];
  
      if (node.type === 'IP_ADDRESS') {
        const isValidIP = window.Utils.ipv4Regex.test(node.value) || window.Utils.ipv6Regex.test(node.value);
        ipWarning.style.display = node.value && !isValidIP ? 'flex' : 'none';
      } else {
        ipWarning.style.display = 'none';
      }
  
      if (node.type === 'SOCIAL_MEDIA' || node.type === 'CRYPTO_WALLET') {
        platformGroup.style.display = 'block';
        const platforms = node.type === 'SOCIAL_MEDIA' ?
          ['Discord', 'Facebook', 'Github', 'Instagram', 'Twitter', 'Something else'] :
          ['Bitcoin', 'Doge', 'Ethereum', 'Monero', 'Solana', 'Something else'];
        propertyPlatform.innerHTML = platforms.map(platform => 
          `<option value="${platform}" ${node.platform === platform ? 'selected' : ''}>${platform}</option>`
        ).join('');
        propertyPlatform.value = node.platform || platforms[0];
        propertyPlatform.onchange = () => {
          node.platform = propertyPlatform.value;
          renderNode(nodeId);
        };
      } else {
        platformGroup.style.display = 'none';
      }
  
      document.getElementById('confidence-group').style.display = 'block';
      propertyConfidence.oninput = () => {
        node.confidence = parseInt(propertyConfidence.value);
        confidenceLabel.textContent = window.Utils.confidenceLabels[node.confidence];
        renderNode(nodeId);
      };
  
      propertyLabel.oninput = () => {
        node.label = propertyLabel.value;
        renderNode(nodeId);
      };
      propertyValue.oninput = () => {
        node.value = propertyValue.value;
        if (node.type === 'IP_ADDRESS') {
          const isValidIP = window.Utils.ipv4Regex.test(node.value) || window.Utils.ipv6Regex.test(node.value);
          ipWarning.style.display = node.value && !isValidIP ? 'flex' : 'none';
        }
        renderNode(nodeId);
      };
      propertyNotes.oninput = () => {
        node.notes = propertyNotes.value;
      };
    }
  
    function updateNodeCount() {
      document.getElementById('nodes-count').textContent = `${window.Utils.state.nodes.length} Nodes`;
    }
  
    return {
      createNode,
      getNodeById,
      renderNode,
      removeNode,
      selectNode,
      updateNodeCount,
      updateNodeStyles,
      startDragging
    };
  })();