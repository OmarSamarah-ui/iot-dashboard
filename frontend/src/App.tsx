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
            <div className={`flex flex-col max-h-screen w-screen overflow-y-hidden`}>
                {/* ✅ Pass theme & setTheme to Navbar */}
                <Navbar theme={theme} setTheme={setTheme} />
                <div className='h-full w-full flex flex-grow transition-all duration-300 ease-in-out overflow-y-auto'>
                    <Sidebar />
                    <main className='flex-1 pt-20 overflow-y-auto'>
                        <Routes>
                            <Route path='/' element={<Overview />} />
                            <Route path='/devices' element={<Devices />} />
                            <Route path='/analytics' element={<Analytics />} />
                            {/* ✅ Pass theme & setTheme to Settings */}
                            <Route path='/settings' element={<Settings theme={theme} setTheme={setTheme} />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
