import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';

import { closeModal } from '../../../redux/slices/modalSlice';
import selectors from '../../../redux/selectors';
import ModalFooter from './ModalFooter';
import useAuth from '../../../Hooks/useAuth';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();

  const channelId = useSelector(selectors.modalChannelIdSelector);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      try {
        const header = getAuthHeader();

        await axios.delete(`/api/v1/channels/${channelId}`, { headers: header });

        toast.success(t('channels.channelRemoved'));
        dispatch(closeModal());
      } catch (error) {
        console.error('Delete error:', error);
        toast.error(t('errors.network'));
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.removeChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('channels.confirmRemove')}</p>
      </Modal.Body>
      <form onSubmit={formik.handleSubmit}>
        <ModalFooter
          handleModalHide={() => dispatch(closeModal())}
          isDisabled={formik.isSubmitting}
          submitButtonVariant="danger"
        />
      </form>
    </>
  );
};

export default RemoveChannel;
