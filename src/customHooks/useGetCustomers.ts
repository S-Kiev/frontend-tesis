import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getCustomersHook } from 'api/customers';
import { parseCustomers } from 'util/parseCustomers';

export const useGetCustomers = (): { data: any; error: any; isLoading: any } => {
  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.CustomersHook],
    queryFn: () => getCustomersHook(),
  });

  return { data: data?.data?.data ? parseCustomers(data?.data?.data) : [], error, isLoading };
};
