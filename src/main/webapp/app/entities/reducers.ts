import book from 'app/entities/khBook/book/book.reducer';
import bookCatalog from 'app/entities/khBookCatalog/book-catalog/book-catalog.reducer';
import rental from 'app/entities/rental/rental/rental.reducer';
import rentedItem from 'app/entities/rental/rented-item/rented-item.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  book,
  bookCatalog,
  rental,
  rentedItem,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
