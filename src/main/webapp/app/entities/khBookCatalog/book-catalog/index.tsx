import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BookCatalog from './book-catalog';
import BookCatalogDetail from './book-catalog-detail';
import BookCatalogUpdate from './book-catalog-update';
import BookCatalogDeleteDialog from './book-catalog-delete-dialog';

const BookCatalogRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BookCatalog />} />
    <Route path="new" element={<BookCatalogUpdate />} />
    <Route path=":id">
      <Route index element={<BookCatalogDetail />} />
      <Route path="edit" element={<BookCatalogUpdate />} />
      <Route path="delete" element={<BookCatalogDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BookCatalogRoutes;
