import Navbar from './components/navigation/Navbar';
import Sidebar from './components/navigation/Sidebar';
import Overview from './pages/Overview';
import Devices from './pages/Devices';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className='flex flex-col max-h-screen w-screen overflow-y-hidden'>
                {/* Navbar at the top */}
                <Navbar />
                {/* Sidebar on the left with fixed width */}
                <div className='h-full w-full flex flex-grow  transition-all duration-300 ease-in-out overflow-y-auto'>
                    <Sidebar />

                    {/* Main content area that fills the remaining space */}
                    <main className='flex-1 pt-20 overflow-y-auto'>
                        <Routes>
                            <Route path='/' element={<Overview />} />
                            <Route path='/devices' element={<Devices />} />
                            <Route path='/analytics' element={<Analytics />} />
                            <Route path='/settings' element={<Settings />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
