import { Switch, Route } from 'react-router-dom';
import Layout from './components/GlobalLayout/Layout';
import Cafes from './containers/Cafes';
import Login from './containers/Authentication/Login';
import Register from './containers/Authentication/Register';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import AddCafe from './containers/AddCafe';
import CafeDetails from './containers/CafeDetails';

const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
  return isAllowed ? <Route {...props}/> : <Redirect to={redirectTo}/>;
};

const App = () => {
  const user = useSelector(state => state.userLogin.userInfo);

  return (
    <>
      <Layout>
        <Switch>
          <Route path={'/'} exact component={Cafes}/>
          <Route path={'/login'} component={Login}/>
          <ProtectedRoute
            path={'/register'}
            component={Register}
            isAllowed={!user}
            redirectTo={'/'}
          />
          <ProtectedRoute
            path={'/cafe/:id'}
            component={CafeDetails}
            isAllowed={user}
            redirectTo={'/login'}
          />
          <ProtectedRoute
            path={'/add-cafe'}
            component={AddCafe}
            isAllowed={user}
            redirectTo={'/login'}
          />
        </Switch>
      </Layout>
    </>
  );
};

export default App;
