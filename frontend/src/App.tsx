import { useState, useEffect } from 'react';
import Navbar from './components/navigation/Navbar';
import Sidebar from './components/navigation/Sidebar';
import Overview from './pages/Overview';
import Devices from './pages/Devices';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <Router>
            <div className='flex flex-col max-h-screen w-screen overflow-y-hidden'>
                {/* Navbar controls sidebar toggle */}
                <Navbar theme={theme} setTheme={setTheme} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                <div className='flex overflow-y-auto'>
                    {/* Sidebar with toggle functionality */}
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                    {/* Main Content */}
                    <main className='flex-1 pt-16 p-4 transition-all duration-300 overflow-y-auto'>
                        <Routes>
                            <Route path='/' element={<Overview />} />
                            <Route path='/devices' element={<Devices />} />
                            <Route path='/analytics' element={<Analytics />} />
                            <Route path='/settings' element={<Settings theme={theme} setTheme={setTheme} />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
