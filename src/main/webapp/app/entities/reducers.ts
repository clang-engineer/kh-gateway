import book from 'app/entities/khBook/book/book.reducer';
import bookCatalog from 'app/entities/khBookCatalog/book-catalog/book-catalog.reducer';
import rental from 'app/entities/rental/rental/rental.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  book,
  bookCatalog,
  rental,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
