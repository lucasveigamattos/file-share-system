import {BrowserRouter, Routes, Route} from "react-router-dom"

import App from "../pages/App"
import Pdfs from "../pages/Pdf"
import Images from "../pages/Images"
import Videos from "../pages/Videos"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/pdfs" element={<Pdfs/>}/>
                <Route path="/images" element={<Images/>}/>
                <Route path="/videos" element={<Videos/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes