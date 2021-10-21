import React from 'react';
import { Row, Col, Divider } from 'antd';
import GoogleAuth from './GoogleAuth';
import BookList from './BookList';
import BookSearchForm from './BookSearchForm';

const App = () => {
  return (
    <>
      <Row justify="space-around" align="middle" style={{marginTop: '20px'}}>
        <Col className="gutter-row" >
          <BookSearchForm />
        </Col>
        <Col className="gutter-row"  >
          <GoogleAuth />
        </Col>
      </Row>
      <Divider orientation="left">Book List</Divider>
      <Row>
        <Col span={18} offset={3}>
          <BookList />
        </Col>
      </Row>
    </>
  );
}

export default App;
