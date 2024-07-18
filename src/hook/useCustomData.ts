// src/hooks/useCustomData.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Define the type for your data
// export interface CustomData {
//     id: number;
//     title: string;
//     // Add other properties as needed
// }

type CustomData = any;

// GET hook
export const useGetData = (url: string, id?: number) => {
    return useQuery<CustomData | CustomData[], Error>({
        queryKey: [url, id],
        queryFn: async () => {
            const response = await axios.get<CustomData | CustomData[]>(id ? `${url}/${id}` : url);
            return response.data;
        },
    });
};

// POST hook
export const usePostData = (url: string) => {
    const queryClient = useQueryClient();

    return useMutation<CustomData, Error, Omit<CustomData, 'id'>>({
        mutationFn: async (newData) => {
            const response = await axios.post<CustomData>(url, newData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [url] });
        },
    });
};

// PUT hook
export const usePutData = (url: string) => {
    const queryClient = useQueryClient();

    return useMutation<CustomData, Error, CustomData>({
        mutationFn: async (updatedData) => {
            const response = await axios.put<CustomData>(`${url}/${updatedData.id}`, updatedData);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [url, data.id] });
        },
    });
};

// DELETE hook
export const useDeleteData = (url: string) => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: async (id) => {
            await axios.delete(`${url}/${id}`);
        },
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: [url] });
            queryClient.removeQueries({ queryKey: [url, id] });
        },
    });
};