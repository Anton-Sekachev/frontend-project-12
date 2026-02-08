import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';

import { closeModal } from '../../../redux/slices/modalSlice';
import useFilter from '../../../Hooks/useFilter';
import selectors from '../../../redux/selectors';
import ModalForm from './ModalForm';
import getChannelNameSchema from './ChannelNameSchema';
import useAuth from '../../../Hooks/useAuth';

const RenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filter = useFilter();
  const inputRef = useRef(null);
  const { getAuthHeader } = useAuth();

  const channelId = useSelector(selectors.modalChannelIdSelector);
  const channelName = useSelector(selectors.channelNameSelector);
  const channelNames = useSelector(selectors.channelsNamesSelector);

  const ChannelNameSchema = getChannelNameSchema(channelNames);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  const formik = useFormik({
    initialValues: { channelName },
    validationSchema: ChannelNameSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        const cleanName = filter.clean(values.channelName.trim());
        const header = getAuthHeader();

        await axios.patch(
          `/api/v1/channels/${channelId}`,
          { name: cleanName },
          { headers: header },
        );

        dispatch(closeModal());
        toast.success(t('channels.channelRenamed'));
      } catch (error) {
        console.error(error);
        toast.error(t('errors.dataLoadingError'));
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.renameChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm
          onSubmit={formik.handleSubmit}
          formik={formik}
          inputRef={inputRef}
        />
      </Modal.Body>
    </>
  );
};

export default RenameChannel;
