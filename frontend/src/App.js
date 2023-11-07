import React from "react"
import { BrowserRouter as Router, Route} from "react-router-dom"

import Home from "./components/Home"
import About from "./components/About"
import Crud from "./components/Crud"



function App() {
    return (
        <Router>
            <div>
                <Route path='/' exact component={Home} />
                <Route path='/about' component={About} />
                <Route path='/crud' component={Crud} />
            </div>
        </Router>
    )
}

export default App