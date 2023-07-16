import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IRental } from 'app/shared/model/rental/rental.model';
import { getEntities as getRentals } from 'app/entities/rental/rental/rental.reducer';
import { IRentedItem } from 'app/shared/model/rental/rented-item.model';
import { getEntity, updateEntity, createEntity, reset } from './rented-item.reducer';

export const RentedItemUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const rentals = useAppSelector(state => state.khgateway.rental.entities);
  const rentedItemEntity = useAppSelector(state => state.khgateway.rentedItem.entity);
  const loading = useAppSelector(state => state.khgateway.rentedItem.loading);
  const updating = useAppSelector(state => state.khgateway.rentedItem.updating);
  const updateSuccess = useAppSelector(state => state.khgateway.rentedItem.updateSuccess);

  const handleClose = () => {
    navigate('/rented-item' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getRentals({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...rentedItemEntity,
      ...values,
      rental: rentals.find(it => it.id.toString() === values.rental.toString()),
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
          ...rentedItemEntity,
          rental: rentedItemEntity?.rental?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="khGatewayApp.rentalRentedItem.home.createOrEditLabel" data-cy="RentedItemCreateUpdateHeading">
            <Translate contentKey="khGatewayApp.rentalRentedItem.home.createOrEditLabel">Create or edit a RentedItem</Translate>
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
                  id="rented-item-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('khGatewayApp.rentalRentedItem.bookId')}
                id="rented-item-bookId"
                name="bookId"
                data-cy="bookId"
                type="text"
              />
              <ValidatedField
                label={translate('khGatewayApp.rentalRentedItem.rentedDate')}
                id="rented-item-rentedDate"
                name="rentedDate"
                data-cy="rentedDate"
                type="date"
              />
              <ValidatedField
                label={translate('khGatewayApp.rentalRentedItem.dueDate')}
                id="rented-item-dueDate"
                name="dueDate"
                data-cy="dueDate"
                type="date"
              />
              <ValidatedField
                id="rented-item-rental"
                name="rental"
                data-cy="rental"
                label={translate('khGatewayApp.rentalRentedItem.rental')}
                type="select"
              >
                <option value="" key="0" />
                {rentals
                  ? rentals.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/rented-item" replace color="info">
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

export default RentedItemUpdate;
