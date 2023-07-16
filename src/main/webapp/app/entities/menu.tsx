import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/book">
        <Translate contentKey="global.menu.entities.khBookBook" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/book-catalog">
        <Translate contentKey="global.menu.entities.khBookCatalogBookCatalog" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/rental">
        <Translate contentKey="global.menu.entities.rentalRental" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
