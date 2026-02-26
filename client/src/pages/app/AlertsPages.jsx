import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    Activity,
    Filter,
    ArrowUpRight,
    ChevronRight,
    ShieldAlert
} from "lucide-react"
import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"

// Updated alerts data remains the same as yours
const alerts = [
    { website: "mystore.com", type: "API Performance Drop", message: "API response time increased by 40% compared to last scan", date: "1 hour ago", status: "active", priority: "high" },
    { website: "mystore.com", type: "Security", message: "SSL certificate expires in 7 days", date: "2 hours ago", status: "active", priority: "high" },
    { website: "myblog.com", type: "Performance", message: "Page load time increased by 40%", date: "5 hours ago", status: "active", priority: "medium" },
    { website: "mycompany.com", type: "API Performance Drop", message: "API endpoint returning 500 errors intermittently", date: "6 hours ago", status: "acknowledged", priority: "high" },
    { website: "mycompany.com", type: "SEO", message: "Meta description missing on 5 pages", date: "1 day ago", status: "acknowledged", priority: "low" },
    { website: "mystore.com", type: "Accessibility", message: "15 images missing alt text", date: "1 day ago", status: "resolved", priority: "medium" },
    { website: "myportfolio.com", type: "Performance", message: "Large image files detected (>2MB)", date: "2 days ago", status: "resolved", priority: "low" },
    { website: "mycompany.com", type: "Security", message: "Outdated JavaScript library detected", date: "3 days ago", status: "active", priority: "high" }
]

function getAlertIcon(type) {
    if (type === "API Performance Drop") return Activity
    if (type === "Security") return ShieldAlert
    return AlertTriangle
}

function getStatusBadge(status) {
    const variants = {
        active: { color: "bg-orange-500/20 text-orange-400 border-orange-500/30", icon: AlertTriangle, label: "Active" },
        acknowledged: { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Clock, label: "Acknowledged" },
        resolved: { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", icon: CheckCircle2, label: "Resolved" }
    }
    return variants[status] || variants.active
}

function getPriorityBadge(priority) {
    const variants = {
        high: "bg-red-500/20 text-red-400 border-red-500/30",
        medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        low: "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
    return variants[priority] || variants.medium
}

const AlertsPages = () => {
    const [filter, setFilter] = useState("all");

    const filteredAlerts = filter === "all"
        ? alerts
        : alerts.filter(a => a.status === filter);

    const activeAlerts = alerts.filter(a => a.status === "active").length
    const resolvedToday = alerts.filter(a => a.status === "resolved").length

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-4xl font-black text-white italic tracking-tighter">
                        INCIDENT <span className="text-emerald-500">LOGS</span>
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">
                        Global alert feed and security vulnerability audit.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl">
                        <Filter className="w-4 h-4 mr-2" /> Filter By Property
                    </Button>
                </div>
            </div>

            {/* Tactical Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Active Alerts', value: activeAlerts, icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                    { label: 'Resolved Today', value: resolvedToday, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { label: 'Pending Review', value: alerts.filter(a => a.status === "acknowledged").length, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' }
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="p-6 bg-[#161616] border-white/5 hover:border-white/10 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-3xl font-black text-white italic">{stat.value}</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-[#111] p-1 rounded-xl border border-white/5 w-fit">
                {['all', 'active', 'acknowledged', 'resolved'].map((t) => (
                    <button
                        key={t}
                        onClick={() => setFilter(t)}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${filter === t ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Alerts List */}
            <Card className="p-6 bg-[#161616] border-white/5 rounded-3xl">
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredAlerts.map((alert, index) => {
                            const AlertIcon = getAlertIcon(alert.type)
                            const statusInfo = getStatusBadge(alert.status)
                            const StatusIcon = statusInfo.icon

                            return (
                                <motion.div
                                    key={`${alert.website}-${index}`}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="p-5 bg-[#1a1a1a] rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-all group cursor-pointer"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-500/40 transition-colors">
                                            <AlertIcon className="w-6 h-6 text-emerald-400" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-bold text-white text-lg">{alert.website}</h3>
                                                    <Badge className={`${getPriorityBadge(alert.priority)} border-none text-[9px] font-black uppercase px-2`}>
                                                        {alert.priority} PRIORITY
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Badge className={`${statusInfo.color} border-none flex items-center gap-1.5 font-bold text-[10px] uppercase px-3 py-1`}>
                                                        <StatusIcon className={`w-3 h-3 ${alert.status === 'active' ? 'animate-pulse' : ''}`} />
                                                        {statusInfo.label}
                                                    </Badge>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/5">
                                                        <MoreVertical className="w-4 h-4 text-gray-500" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <p className="text-gray-300 font-medium mb-3 leading-relaxed max-w-2xl">
                                                {alert.message}
                                            </p>

                                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[10px] font-bold text-gray-600 uppercase flex items-center gap-1.5">
                                                        <Clock className="w-3 h-3" /> {alert.date}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-gray-600 uppercase flex items-center gap-1.5">
                                                        <ShieldAlert className="w-3 h-3 text-orange-500/50" /> {alert.type}
                                                    </span>
                                                </div>
                                                <button className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    View Diagnostics <ChevronRight className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>
            </Card>
        </div>
    )
}

// Dummy icon for the dropdown menu
const MoreVertical = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
)

export default AlertsPages