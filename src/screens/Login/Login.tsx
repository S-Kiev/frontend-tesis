import { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { login } from 'api/auth';
import { isLoggedIn, storeToken } from 'util/auth';
import { getUserData } from 'api/user';
import { QueryKeys } from 'api/QueryKeys';
import { useAppDispatch } from 'redux/hooks';
import { setUser } from 'redux/reducers/userSlice';
import logo from 'assets/EnergiaNaturalNA.png';
import loginImg from 'assets/LoginImg.jpg';

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn()) {
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
        dispatch(setUser(authUser));
        navigate('/home');
      }
    },
  });

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    mutation.mutate({ identifier: email, password });
  };

  return (
    <section className={`h-100 ${styles.form}`} style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img src={logo} alt="logo" className={styles.logo} />
                      <h4 className="mt-1 mb-4 pb-1">Bienvenido a Energía Natural Salud y Estética</h4>
                    </div>
                    <p>Por favor, ingrese a su cuenta</p>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="form-outline mb-4" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          required
                          type="email"
                          placeholder={'Ingrese su email' || ''}
                          onChange={e => setEmail(e.target.value)}
                          disabled={isLoading}
                        />
                      </Form.Group>
                      <Form.Group className="form-outline mb-4" controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          placeholder={'Ingrese su contraseña' || ''}
                          onChange={e => setPassword(e.target.value)}
                          disabled={isLoading}
                        />
                      </Form.Group>
                      <div className="text-center pt-3 mb-5 pb-1">
                        <Button
                          variant="success"
                          type="submit"
                          disabled={isLoading}
                          size="lg"
                          color="#4DB178"
                          className="mb-2"
                        >
                          Iniciar sesión
                        </Button>
                      </div>
                      <Link onClick={() => navigate('/resetpass')} to={'#'} className={`text-muted`}>
                        ¿Has olvidado tu contraseña?
                      </Link>
                    </Form>
                  </div>
                </div>
                <div className="d-none d-lg-block col-lg-6 d-flex align-items-center">
                  <img src={loginImg} alt="loginImg" className={styles.loginImg} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
