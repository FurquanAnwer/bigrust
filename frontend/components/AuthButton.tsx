"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

type AuthButtonProps = {
  isLandingPage: boolean;
};

export function AuthButton({ isLandingPage }: AuthButtonProps) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const buttonClassName = isLandingPage
    ? "rounded-lg border border-teal-200/30 bg-teal-300 px-4 py-2 text-sm font-bold text-black transition hover:bg-teal-200 disabled:cursor-wait disabled:opacity-70"
    : "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-teal-300 hover:text-teal-700 disabled:cursor-wait disabled:opacity-70";

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <div
          className={`hidden items-center gap-2 sm:flex ${
            isLandingPage ? "text-neutral-200" : "text-slate-700"
          }`}
        >
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
          ) : null}
          <span className="max-w-[10rem] truncate text-sm font-semibold">
            {session.user.name ?? session.user.email}
          </span>
        </div>
        <button
          type="button"
          className={buttonClassName}
          disabled={isLoading}
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={buttonClassName}
      disabled={isLoading}
      onClick={() => signIn("google")}
    >
      Sign in
    </button>
  );
}
