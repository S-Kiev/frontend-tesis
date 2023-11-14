import { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { login } from 'api/auth';
import { getAuthenticatedUser, setAuthenticatedUser, storeToken } from 'util/auth';
import { getUserData } from 'api/user';
import { QueryKeys } from 'api/QueryKeys'; 

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (getAuthenticatedUser()) {
      navigate('/home');
    }
  }, [navigate]);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      storeToken(data.data.jwt);
    },
    onError: (error: any) => {
      if (error.response && error.response.status) {
        //TODO Validation
        console.log('error', error);
      }
    },
  });

  const { data: mutationData, isLoading } = mutation;
  useQuery({
    queryKey: [QueryKeys.UserData],
    queryFn: getUserData,
    // The query will not execute until the mutationData exists
    enabled: !!mutationData,
    onSuccess: data => {
      if (data.data) {
        const authUser = {
          id: data.data.id,
          username: data.data.username,
          email: data.data.email,
          role: data.data.role.name,
        };
        setAuthenticatedUser(authUser);
        navigate('/home');
      }
    },
  });

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    mutation.mutate({ identifier: email, password });
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className="mb-5">{'Login'}</h2>
      <Form className={styles.formContainer} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{'email_address'}</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder={'email_placeholder' || ''}
            onChange={e => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{'password'}</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder={'password_placeholder' || ''}
            onChange={e => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {'login'}
        </Button>
      </Form>
    </div>
  );
};

export default Login;