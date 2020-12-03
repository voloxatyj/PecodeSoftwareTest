import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Characters } from './components/pages/Characters'
import { Episodes } from './components/pages/Episodes'
import { Locations } from './components/pages/Locations'
import { MyWatchList } from './components/pages/MyWatchList'
import { Navbar } from './components/ui-layouts/Navbar'

export const App = () => {
  return (
    <div className="container">
      <Navbar />
        <Router>
          <Route exact path="/characters" component={Characters} />
          <Route exact path="/episodes" component={Episodes} />
          <Route exact path="/locations" component={Locations} />
          <Route exact path="/mywatchlist" component={MyWatchList} />
        </Router>
    </div>
  );
}

export default App;
