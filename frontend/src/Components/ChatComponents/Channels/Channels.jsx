import { Button, Nav } from 'react-bootstrap';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { openModal } from '../../../redux/slices/modalSlice.js';
import Channel from './Channel.jsx';
import ChatModal from '../Modals/ChatModal';
import selectors from '../../../redux/selectors.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.channelsSelector) ?? [];
  const defaultChannelId = 1;
  const currentChannelId = useSelector(selectors.currentChannelIdSelector) ?? defaultChannelId;
  const lastChannelId = channels.length > 0 ? channels[channels.length - 1].id : null;

  useEffect(() => {
    if (!channels.length) return;

    const animateOptions = { containerId: 'channels-list', delay: 0, offset: 50 };

    if (currentChannelId === defaultChannelId) {
      animateScroll.scrollToTop(animateOptions);
    } else if (currentChannelId === lastChannelId) {
      animateScroll.scrollToBottom(animateOptions);
    }
  }, [currentChannelId, lastChannelId, channels.length]);
  const handleOpenModal = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  return (
    <>
      <ChatModal />
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('channels.channels')}</b>
          <Button
            title={t('channels.addChannel')}
            variant="group-vertical"
            className="add-channel p-0 text-primary"
            onClick={handleOpenModal}
          >
            <FaRegSquarePlus size={20} color="rgb(85 133 124)" />
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <Nav id="channels-list" className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {
            channels.map((data) => (
              <Channel
                key={data.id}
                data={data}
                isCurrent={data.id === currentChannelId}
              />
            ))
          }
        </Nav>
      </div>
    </>
  );
};

export default Channels;
