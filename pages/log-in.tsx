import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

interface ILogInForm {
  email: string;
  password: string;
}

export default function LogIn() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { register, handleSubmit } = useForm<ILogInForm>({ mode: "onChange" });

  const onValid = (data: ILogInForm) => {
    fetch("/api/users/log-in", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        json.ok && setIsLoggedIn((status) => true);
      });
  };
  const onInvaild = (errors: any) => {
    console.error(errors);
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <div
      onSubmit={handleSubmit(onValid, onInvaild)}
      className="flex justify-center flex-col items-center"
    >
      <h1 className="m-5 text-2xl font-bold">Log In</h1>
      <form className="flex flex-col items-center w-96 p-5">
        <div className="">
          <input
            {...register("email", { required: "namename" })}
            className="mb-5 border-b-2 w-72"
            type="text"
            name="email"
            placeholder="Email"
          />
        </div>

        <input
          {...register("password", { required: "pwpwpw" })}
          className="mb-5 border-b-2 w-72"
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          className="p-2 mt-5 rounded-2xl bg-blue-600 w-40 text-center text-white"
          type="submit"
          value="Log In"
        />
      </form>
      <Link href={`/create-account`}>
        <a className="p-2 rounded-2xl bg-gray-200 w-40 text-center text-gray-400">
          Create Account
        </a>
      </Link>
    </div>
  );
}
