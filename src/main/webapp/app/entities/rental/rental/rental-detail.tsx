import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './rental.reducer';

export const RentalDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const rentalEntity = useAppSelector(state => state.khgateway.rental.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="rentalDetailsHeading">
          <Translate contentKey="khGatewayApp.rentalRental.detail.title">Rental</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{rentalEntity.id}</dd>
          <dt>
            <span id="userId">
              <Translate contentKey="khGatewayApp.rentalRental.userId">User Id</Translate>
            </span>
          </dt>
          <dd>{rentalEntity.userId}</dd>
          <dt>
            <span id="rentalStatus">
              <Translate contentKey="khGatewayApp.rentalRental.rentalStatus">Rental Status</Translate>
            </span>
          </dt>
          <dd>{rentalEntity.rentalStatus}</dd>
        </dl>
        <Button tag={Link} to="/rental" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/rental/${rentalEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default RentalDetail;
