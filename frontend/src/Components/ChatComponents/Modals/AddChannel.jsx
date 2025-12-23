import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeModal } from '../../../redux/slices/modalSlice';
import { setActiveChannel } from '../../../redux/slices/channelsSlice';
import SocketContext from '../../../Contexts/SocketContext.js';
import useFilter from '../../../Hooks/useFilter';
import selectors from '../../../redux/selectors';
import ModalForm from './ModalForm';
import getChannelNameSchema from './ChannelNameSchema';

const AddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filter = useFilter();
  const socketApi = useContext(SocketContext);
  const inputRef = useRef(null);

  const channelNames = useSelector(selectors.channelsNamesSelector);
  const ChannelNameSchema = getChannelNameSchema(channelNames);

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
        const response = await socketApi.addChannel(cleanName);
        const { data } = response;

        toast.success(t('channels.channelAdded'));

        dispatch(setActiveChannel(data.id));
        dispatch(closeModal());
        formik.resetForm();
      } catch (err) {
        console.error(err);
        toast.error(t('errors.network'));
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
