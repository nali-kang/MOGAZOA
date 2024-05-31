import CategoryService from './Category.service';

const queryKeys = {
  getCategories: () => ['getCategories'] as const,
};

const queryOptions = {
  getCategories: () => ({
    queryKey: queryKeys.getCategories(),
    queryFn: () => CategoryService.getCategories(),
  }),
};

export default queryOptions;
