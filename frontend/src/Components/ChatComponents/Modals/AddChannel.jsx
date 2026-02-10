import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';

import { closeModal } from '../../../redux/slices/modalSlice';
import { setActiveChannel } from '../../../redux/slices/channelsSlice';
import useFilter from '../../../Hooks/useFilter';
import selectors from '../../../redux/selectors';
import ModalForm from './ModalForm';
import getChannelNameSchema from './ChannelNameSchema';
import useAuth from '../../../Hooks/useAuth';

const AddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filter = useFilter();
  const inputRef = useRef(null);

  const { getAuthHeader } = useAuth();

  const channelNames = useSelector(selectors.channelsNamesSelector);
  const ChannelNameSchema = getChannelNameSchema(channelNames, t);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: ChannelNameSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      const cleanName = filter.clean(values.channelName.trim());

      try {
        const channelData = { name: cleanName };
        const header = getAuthHeader();

        const response = await axios.post('/api/v1/channels', channelData, { headers: header });

        const { data } = response;

        toast.success(t('channels.channelAdded'));

        dispatch(setActiveChannel(data.id));

        dispatch(closeModal());
        formik.resetForm();
      } catch (err) {
        console.error(err);
        toast.error(t('errors.networkError'));
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.addChannel')}</Modal.Title>
      </Modal.Header>
      <ModalForm onSubmit={formik.handleSubmit} formik={formik} inputRef={inputRef} />
    </>
  );
};

export default AddChannel;
