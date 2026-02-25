import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, CreditCard } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';

const SettingsPage = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 text-white text-white">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block font-medium text-white">Full Name</label>
              <Input
                defaultValue="John Doe"
                className="bg-[#0f0f0f] border-white/10 text-white focus-visible:ring-emerald-500/20"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block font-medium text-white">Email</label>
              <Input
                type="email"
                defaultValue="john@example.com"
                className="bg-[#0f0f0f] border-white/10 text-white focus-visible:ring-emerald-500/20"
              />
            </div>
            <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl px-6">
              Save Changes
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <div className="flex items-center gap-3 mb-6 text-white">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-semibold">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-xl border border-white/5">
              <div>
                <p className="font-medium text-white text-white">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive scan results via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-xl border border-white/5">
              <div>
                <p className="font-medium text-white text-white">Alert Notifications</p>
                <p className="text-sm text-gray-400">Get notified about critical issues</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-xl border border-white/5">
              <div>
                <p className="font-medium text-white text-white">Weekly Summary</p>
                <p className="text-sm text-gray-400">Receive weekly performance reports</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <div className="flex items-center gap-3 mb-6 text-white">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-semibold">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#0f0f0f] rounded-xl border border-white/5">
              <p className="font-medium text-white mb-2 text-white">Two-Factor Authentication</p>
              <p className="text-sm text-gray-400 mb-4">Add an extra layer of security to your account</p>
              <Button
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 rounded-xl"
              >
                Enable 2FA
              </Button>
            </div>
            <div className="p-4 bg-[#0f0f0f] rounded-xl border border-white/5">
              <p className="font-medium text-white mb-2 text-white">Change Password</p>
              <p className="text-sm text-gray-400 mb-4">Update your password regularly for better security</p>
              <Button
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5 rounded-xl"
              >
                Update Password
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Billing Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <div className="flex items-center gap-3 mb-6 text-white">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-semibold">Billing & Plan</h2>
          </div>

          <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold mb-1 text-white">Free Plan</p>
                <p className="text-sm text-gray-400">Up to 5 websites • Basic features</p>
              </div>
              <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl whitespace-nowrap">
                Upgrade to Pro
              </Button>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-400">
            <p className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span> 4/5 websites used
            </p>
            <p className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span> 12 scans this month
            </p>
            <p className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span> All basic features included
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default SettingsPage;