// JavaScript for dynamic content fetching
document.getElementById('fetchDataBtn').addEventListener('click', () => {
    fetch('data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const dynamicContent = document.getElementById('dynamicContent');
        dynamicContent.innerHTML = ''; // Clear existing content
  
        data.forEach((item) => {
          const contentBlock = document.createElement('div');
          contentBlock.className = 'data-block p-3 mb-3 bg-white rounded shadow-sm';
          contentBlock.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          `;
          dynamicContent.appendChild(contentBlock);
        });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        const dynamicContent = document.getElementById('dynamicContent');
        dynamicContent.innerHTML = `<p class="text-danger">Failed to load data. Please try again later.</p>`;
      });
  });
  