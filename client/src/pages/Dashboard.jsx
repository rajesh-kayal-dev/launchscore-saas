import { Activity, Globe, AlertTriangle, TrendingUp } from "lucide-react"

const Dashboard = () => {
  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white">
          Dashboard
        </h1>
        <p className="text-zinc-400 mt-1">
          Monitor your website health and performance insights.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between">
            <h2 className="text-zinc-400 text-sm">Total Websites</h2>
            <Globe className="text-emerald-400" size={18} />
          </div>
          <p className="text-3xl font-bold text-white mt-3">12</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between">
            <h2 className="text-zinc-400 text-sm">Average Score</h2>
            <TrendingUp className="text-emerald-400" size={18} />
          </div>
          <p className="text-3xl font-bold text-white mt-3">84</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between">
            <h2 className="text-zinc-400 text-sm">Active Alerts</h2>
            <AlertTriangle className="text-emerald-400" size={18} />
          </div>
          <p className="text-3xl font-bold text-white mt-3">3</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between">
            <h2 className="text-zinc-400 text-sm">API Status</h2>
            <Activity className="text-emerald-400" size={18} />
          </div>
          <p className="text-3xl font-bold text-white mt-3">Healthy</p>
        </div>

      </div>
    </div>
  )
}

export default Dashboard