import React from 'react';
import { createRoot } from 'react-dom/client';
import PublicApp from './components/public/PublicApp';

const container = document.getElementById('public-app');

if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <PublicApp />
        </React.StrictMode>
    );
}
