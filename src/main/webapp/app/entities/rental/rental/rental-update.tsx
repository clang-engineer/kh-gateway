import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IRental } from 'app/shared/model/rental/rental.model';
import { RentalStatus } from 'app/shared/model/enumerations/rental-status.model';
import { getEntity, updateEntity, createEntity, reset } from './rental.reducer';

export const RentalUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const rentalEntity = useAppSelector(state => state.khgateway.rental.entity);
  const loading = useAppSelector(state => state.khgateway.rental.loading);
  const updating = useAppSelector(state => state.khgateway.rental.updating);
  const updateSuccess = useAppSelector(state => state.khgateway.rental.updateSuccess);
  const rentalStatusValues = Object.keys(RentalStatus);

  const handleClose = () => {
    navigate('/rental' + location.search);
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
      ...rentalEntity,
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
          rentalStatus: 'RENT_AVAILABLE',
          ...rentalEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="khGatewayApp.rentalRental.home.createOrEditLabel" data-cy="RentalCreateUpdateHeading">
            <Translate contentKey="khGatewayApp.rentalRental.home.createOrEditLabel">Create or edit a Rental</Translate>
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
                  id="rental-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('khGatewayApp.rentalRental.userId')}
                id="rental-userId"
                name="userId"
                data-cy="userId"
                type="text"
              />
              <ValidatedField
                label={translate('khGatewayApp.rentalRental.rentalStatus')}
                id="rental-rentalStatus"
                name="rentalStatus"
                data-cy="rentalStatus"
                type="select"
              >
                {rentalStatusValues.map(rentalStatus => (
                  <option value={rentalStatus} key={rentalStatus}>
                    {translate('khGatewayApp.RentalStatus.' + rentalStatus)}
                  </option>
                ))}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/rental" replace color="info">
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

export default RentalUpdate;
