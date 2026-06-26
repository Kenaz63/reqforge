import DashboardHeader from "../components/DashboardHeader";
import NewRequestCard from "../components/NewRequestCard";
import CollectionCard from "../components/CollectionCard";

function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-900 text-white px-10 py-8">

      <DashboardHeader />

      <NewRequestCard />

      <section className="mt-10">

        <h2 className="text-2xl font-semibold mb-5">
          Recent Collections
        </h2>

        <div className="space-y-4">

          <CollectionCard
            emoji="🔐"
            title="Authentication APIs"
          />

          <CollectionCard
            emoji="🌤"
            title="Weather APIs"
          />

          <CollectionCard
            emoji="🧪"
            title="Testing Collection"
          />

        </div>

      </section>

    </main>
  );
}

export default Dashboard;