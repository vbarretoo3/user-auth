import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState('')
    const history = useNavigate()
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault() 
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            if (emailRef.current.value !== currentUser.email) {
                await updateEmail(emailRef.current.value)
            }
            if (passwordRef.current.value) {
                await updatePassword(passwordRef.current.value)
            }
            history('/')
        } catch {
            setError('Failed to update account')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Update Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required defaultValue={currentUser.emailRef}/>
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} placeholder='Leave blank to keep the same'/>
                        </Form.Group>
                        <Form.Group id='passwordConfirm'>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} placeholder='Leave blank to keep the same'/>
                        </Form.Group>
                        <br/>
                        <Button disable={loading} className='w-100' type='submit'>Update Profile</Button>
                    </Form>
                    <div className='w-100 text-center mt-2'>
                        <Link to='/'>Cancel</Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}
