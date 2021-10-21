import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import 'antd/dist/antd.css';
import { List, Card, Row, Col } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { fetchBooks, fetchFavorites, setFavorites, addFavorites, deleteFavorites } from '../actions';


const BookList = () => {
    const dispatch = useDispatch();
    const term = useSelector(state => state.term);
    const books = useSelector(state => Object.values(state.books));
    const favorites = useSelector(state => state.favorites)

    useEffect(() => {
        dispatch(fetchBooks(term));
        renderBooks()
    }, [term, favorites]);


    useEffect(() => {
        dispatch(fetchFavorites())
    }, [])

    const renderBooks = () => {
        if(favorites.length !== 0 && books.length !==0) { 
            books.map(book => {
                favorites.map(fav => {
                    if(book.id === fav.id) {
                        console.log(book)
                        return _.remove(books, book)
                    }
                    else return fav
                })
            }) 
            return [renderList(favorites), renderList(books)]
        }
        else {
            return renderList(books);
        }
    }

    const setToFavorites = (book) => {
        dispatch(addFavorites(book))
    }

    const unsetFavorites = (id) => {
        dispatch(deleteFavorites(id))
    }

    const renderList = (list) => {
        return (
            <>
                <Row>
                    <Col className="gutter-row" md={{ span: 18, offset: 3}} xs={{ span: 24, offset: 0}}>
                        <List
                            itemLayout="horizontal"
                            dataSource={list}
                            renderItem={book => (
                                <Card 
                                key={book.id}
                                extra={
                                    <a href="#" onClick={() => {
                                        list === favorites ?
                                        unsetFavorites(book.id) : setToFavorites(book)
                                    }} >
                                        {list === favorites ? <HeartFilled /> : <HeartOutlined />}
                                    </a>}
                                    style={{ marginBottom: '30px' }}>
                                    <List.Item
                                        key={book.id}
                                        actions={[
                                            book.accessInfo.epub.downloadLink &&
                                            <a href={book.accessInfo.epub.downloadLink} target="_blank" rel="noreferrer">epub</a>,
                                            book.accessInfo.pdf.downloadLink &&
                                            <a href={book.accessInfo.pdf.downloadLink} target="_blank" rel="noreferrer">pdf</a>
                                        ]}
                                        >

                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src={book.volumeInfo.imageLinks.thumbnail} shape="square" />
                                            }
                                            title={
                                                <a href={book.accessInfo.pdf.downloadLink} target="_blank" rel="noreferrer">
                                                    {book.volumeInfo.title}
                                                </a>}
                                            description={book.volumeInfo.authors}
                                        />
                                    </List.Item>
                                </Card>
                            )}
                        />
                    </Col>
                </Row>
            </>
        )
    }

    return (
        <div>
            {renderBooks()}
        </div>
    )
}

export default BookList;