import "./Page.css"
import Home from './home/Home';
import Navbar from '../components/navbar/Navbar';

function Page({children}) {
    return (
        <main className="page">
            <Navbar></Navbar>
            { children }
        </main>
    )
}

export default Page