/**
 * CiviAgora Platform - Moderation Hooks
 * 
 * Custom React Query hooks for moderation API calls.
 * These hooks provide caching, automatic refetching, and optimistic updates.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import type {
  ModerationItemDTO,
  ModerationStatsDTO,
  ModerationRuleDTO,
  UserReportDTO,
  ModerationFilterDTO,
  PerformModerationActionDTO,
  BulkModerationActionDTO,
} from '../types';

// ==================== Query Keys ====================

export const moderationKeys = {
  all: ['moderation'] as const,
  stats: () => [...moderationKeys.all, 'stats'] as const,
  items: () => [...moderationKeys.all, 'items'] as const,
  itemsFiltered: (filters?: ModerationFilterDTO) => [...moderationKeys.items(), filters] as const,
  item: (id: string) => [...moderationKeys.items(), id] as const,
  rules: () => [...moderationKeys.all, 'rules'] as const,
  rule: (id: string) => [...moderationKeys.rules(), id] as const,
  reports: () => [...moderationKeys.all, 'reports'] as const,
  reportsFiltered: (filters?: { status?: string[] }) => [...moderationKeys.reports(), filters] as const,
  report: (id: string) => [...moderationKeys.reports(), id] as const,
  dashboard: () => [...moderationKeys.all, 'dashboard'] as const,
};

// ==================== Stats Hooks ====================

/**
 * Get moderation statistics
 */
export function useModerationStats() {
  return useQuery({
    queryKey: moderationKeys.stats(),
    queryFn: async () => {
      const response = await apiService.moderation.getStats();
      return response.data;
    },
    staleTime: 30000, // 30 seconds
  });
}

// ==================== Items Hooks ====================

/**
 * Get moderation queue items with optional filters
 */
export function useModerationItems(filters?: ModerationFilterDTO) {
  return useQuery({
    queryKey: moderationKeys.itemsFiltered(filters),
    queryFn: async () => {
      const response = await apiService.moderation.getItems(filters);
      return response.data;
    },
    staleTime: 10000, // 10 seconds
  });
}

/**
 * Get single moderation item by ID
 */
export function useModerationItem(id: string) {
  return useQuery({
    queryKey: moderationKeys.item(id),
    queryFn: async () => {
      const response = await apiService.moderation.getItemById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Perform moderation action
 */
export function usePerformModerationAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PerformModerationActionDTO) => {
      const response = await apiService.moderation.performAction(data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: moderationKeys.items() });
      queryClient.invalidateQueries({ queryKey: moderationKeys.item(variables.itemId) });
      queryClient.invalidateQueries({ queryKey: moderationKeys.stats() });
      queryClient.invalidateQueries({ queryKey: moderationKeys.dashboard() });
    },
  });
}

/**
 * Perform bulk moderation action
 */
export function useBulkModerationAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BulkModerationActionDTO) => {
      const response = await apiService.moderation.performBulkAction(data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate all moderation-related queries
      queryClient.invalidateQueries({ queryKey: moderationKeys.items() });
      queryClient.invalidateQueries({ queryKey: moderationKeys.stats() });
      queryClient.invalidateQueries({ queryKey: moderationKeys.dashboard() });
    },
  });
}

// ==================== Rules Hooks ====================

/**
 * Get all moderation rules
 */
export function useModerationRules() {
  return useQuery({
    queryKey: moderationKeys.rules(),
    queryFn: async () => {
      const response = await apiService.moderation.getRules();
      return response.data;
    },
    staleTime: 60000, // 1 minute
  });
}

/**
 * Get single moderation rule by ID
 */
export function useModerationRule(id: string) {
  return useQuery({
    queryKey: moderationKeys.rule(id),
    queryFn: async () => {
      const response = await apiService.moderation.getRuleById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Save moderation rule (create or update)
 */
export function useSaveModerationRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rule: Partial<ModerationRuleDTO>) => {
      const response = await apiService.moderation.saveRule(rule);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: moderationKeys.rules() });
      queryClient.invalidateQueries({ queryKey: moderationKeys.rule(data.id) });
    },
  });
}

/**
 * Delete moderation rule
 */
export function useDeleteModerationRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiService.moderation.deleteRule(id);
      return response.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: moderationKeys.rules() });
      queryClient.removeQueries({ queryKey: moderationKeys.rule(id) });
    },
  });
}

// ==================== Reports Hooks ====================

/**
 * Get user reports with optional filters
 */
export function useUserReports(filters?: { status?: string[] }) {
  return useQuery({
    queryKey: moderationKeys.reportsFiltered(filters),
    queryFn: async () => {
      const response = await apiService.moderation.getReports(filters);
      return response.data;
    },
    staleTime: 10000, // 10 seconds
  });
}

/**
 * Get single user report by ID
 */
export function useUserReport(id: string) {
  return useQuery({
    queryKey: moderationKeys.report(id),
    queryFn: async () => {
      const response = await apiService.moderation.getReportById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Resolve user report
 */
export function useResolveUserReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, resolution }: {
      id: string;
      resolution: { action: string; comment: string };
    }) => {
      const response = await apiService.moderation.resolveReport(id, resolution);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: moderationKeys.reports() });
      queryClient.invalidateQueries({ queryKey: moderationKeys.report(data.id) });
      queryClient.invalidateQueries({ queryKey: moderationKeys.dashboard() });
    },
  });
}

// ==================== Dashboard Hooks ====================

/**
 * Get moderation dashboard data
 */
export function useModerationDashboard() {
  return useQuery({
    queryKey: moderationKeys.dashboard(),
    queryFn: async () => {
      const response = await apiService.moderation.getDashboard();
      return response.data;
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
}
