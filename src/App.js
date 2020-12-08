import './App.css';
import { useUserData } from './context/DataContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Characters } from './components/pages/Characters'
import { Episodes } from './components/pages/Episodes'
import { Locations } from './components/pages/Locations'
import { MyWatchList } from './components/pages/MyWatchList'
import { Navbar } from './components/ui-layouts/Navbar'
import { Item } from './components/ui-layouts/Item'


export const App = () => {
  const [{ view, item }, dispatch] = useUserData()
  
  return (
    <Router>
      <div className="container">
        <Navbar />
          {view && <Item item={item} />}
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + "/characters"} component={Characters} />
            <Route exact path={process.env.PUBLIC_URL + "/episodes"} component={Episodes} />
            <Route exact path={process.env.PUBLIC_URL + "/locations"} component={Locations} />
            <Route exact path={process.env.PUBLIC_URL + "/mywatchlist"} component={MyWatchList} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
