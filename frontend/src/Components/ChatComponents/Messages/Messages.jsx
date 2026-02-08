import { Form, Button } from 'react-bootstrap';
import { IoSendSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';
import Message from './Message.jsx';
import selectors from '../../../redux/selectors.js';
import useAuth from '../../../Hooks/useAuth';
import useFilter from '../../../Hooks/useFilter';

const scrollToBottom = (element) => {
  if (element) {
    element.scrollTo(0, element.scrollHeight);
  }
};

const MessageSchema = Yup.object().shape({
  body: Yup.string().trim().min(1).required(),
});

const Messages = () => {
  const { t } = useTranslation();
  const messagesBoxRef = useRef();
  const messageInputRef = useRef();
  const filter = useFilter();

  const { getAuthHeader, user } = useAuth();

  const currentChannelId = useSelector(selectors.currentChannelIdSelector);
  const currentChannelName = useSelector(selectors.currentChannelNameSelector);
  const messages = useSelector(selectors.messagesSelector);
  const fullState = useSelector((state) => state);
  console.log('DEBUG: ВЕСЬ Redux Стейт:', fullState);
  useEffect(() => {
    messageInputRef.current?.focus();
  }, [currentChannelId]);

  useEffect(() => {
    scrollToBottom(messagesBoxRef.current);
  }, [messages]);

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: MessageSchema,
    onSubmit: async (values) => {
      const cleanBody = filter.clean(values.body.trim());
      const newMessage = {
        body: cleanBody,
        username: user.username,
      };

      try {
        const header = getAuthHeader();
        await axios.post(
          `/api/v1/channels/${currentChannelId}/messages`,
          newMessage,
          { headers: header },
        );

        formik.resetForm();
        setTimeout(() => messageInputRef.current?.focus(), 0);
      } catch (error) {
        toast.error(t('errors.network'));
        console.error(error);
      }
    },
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">
            {t('messages.count', { count: messages.length })}
          </span>
        </div>

        <div ref={messagesBoxRef} id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.map((message) => (
            <Message message={message} key={message.id} />
          ))}
        </div>

        <div className="mt-auto px-5 py-3">
          <Form
            className="py-1 border rounded-2"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <Form.Group className="input-group">
              <Form.Control
                id="body"
                name="body"
                className="border-0 p-0 ps-2"
                autoComplete="off"
                ref={messageInputRef}
                aria-label={t('messages.newMessage')}
                placeholder={t('messages.enterMessage')}
                onChange={formik.handleChange}
                value={formik.values.body}
                disabled={formik.isSubmitting}
              />
              <Button
                type="submit"
                variant="group-vertical"
                className="border-0"
                disabled={formik.isSubmitting || !formik.values.body.trim()}
              >
                <IoSendSharp size={20} color="rgb(85 133 124)" />
                <span className="visually-hidden">{t('messages.sendMessage')}</span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
