import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './rented-item.reducer';

export const RentedItemDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const rentedItemEntity = useAppSelector(state => state.khgateway.rentedItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="rentedItemDetailsHeading">
          <Translate contentKey="khGatewayApp.rentalRentedItem.detail.title">RentedItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{rentedItemEntity.id}</dd>
          <dt>
            <span id="bookId">
              <Translate contentKey="khGatewayApp.rentalRentedItem.bookId">Book Id</Translate>
            </span>
          </dt>
          <dd>{rentedItemEntity.bookId}</dd>
          <dt>
            <span id="rentedDate">
              <Translate contentKey="khGatewayApp.rentalRentedItem.rentedDate">Rented Date</Translate>
            </span>
          </dt>
          <dd>
            {rentedItemEntity.rentedDate ? (
              <TextFormat value={rentedItemEntity.rentedDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dueDate">
              <Translate contentKey="khGatewayApp.rentalRentedItem.dueDate">Due Date</Translate>
            </span>
          </dt>
          <dd>
            {rentedItemEntity.dueDate ? <TextFormat value={rentedItemEntity.dueDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="khGatewayApp.rentalRentedItem.rental">Rental</Translate>
          </dt>
          <dd>{rentedItemEntity.rental ? rentedItemEntity.rental.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/rented-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/rented-item/${rentedItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default RentedItemDetail;
