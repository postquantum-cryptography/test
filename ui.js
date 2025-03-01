window.UI = (function() {
    function toggleApiStore() {
      document.getElementById('api-store').classList.toggle('visible');
    }
  
    function toggleSettingsPanel() {
      let settingsPanel = document.getElementById('settings-panel');
      if (!settingsPanel) {
        settingsPanel = document.createElement('div');
        settingsPanel.id = 'settings-panel';
        settingsPanel.className = 'settings-panel';
        settingsPanel.innerHTML = `
          <h2 class="settings-title">Settings</h2>
          <div class="form-group">
            <label class="form-label">Theme</label>
            <label><input type="checkbox" id="theme-toggle"> Dark Theme</label>
          </div>
          <div class="form-group">
            <label class="form-label">Confidence Labelling</label>
            <label><input type="checkbox" id="confidence-toggle"> Stickers (vs Color)</label>
          </div>
        `;
        document.body.appendChild(settingsPanel);
  
        // Set initial states and add event listeners
        document.getElementById('theme-toggle').checked = window.Utils.state.isDarkTheme;
        document.getElementById('theme-toggle').addEventListener('change', () => {
          window.Utils.state.isDarkTheme = document.getElementById('theme-toggle').checked;
          document.body.classList.toggle('light-theme', !window.Utils.state.isDarkTheme);
        });
  
        document.getElementById('confidence-toggle').checked = window.Utils.state.useStickers;
        document.getElementById('confidence-toggle').addEventListener('change', () => {
          window.Utils.state.useStickers = document.getElementById('confidence-toggle').checked;
          window.Nodes.updateNodeStyles();
        });
      }
      settingsPanel.classList.toggle('visible');
    }
  
    function updateZoom() {
      const workspace = document.getElementById('workspace');
      const canvas = document.getElementById('canvas');
      const nodesContainer = document.getElementById('nodes-container');
      const baseWidth = workspace.offsetWidth;
      const baseHeight = workspace.offsetHeight;
      canvas.setAttribute('width', baseWidth * window.Utils.state.zoom);
      canvas.setAttribute('height', baseHeight * window.Utils.state.zoom);
      canvas.style.width = `${baseWidth}px`;
      canvas.style.height = `${baseHeight}px`;
      const transform = `translate(${window.Utils.state.panOffsetX}px, ${window.Utils.state.panOffsetY}px) scale(${window.Utils.state.zoom})`;
      nodesContainer.style.transform = transform;
      window.Edges.renderEdges();
      document.getElementById('zoom-level').textContent = `Zoom: ${Math.round(window.Utils.state.zoom * 100)}%`;
    }
  
    function setupUIListeners({
      renderEdges,
      selectNode,
      deselectEdge,
      removeNode,
      startDragging,
      startEdge,
      updateNodeCount,
      updateEdgeCount,
      updateZoom
    }) {
      document.getElementById('api-store-btn').addEventListener('click', toggleApiStore);
      document.getElementById('settings-btn').addEventListener('click', toggleSettingsPanel);
  
      document.getElementById('select-tool').addEventListener('click', () => {
        window.Utils.state.currentTool = 'select';
        document.getElementById('select-tool').classList.add('active');
        document.getElementById('connect-tool').classList.remove('active');
        if (window.Utils.state.isCreatingEdge) {
          window.Utils.state.isCreatingEdge = false;
          window.Utils.state.edgeStartNodeId = null;
          if (window.Utils.state.tempEdge) {
            window.Utils.state.tempEdge.remove();
            window.Utils.state.tempEdge = null;
          }
        }
        deselectEdge();
      });
  
      document.getElementById('connect-tool').addEventListener('click', () => {
        window.Utils.state.currentTool = 'connect';
        document.getElementById('connect-tool').classList.add('active');
        document.getElementById('select-tool').classList.remove('active');
        deselectEdge();
      });
  
      document.getElementById('zoom-in').addEventListener('click', () => {
        window.Utils.state.zoom = Math.min(window.Utils.state.zoom + 0.1, 2);
        updateZoom();
      });
  
      document.getElementById('zoom-out').addEventListener('click', () => {
        window.Utils.state.zoom = Math.max(window.Utils.state.zoom - 0.1, 0.5);
        updateZoom();
      });
  
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Delete') {
          if (window.Utils.state.selectedNodeId) {
            document.getElementById('delete-prompt').classList.add('visible');
            document.getElementById('delete-confirm').onclick = () => {
              removeNode(window.Utils.state.selectedNodeId);
              document.getElementById('delete-prompt').classList.remove('visible');
            };
            document.getElementById('delete-cancel').onclick = () => {
              document.getElementById('delete-prompt').classList.remove('visible');
            };
          } else if (window.Utils.state.selectedEdgeId) {
            document.getElementById('delete-prompt').classList.add('visible');
            document.getElementById('delete-confirm').onclick = () => {
              window.Edges.removeEdge(window.Utils.state.selectedEdgeId);
              document.getElementById('delete-prompt').classList.remove('visible');
              document.getElementById('edge-menu').classList.remove('visible');
              document.getElementById('properties-panel').classList.remove('visible');
            };
            document.getElementById('delete-cancel').onclick = () => {
              document.getElementById('delete-prompt').classList.remove('visible');
            };
          }
        }
      });
  
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.edge-group') && !e.target.closest('.edge-menu') && !e.target.closest('.node') && !e.target.closest('.properties-panel') && !e.target.closest('.settings-panel')) {
          deselectEdge();
          if (window.Utils.state.selectedNodeId) {
            document.getElementById(window.Utils.state.selectedNodeId).classList.remove('selected');
            document.getElementById('properties-panel').classList.remove('visible');
            window.Utils.state.selectedNodeId = null;
          }
          const settingsPanel = document.getElementById('settings-panel');
          if (settingsPanel && !e.target.closest('#settings-btn')) {
            settingsPanel.classList.remove('visible');
          }
        }
      });
    }
  
    return {
      toggleApiStore,
      toggleSettingsPanel,
      updateZoom,
      setupUIListeners
    };
  })();