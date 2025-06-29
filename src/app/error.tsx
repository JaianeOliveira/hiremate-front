"use client";

export default function ErrorPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-lg text-gray-600">
          We are experiencing technical difficulties. Please try again later.
        </p>
      </div>
    </div>
  );
}
