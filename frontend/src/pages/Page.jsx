import "./Page.css"
import Home from './home/Home';
import Navbar from '../components/navbar/Navbar';

function Page() {
    return (
        <main className="page">
            <Navbar></Navbar>
            <Home></Home>
        </main>
    )
}

export default Page