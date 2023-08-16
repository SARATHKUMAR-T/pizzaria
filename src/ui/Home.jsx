import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
import pizza from '../Assets/dark3.jpg';

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div
      className=" h-screen max-w-full   bg-cover bg-bottom px-4 text-center text-slate-100  "
      style={{ backgroundImage: `url(${pizza})` }}
    >
      <div className="pt-36">
        <h1 className="py-8  text-xl font-semibold md:text-3xl">
          Crafting Pizza Perfection
          <br />
          <span className="text-yellow-500">
            Straight out of the oven, straight to you.
          </span>
        </h1>

        {username === '' ? (
          <CreateUser />
        ) : (
          <Button to="/menu" type="primary">
            Continue ordering, {username}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Home;
