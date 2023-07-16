import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import RentedItem from './rented-item';
import RentedItemDetail from './rented-item-detail';
import RentedItemUpdate from './rented-item-update';
import RentedItemDeleteDialog from './rented-item-delete-dialog';

const RentedItemRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<RentedItem />} />
    <Route path="new" element={<RentedItemUpdate />} />
    <Route path=":id">
      <Route index element={<RentedItemDetail />} />
      <Route path="edit" element={<RentedItemUpdate />} />
      <Route path="delete" element={<RentedItemDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default RentedItemRoutes;
