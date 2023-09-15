import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';

function AuthLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className="">
      {isLoading && <Loader />}

      <div className="min-h-screen  ">
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AuthLayout;
