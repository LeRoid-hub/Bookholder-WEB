document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const logoutButton = document.querySelector('.logout-button');
    const tabHeader = document.getElementById('tab-header');
    const tabContent = document.getElementById('tab-content');
    const componentsDirectory = 'assets/components/';
  
    // Track open tabs
    const openTabs = new Map();
  
    // Handle navigation links
    navLinks.forEach((link) => {
      link.addEventListener('click', async (event) => {
        event.preventDefault();
  
        const fileName = link.dataset.file;
        const tabName = fileName.replace('.html', '');
  
        // Check if the tab is already open
        if (openTabs.has(tabName)) {
          // If the tab is already open, activate it
          activateTab(tabName);
          return;
        }
  
        // Remove placeholder if it's the first tab
        const placeholderTab = document.querySelector('.placeholder-tab');
        const placeholderContent = document.querySelector('.placeholder-content');
        if (placeholderTab) placeholderTab.remove();
        if (placeholderContent) placeholderContent.remove();
  
        // Create a new tab
        const newTab = document.createElement('div');
        newTab.className = 'flex items-center space-x-2 py-2 px-4 border-b-2 border-transparent cursor-pointer';
        newTab.id = `tab-${tabName}`;
  
        // Tab name (acts as a button)
        const tabLabel = document.createElement('button');
        tabLabel.className = 'focus:outline-none';
        tabLabel.textContent = tabName;
  
        // Switch to this tab when clicked
        tabLabel.addEventListener('click', () => {
          activateTab(tabName);
        });
  
        // Close button
        const closeButton = document.createElement('button');
        closeButton.className = 'text-gray-400 hover:text-red-500 focus:outline-none';
        closeButton.textContent = 'X';
        closeButton.title = 'Close Tab';
  
        // Close tab logic
        closeButton.addEventListener('click', () => {
          // Remove tab and content
          newTab.remove();
          const relatedContent = document.getElementById(`content-${tabName}`);
          if (relatedContent) relatedContent.remove();
  
          // Remove from openTabs tracker
          openTabs.delete(tabName);
  
          // If no tabs are open, show placeholder
          if (openTabs.size === 0) {
            const placeholder = document.createElement('div');
            placeholder.className = 'flex items-center space-x-2 placeholder-tab';
            //placeholder.innerHTML = '<span class="py-2 px-4 text-center">Placeholder</span>';
            tabHeader.appendChild(placeholder);
  
            const placeholderContent = document.createElement('p');
            placeholderContent.className = 'placeholder-content';
            placeholderContent.textContent =
              'This is the placeholder content. Click a link from the navbar to replace this content.';
            tabContent.appendChild(placeholderContent);
          }
        });
  
        newTab.appendChild(tabLabel);
        newTab.appendChild(closeButton);
        tabHeader.appendChild(newTab);
  
        // Create content for the new tab
        const newContent = document.createElement('div');
        newContent.id = `content-${tabName}`;
        newContent.className = 'tab-content-item hidden';
  
        // Load content from the file
        try {
          const response = await fetch(componentsDirectory + fileName);
          if (!response.ok) {
            throw new Error(`Failed to load ${fileName}`);
          }
          newContent.innerHTML = await response.text();
        } catch (error) {
          newContent.innerHTML = `<p class="text-red-500">Error loading content: ${error.message}</p>`;
        }
  
        tabContent.appendChild(newContent);
  
        // Hide other contents and show this one
        activateTab(tabName);
  
        // Track the open tab
        openTabs.set(tabName, newTab);
      });
    });
  
    // Activate a tab and show its content
    function activateTab(tabName) {
      // Deactivate all tabs
      document.querySelectorAll('#tab-header > div').forEach((tab) => {
        tab.classList.remove('border-blue-500');
        tab.classList.add('border-transparent');
      });
  
      // Hide all content
      document.querySelectorAll('.tab-content-item').forEach((content) => {
        content.classList.add('hidden');
      });
  
      // Activate the current tab
      const activeTab = document.getElementById(`tab-${tabName}`);
      const activeContent = document.getElementById(`content-${tabName}`);
      if (activeTab && activeContent) {
        activeTab.classList.add('border-blue-500');
        activeTab.classList.remove('border-transparent');
        activeContent.classList.remove('hidden');
      }
    }
  
    // Handle logout button separately
    logoutButton.addEventListener('click', (event) => {
      event.preventDefault();
      alert('You have been logged out.');
      // Uncomment the following line to redirect to a login page
      // window.location.href = '/login';
    });
  });
  