'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { notificationService, AppNotification, NotificationSource } from '@/lib/services/notificationService';
import { formatDate } from '@/lib/utils';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Thermometer,
  Activity,
  Milk,
  Package,
  CheckCheck,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

interface NotificationCenterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateBadge?: () => void;
}

export default function NotificationCenter({ open, onOpenChange, onUpdateBadge }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');

  useEffect(() => {
    if (open) {
      loadNotifications();
    }
  }, [open]);

  const loadNotifications = async () => {
    const list = await notificationService.getNotifications();
    setNotifications(list);
  };

  const handleMarkAsRead = async (id: string) => {
    await notificationService.markAsRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    onUpdateBadge?.();
  };

  const handleMarkAllAsRead = async () => {
    await notificationService.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    onUpdateBadge?.();
  };

  const filtered = notifications.filter((n) => {
    if (sourceFilter === 'ALL') return true;
    return n.source === sourceFilter;
  });

  const getSourceIcon = (source: NotificationSource) => {
    switch (source) {
      case 'ENVIRONMENT':
        return <Thermometer className="w-4 h-4 text-[#DC2626]" />;
      case 'HERD_HEALTH':
        return <Activity className="w-4 h-4 text-[#D97706]" />;
      case 'MILK_PRODUCTION':
        return <Milk className="w-4 h-4 text-[#14532D]" />;
      case 'INVENTORY':
        return <Package className="w-4 h-4 text-[#2563EB]" />;
      default:
        return <Info className="w-4 h-4 text-[#475569]" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-white p-0 border-[#E2E8F0] rounded-[16px] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div>
            <DialogTitle className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#14532D]" />
              Enterprise Notification Center
            </DialogTitle>
            <DialogDescription className="text-xs text-[#64748B] mt-0.5">
              Live operational telemetry, herd health, parlour batches, and system alerts.
            </DialogDescription>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllAsRead}
            className="text-xs font-semibold text-[#14532D] hover:bg-[#F0FDF4]"
          >
            <CheckCheck className="w-3.5 h-3.5 mr-1" />
            Mark all read
          </Button>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-2.5 border-b border-[#F1F5F9] flex items-center gap-1.5 overflow-x-auto bg-white">
          {['ALL', 'ENVIRONMENT', 'HERD_HEALTH', 'MILK_PRODUCTION', 'INVENTORY', 'INVESTMENT'].map((src) => (
            <button
              key={src}
              onClick={() => setSourceFilter(src)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                sourceFilter === src
                  ? 'bg-[#14532D] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {src === 'ALL' ? 'All Alerts' : src.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="max-h-[420px] overflow-y-auto divide-y divide-[#F1F5F9] p-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#64748B]">
              No alerts in this category. All systems operating within normal thresholds.
            </div>
          ) : (
            filtered.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-[12px] m-1 transition-colors flex items-start justify-between gap-3 ${
                  !notif.isRead ? 'bg-[#F0FDF4]/50 border border-[#BBF7D0]/60' : 'bg-white hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {getSourceIcon(notif.source)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#0F172A]">{notif.title}</h4>
                      <Badge
                        variant={
                          notif.severity === 'CRITICAL'
                            ? 'danger'
                            : notif.severity === 'WARNING'
                            ? 'warning'
                            : notif.severity === 'SUCCESS'
                            ? 'success'
                            : 'info'
                        }
                        className="text-[10px] py-0 px-2 h-4"
                      >
                        {notif.severity}
                      </Badge>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#14532D]" />
                      )}
                    </div>
                    <p className="text-xs text-[#475569] mt-1 leading-relaxed">{notif.message}</p>
                    <span className="text-[11px] text-[#94A3B8] font-mono mt-1.5 block">
                      {formatDate(notif.timestamp)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  {notif.actionUrl && (
                    <Link href={notif.actionUrl} onClick={() => onOpenChange(false)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2.5 text-[11px] border-[#CBD5E1] font-semibold text-[#14532D] hover:bg-[#F0FDF4]"
                      >
                        {notif.actionLabel || 'View'}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  )}
                  {!notif.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="text-[11px] text-[#64748B] hover:text-[#0F172A] font-medium"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
