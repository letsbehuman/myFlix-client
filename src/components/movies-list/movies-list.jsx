import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  // For the case when visibility is an empty string
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(
        visibilityFilter.toLowerCase()
      )
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Row>
        <Col
          md={12}
          style={{ margin: '2em' }}
          className="align-left">
          <VisibilityFilterInput
            visibilityFilter={visibilityFilter}
          />
        </Col>
      </Row>
      <Row>
        {filteredMovies.map((m) => (
          <MovieCard movieData={m} />
        ))}
      </Row>
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);