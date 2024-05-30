/* eslint-disable class-methods-use-this */

import { apiRequestor } from '../requestor';

class CategoryService {
  getCategories() {
    return apiRequestor.get(`/categories`);
  }
}

export default new CategoryService();
