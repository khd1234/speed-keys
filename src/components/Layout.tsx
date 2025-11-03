import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Speed Keys
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Test your typing speed and accuracy
          </p>
        </header>
        <main className="mx-auto max-w-4xl">{children}</main>
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 Speed Keys. Built with Next.js and Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
}
