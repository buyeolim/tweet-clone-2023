import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "@libs/server/db";
import Detail from "./tweet/[id]";

interface ItweetForm {
  id: number;
  text: string;
  createdAt: string;
  userId: number;
}

export default () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [tweets, setTweets] = useState<ItweetForm[]>([]);
  const [text, setText] = useState<string>("");

  const logout = async () => {
    try {
      const response = await fetch("/api/users/log-out", {
        method: "GET",
      });

      if (response.ok) {
        setIsLoggedIn(false);
        router.push("/log-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tweet = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("작성하기");
    console.log(userId);
    if (!text.trim().length) return;
    console.log(text);
    fetch("/api/tweets/create", {
      method: "POST",
      body: JSON.stringify({ userId, text }),
      headers: {
        "Content-type": "application/json",
      },
    });
    router.push("/");
  };
  const tweetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users/me", {
          method: "GET",
        });

        if (response.ok) {
          const json = await response.json();
          const {
            profile: { id },
          } = json;
          setUserId(id);
          setIsLoggedIn(true);

          fetch("/api/tweets/get-all", {
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) => {
              setTweets(data.tweets);
            });
        } else {
          console.log("로그인하세요");
          router.push("/log-in");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div>
      <div className="flex justify-between items-center pr-5">
        <h1 className="m-5 text-2xl font-bold">Create Account</h1>
        <input
          className="p-2 rounded-2xl bg-gray-200 w-32 h-10 text-center text-gray-400"
          onClick={logout}
          type="submit"
          value="Log Out"
        />
      </div>
      <form
        className="border-b-2 px-5 py-3 flex justify-between"
        onSubmit={tweet}
      >
        <input
          className="w-96"
          onChange={tweetChange}
          type="text"
          placeholder="What's Happening?"
          value={text}
        />
        <input
          className="p-2 rounded-2xl bg-blue-600 w-32 h-10 text-center text-white"
          type="submit"
          value="tweet"
        />
      </form>

      <div>
        {tweets.map((tweet, idx) => (
          <Detail key={idx} data={tweet} />
        ))}
      </div>
    </div>
  );
};
