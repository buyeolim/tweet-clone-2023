import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ICreateAccountForm {
  username: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { register, handleSubmit } = useForm<ICreateAccountForm>({
    mode: "onChange",
  });

  const onValid = (data: ICreateAccountForm) => {
    console.log("i'm valid ");
    fetch("/api/users/create-account", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
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
      <h1 className="m-5 text-2xl font-bold">Create Account</h1>
      <form className="flex flex-col items-center w-96  p-5">
        <div>
          <input
            {...register("username", { required: "namename" })}
            className="mb-5 border-b-2 w-72"
            type="text"
            name="username"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            {...register("email", { required: "mailmail" })}
            className="mb-5 border-b-2 w-72"
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            {...register("password", { required: "pwpwpw" })}
            className="mb-5 border-b-2 w-72"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <input
          className="p-2 mt-5 rounded-2xl bg-blue-600 w-40 text-center text-white"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}
