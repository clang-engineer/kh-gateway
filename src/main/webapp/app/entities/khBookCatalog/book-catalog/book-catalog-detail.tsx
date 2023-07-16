import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './book-catalog.reducer';

export const BookCatalogDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const bookCatalogEntity = useAppSelector(state => state.khgateway.bookCatalog.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bookCatalogDetailsHeading">
          <Translate contentKey="khGatewayApp.khBookCatalogBookCatalog.detail.title">BookCatalog</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bookCatalogEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="khGatewayApp.khBookCatalogBookCatalog.title">Title</Translate>
            </span>
          </dt>
          <dd>{bookCatalogEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="khGatewayApp.khBookCatalogBookCatalog.description">Description</Translate>
            </span>
          </dt>
          <dd>{bookCatalogEntity.description}</dd>
          <dt>
            <span id="author">
              <Translate contentKey="khGatewayApp.khBookCatalogBookCatalog.author">Author</Translate>
            </span>
          </dt>
          <dd>{bookCatalogEntity.author}</dd>
          <dt>
            <span id="bookId">
              <Translate contentKey="khGatewayApp.khBookCatalogBookCatalog.bookId">Book Id</Translate>
            </span>
          </dt>
          <dd>{bookCatalogEntity.bookId}</dd>
          <dt>
            <span id="rentCnt">
              <Translate contentKey="khGatewayApp.khBookCatalogBookCatalog.rentCnt">Rent Cnt</Translate>
            </span>
          </dt>
          <dd>{bookCatalogEntity.rentCnt}</dd>
        </dl>
        <Button tag={Link} to="/book-catalog" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/book-catalog/${bookCatalogEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BookCatalogDetail;
