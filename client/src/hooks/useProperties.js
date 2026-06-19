// src/hooks/useProperties.js
// TanStack Query hooks — clean data fetching with caching

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertiesApi, agentsApi, inquiriesApi } from '../services/api';
import toast from 'react-hot-toast';

// Query key factory — keeps keys consistent and co-located
export const queryKeys = {
  properties:       ['properties'],
  property:         (id) => ['properties', id],
  featured:         ['properties', 'featured'],
  popularLocations: ['popularLocations'],
  stats:            ['stats'],
  agents:           ['agents'],
  agent:            (id) => ['agents', id],
};

// ── All properties with filter/sort params ──────────────
export const useProperties = (params) =>
  useQuery({
    queryKey: [...queryKeys.properties, params],
    queryFn:  () => propertiesApi.getAll(params),
    select:   (data) => data.data,
  });

// ── Single property ─────────────────────────────────────
export const useProperty = (id) =>
  useQuery({
    queryKey: queryKeys.property(id),
    queryFn:  () => propertiesApi.getById(id),
    select:   (data) => data.data,
    enabled:  !!id,
  });

// ── Featured properties ─────────────────────────────────
export const useFeaturedProperties = () =>
  useQuery({
    queryKey: queryKeys.featured,
    queryFn:  propertiesApi.getFeatured,
    select:   (data) => data.data,
  });

// ── Popular locations ───────────────────────────────────
export const usePopularLocations = () =>
  useQuery({
    queryKey: queryKeys.popularLocations,
    queryFn:  propertiesApi.getPopularLocations,
    select:   (data) => data.data,
  });

// ── Stats ───────────────────────────────────────────────
export const useStats = () =>
  useQuery({
    queryKey: queryKeys.stats,
    queryFn:  propertiesApi.getStats,
    select:   (data) => data.data,
  });

// ── All agents ──────────────────────────────────────────
export const useAgents = () =>
  useQuery({
    queryKey: queryKeys.agents,
    queryFn:  agentsApi.getAll,
    select:   (data) => data.data,
  });

// ── Single agent ────────────────────────────────────────
export const useAgent = (id) =>
  useQuery({
    queryKey: queryKeys.agent(id),
    queryFn:  () => agentsApi.getById(id),
    select:   (data) => data.data,
    enabled:  !!id,
  });

// ── Submit inquiry mutation ─────────────────────────────
export const useSubmitInquiry = () => {
  return useMutation({
    mutationFn: inquiriesApi.submit,
    onSuccess: (data) => {
      toast.success(data.message || 'Inquiry sent! An agent will contact you shortly.');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to send inquiry. Please try again.');
    },
  });
};
