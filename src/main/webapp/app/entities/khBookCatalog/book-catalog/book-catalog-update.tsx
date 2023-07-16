import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBookCatalog } from 'app/shared/model/khBookCatalog/book-catalog.model';
import { getEntity, updateEntity, createEntity, reset } from './book-catalog.reducer';

export const BookCatalogUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const bookCatalogEntity = useAppSelector(state => state.khgateway.bookCatalog.entity);
  const loading = useAppSelector(state => state.khgateway.bookCatalog.loading);
  const updating = useAppSelector(state => state.khgateway.bookCatalog.updating);
  const updateSuccess = useAppSelector(state => state.khgateway.bookCatalog.updateSuccess);

  const handleClose = () => {
    navigate('/book-catalog' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...bookCatalogEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...bookCatalogEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="khGatewayApp.khBookCatalogBookCatalog.home.createOrEditLabel" data-cy="BookCatalogCreateUpdateHeading">
            <Translate contentKey="khGatewayApp.khBookCatalogBookCatalog.home.createOrEditLabel">Create or edit a BookCatalog</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="book-catalog-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('khGatewayApp.khBookCatalogBookCatalog.title')}
                id="book-catalog-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 5, message: translate('entity.validation.minlength', { min: 5 }) },
                  maxLength: { value: 20, message: translate('entity.validation.maxlength', { max: 20 }) },
                }}
              />
              <ValidatedField
                label={translate('khGatewayApp.khBookCatalogBookCatalog.description')}
                id="book-catalog-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('khGatewayApp.khBookCatalogBookCatalog.author')}
                id="book-catalog-author"
                name="author"
                data-cy="author"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('khGatewayApp.khBookCatalogBookCatalog.bookId')}
                id="book-catalog-bookId"
                name="bookId"
                data-cy="bookId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('khGatewayApp.khBookCatalogBookCatalog.rentCnt')}
                id="book-catalog-rentCnt"
                name="rentCnt"
                data-cy="rentCnt"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/book-catalog" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BookCatalogUpdate;
