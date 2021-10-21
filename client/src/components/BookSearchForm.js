import React from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { setTerm } from '../actions';

const BookSearchForm = () => {
    const dispatch = useDispatch();

    const onSubmit = (value) => {
        dispatch(setTerm(value.search))
    }

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Search Books</label>
                        <Field 
                            className="ant-input" 
                            name="search" 
                            component="input" 
                        />
                    </div>

                   <Button type="primary" htmlType="submit" style={{marginTop: '10px'}}>Submit</Button>
                </form>
            )}
        />
    )
}

export default BookSearchForm;
