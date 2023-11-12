import { useRouter } from "next/router";
import { useState } from "react";

export default function Detail(tweet: any) {
  const router = useRouter();
  const [userId, setUserId] = useState(tweet?.data?.userId);
  const [text, setText] = useState(tweet?.data?.text);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [tweetId, setTweetId] = useState(tweet?.data?.id);
  const [loggedId, setLoggedId] = useState(0);
  const [isLike, setIsLike] = useState(false);

  if (Object.values(tweet).length === 0) {
    const { id } = router.query;

    fetch(`/api/tweets/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setText(json.tweet?.text);
        setUserId(json.tweet?.userId);
      });

    fetch(`/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) {
          const { user } = json;
          setUsername(user.username);
          setEmail(user.email);
          setTweetId(id === undefined ? 0 : +id);
        }
      });
  } else {
    fetch(`/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) {
          const { user } = json;
          setUsername(user.username);
          setEmail(user.email);
        }
      });
  }

  fetch("/api/users/me")
    .then((response) => response.json())
    .then((json) => {
      setLoggedId(json.profile.id);
    });

  fetch(`/api/likes?tweetId=${tweetId}&userId=${loggedId}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.ok) {
        const likes = json.like;
        likes.length && setIsLike(true);
      }
    });

  const like = async () => {
    console.log(tweetId, loggedId);
    fetch("/api/likes/create", {
      method: "POST",
      body: JSON.stringify({ tweetId, userId: loggedId }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {});
  };

  return (
    <div className="flex border-b-2">
      <div className="flex px-5 py-3">
        <div className="rounded-full bg-blue-600 w-12 h-12 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-7 h-7 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
      </div>
      <div className="py-3 pr-5 h-32 flex flex-col justify-between">
        <div>
          <div className="flex items-center">
            <h6 className="font-bold text-lg mr-2">{username}</h6>
            <div className="text-gray-600">@{email.split("@")[0]}</div>
          </div>
          <p className="text-lg">{text}</p>
        </div>
        <div>
          <div className="flex">
            {isLike ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ) : (
              <svg
                onClick={like}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
