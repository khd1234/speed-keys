import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome to Speed Keys!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Your typing speed test application is ready. The core typing
            mechanics will be implemented in Epic 2.
          </p>
        </div>
      </div>
    </Layout>
  );
}
