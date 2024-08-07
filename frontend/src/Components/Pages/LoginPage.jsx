import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import FormInput from './FormInput';

import useAuth from '../../Hooks/useAuth';
import routes from '../../routes';

import loginImage from '../../Images/login.svg';

const LoginForm = () => {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.loginPath, values);
        logIn(data);
        navigate(routes.chatPagePath);
        formik.resetForm();
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          toast.error(t('errors.networkError'));
        } else if (error.response.status === 401) {
          setAuthFailed(true);
          formik.setFieldError('password', t('errors.wrongAuthData'));
          return;
        }
        toast.error(t('errors.dataLoadingError'));
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('login')}</h1>
      <fieldset disabled={formik.isSubmitting}>
        <FormInput
          type="text"
          field="username"
          formik={formik}
          label={t('nickname')}
          placeholder={t('nickname')}
          isInvalid={authFailed}
          autoFocus
        />
        <FormInput
          type="password"
          field="password"
          formik={formik}
          label={t('password')}
          placeholder={t('password')}
          isInvalid={authFailed}
        />
        <Button type="submit" disabled={formik.isSubmitting} variant="outline-primary" className="w-100 mb-3">
          {t('loginButton')}
        </Button>
      </fieldset>
    </Form>
  );
};

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5 row">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img style={{ pointerEvents: 'none' }} src={loginImage} className="roundedCircle" alt="Login" width="250px" />
              </Col>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="d-flex justify-content-center gap-2">
                <span>{t('noAccount')}</span>
                <Link to={routes.signupPagePath}>{t('register')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
