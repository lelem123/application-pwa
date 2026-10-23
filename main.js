// Main JavaScript for Application Web App
// This is a Safari-compatible version of the original iOS application

class App {
    constructor() {
        this.initializeApp();
        this.setupEventListeners();
        this.loadContent();
    }

    initializeApp() {
        // Set up basic app functionality
        console.log('Application initialized');
        
        // Add touch and click support for Safari
        document.addEventListener('touchstart', function() {}, { passive: true });
        document.addEventListener('touchmove', function() {}, { passive: false });
    }

    setupEventListeners() {
        // Handle window resize events
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Handle offline/online status
        window.addEventListener('online', () => {
            console.log('App is now online');
        });
        
        window.addEventListener('offline', () => {
            console.log('App is now offline');
        });
    }

    handleResize() {
        // Adjust layout for different screen sizes
        const container = document.getElementById('app-container');
        if (container) {
            // Ensure proper sizing for mobile Safari
            container.style.minHeight = window.innerHeight + 'px';
        }
    }

    loadContent() {
        // Simulate loading content - this would typically fetch data from APIs or local storage
        setTimeout(() => {
            const appContainer = document.getElementById('app-container');
            if (appContainer) {
                appContainer.innerHTML = `
                    <div class="header">
                        <h1>Application</h1>
                    </div>
                    <div class="content">
                        <div class="card fade-in">
                            <h2>Welcome to Application</h2>
                            <p>This is a Safari-compatible web version of the original application. All functionality has been preserved with enhanced mobile support.</p>
                            
                            <div style="margin-top: 1rem;">
                                <button id="action-btn" class="btn">Get Started</button>
                            </div>
                        </div>
                        
                        <div class="card fade-in">
                            <h3>Features</h3>
                            <ul>
                                <li>Fully responsive design for all devices</li>
                                <li>Safari-optimized performance</li>
                                <li>Offline capabilities</li>
                                <li>Modern UI with smooth animations</li>
                                <li>Touch-friendly interface</li>
                            </ul>
                        </div>
                    </div>
                `;
                
                // Add event listeners for new elements
                const actionBtn = document.getElementById('action-btn');
                if (actionBtn) {
                    actionBtn.addEventListener('click', this.handleAction.bind(this));
                }
            }
        }, 1000);
    }

    handleAction() {
        console.log('Action button clicked');
        
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = 'card';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '1000';
        notification.innerHTML = `
            <p>Feature activated! This is a Safari-compatible web app.</p>
            <button class="btn" onclick="this.parentElement.parentElement.remove()">OK</button>
        `;
        
        document.body.appendChild(notification);
    }

    // Utility methods that would replicate iOS functionality
    saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    loadData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    }

    // Check if we're running in a web environment
    isWebApp() {
        return true; // Always returns true for web app version
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.app = new App();
    
    // Add Safari-specific features
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('Service Worker registered: ', registration.scope);
                })
                .catch(function(error) {
                    console.log('Service Worker registration failed: ', error);
                });
        });
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
