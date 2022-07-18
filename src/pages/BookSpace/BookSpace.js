import React from 'react';
import PropTypes from 'prop-types';
import './BookSpace.scss';
import BookSpaceForm from './BookSpaceForm';

const BookSpace = () => (
  <div className="BookSpace">
    <BookSpaceForm />
  </div>
);

BookSpace.propTypes = {};

BookSpace.defaultProps = {};

export default BookSpace;
