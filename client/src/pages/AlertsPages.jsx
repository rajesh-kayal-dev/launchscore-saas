import React from "react"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle2, Clock, Activity } from "lucide-react"
import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

const alerts = [
    {
        website: "mystore.com",
        type: "API Performance Drop",
        message: "API response time increased by 40% compared to last scan",
        date: "1 hour ago",
        status: "active",
        priority: "high"
    },
    {
        website: "mystore.com",
        type: "Security",
        message: "SSL certificate expires in 7 days",
        date: "2 hours ago",
        status: "active",
        priority: "high"
    },
    {
        website: "myblog.com",
        type: "Performance",
        message: "Page load time increased by 40%",
        date: "5 hours ago",
        status: "active",
        priority: "medium"
    },
    {
        website: "mycompany.com",
        type: "API Performance Drop",
        message: "API endpoint returning 500 errors intermittently",
        date: "6 hours ago",
        status: "acknowledged",
        priority: "high"
    },
    {
        website: "mycompany.com",
        type: "SEO",
        message: "Meta description missing on 5 pages",
        date: "1 day ago",
        status: "acknowledged",
        priority: "low"
    },
    {
        website: "mystore.com",
        type: "Accessibility",
        message: "15 images missing alt text",
        date: "1 day ago",
        status: "resolved",
        priority: "medium"
    },
    {
        website: "myportfolio.com",
        type: "Performance",
        message: "Large image files detected (>2MB)",
        date: "2 days ago",
        status: "resolved",
        priority: "low"
    },
    {
        website: "mycompany.com",
        type: "Security",
        message: "Outdated JavaScript library detected",
        date: "3 days ago",
        status: "active",
        priority: "high"
    }
]

function getAlertIcon(type) {
    if (type === "API Performance Drop") return Activity
    return AlertTriangle
}

function getStatusBadge(status) {
    const variants = {
        active: {
            color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
            icon: AlertTriangle,
            label: "Active"
        },
        acknowledged: {
            color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
            icon: Clock,
            label: "Acknowledged"
        },
        resolved: {
            color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
            icon: CheckCircle2,
            label: "Resolved"
        }
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
    const activeAlerts = alerts.filter(a => a.status === "active").length
    const resolvedToday = alerts.filter(
        a => a.status === "resolved" && a.date.includes("hours ago")
    ).length
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold mb-2 text-white">Alerts</h1>
                <p className="text-gray-400">
                    Monitor and manage website health notifications
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Active Alerts</p>
                                <p className="text-3xl font-bold text-white">{activeAlerts}</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Resolved Today</p>
                                <p className="text-3xl font-bold text-white">{resolvedToday}</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Pending Review</p>
                                <p className="text-3xl font-bold text-white">
                                    {alerts.filter(a => a.status === "acknowledged").length}
                                </p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Alerts List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
                    <h2 className="text-2xl font-semibold mb-6 text-white">All Alerts</h2>

                    <div className="space-y-4">
                        {alerts.map((alert, index) => {
                            const AlertIcon = getAlertIcon(alert.type)
                            const statusInfo = getStatusBadge(alert.status)
                            const StatusIcon = statusInfo.icon

                            return (
                                <motion.div
                                    key={`${alert.website}-${index}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                                    className="p-5 bg-[#141414] rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center flex-shrink-0">
                                            <AlertIcon className="w-5 h-5 text-emerald-400" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-semibold text-white">{alert.website}</h3>
                                                        <Badge
                                                            className={`${getPriorityBadge(
                                                                alert.priority
                                                            )} border text-xs`}
                                                        >
                                                            {alert.priority}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-400">{alert.type}</p>
                                                </div>

                                                <Badge
                                                    className={`${statusInfo.color} border flex items-center gap-1 flex-shrink-0`}
                                                >
                                                    <StatusIcon className="w-3 h-3" />
                                                    {statusInfo.label}
                                                </Badge>
                                            </div>

                                            <p className="text-gray-300 mb-2">{alert.message}</p>
                                            <p className="text-sm text-gray-500">{alert.date}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}

export default AlertsPages
