import { Link, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Loader from '../../ui/Loader';

function SignupForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isLoading } = useMutation(
    (user) =>
      axios
        .post('https://pizzaria-backend-cyan.vercel.app/api/signup', user)
        .catch((error) => {
          throw error;
        }),

    {
      onSuccess: (data) => {
        toast.success('New User Created Successfully');
        const token = data.data.token;
        localStorage.setItem('token', token);
        reset();
        console.log('token set successfully');
        navigate('/menu');
      },
      onError: (error) => {
        if (error.response && error.response.status === 400) {
          toast.error('User Already Exists');
        } else {
          toast.error('Sigup  failed!');
        }
      },
    }
  );

  function onSubmit(data) {
    mutate(data);
    console.log(data);
  }

  if (isLoading) return <Loader />;
  return (
    <div className="mx-auto rounded-lg bg-gray-300 px-1 py-2 shadow-xl md:px-0 md:py-8">
      <h1 className="text-center">Signup</h1>
      <div className="px-2 py-4 md:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div>
            <label htmlFor="username" id="firstName" className="block ">
              UserName
            </label>
            <input
              {...register('username', {
                required: true,
              })}
              className="int "
              placeholder="jhon"
            />
            {errors?.username?.type === 'required' && (
              <p className="mb-1  rounded-lg bg-red-100 p-1 text-red-500">
                * This Field Is Required
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" id="email" className="block ">
              Email
            </label>
            <input
              {...register('email', {
                required: '* Email is required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              })}
              placeholder="user@mail.com"
              className="int"
            />
            {errors?.email?.message && (
              <p className="mb-1  rounded-lg bg-red-100 p-1 text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Password Field */}
          <div>
            <label htmlFor="password" id="password" className="block ">
              Password
            </label>
            <input
              {...register('password', {
                required: true,
              })}
              placeholder="Enter your Password"
              className="int"
            />
            {errors?.password?.type === 'required' && (
              <p className="mb-1  rounded-lg bg-red-100 p-1 text-red-500">
                * Password is required
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center">
            <Button type="primary" action="submit" disabled={false}>
              Signup
            </Button>
            {/* <button type='submit'>login</button> */}
          </div>
        </form>

        <div className="mt-2 text-center">
          <Link to="/signin">
            <span>Already Have An Account?</span>{' '}
            <span className="text-blue-700">Signin</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
