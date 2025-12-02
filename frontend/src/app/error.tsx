"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Global error boundary:", error);
    }
    // TODO: send to external logging service here if desired
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center gap-4">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl font-black">
        !
      </div>
      <h1 className="text-2xl font-bold text-gray-800">مشکلی پیش آمده است</h1>
      <p className="text-gray-500 max-w-md">
        در پردازش درخواست شما خطایی رخ داد. لطفاً دوباره تلاش کنید یا بعداً برگردید.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl bg-vita-600 text-white font-semibold hover:bg-vita-700 transition"
        >
          تلاش مجدد
        </button>
        <a
          href="/"
          className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
        >
          بازگشت به خانه
        </a>
      </div>
      {process.env.NODE_ENV === "development" && error?.message && (
        <pre className="mt-4 text-xs bg-white border border-gray-200 rounded-lg p-3 max-w-2xl text-left overflow-auto">
          {error.message}
          {error.digest ? `\nDigest: ${error.digest}` : ""}
        </pre>
      )}
    </div>
  );
}
