'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bell } from 'lucide-react'

type Notification = {
  id: string
  title: string
  message: string
  read: boolean
  createdAt: string
}

export default function NotificationsBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch('/api/notifications')
      .then((res) => res.json())
      .then((data) => setNotifications(data.notifications || []))
      .catch(() => {})
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleOpen = async () => {
    setOpen(!open)
    if (!open && unreadCount > 0) {
      await fetch('/api/notifications', { method: 'PATCH' })
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="relative text-white/85 hover:text-white p-1.5"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-brand-coral text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] bg-white rounded-2xl shadow-xl border border-gray-100 z-50 max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-100 font-semibold text-brand-slate text-sm">
              Notifications
            </div>
            {notifications.length === 0 ? (
              <p className="p-4 text-sm text-gray-400">No notifications yet.</p>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className="p-4 border-b border-gray-50 last:border-0">
                  <div className="text-sm font-medium text-brand-slate">{n.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{n.message}</div>
                  <div className="text-[11px] text-gray-350 mt-1">
                    {new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}