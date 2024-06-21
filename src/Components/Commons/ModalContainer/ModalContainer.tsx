'use client';

import CreateReviewModal from '@/Components/Modal/CreateReviewModal';
import EditProductModal from '@/Components/Modal/EditProductModal';
import { FunctionComponent } from 'react';

import Modal from 'react-modal';
import CompareModal from '../../Compare/CompareModal';
import FolloweesModal from '../Cards/UserprofileCard/FolloweeModal';
import FollowersModal from '../Cards/UserprofileCard/FollowerModal';
import ProfileEditModal from '../Cards/UserprofileCard/ProfileEditModal';
import AddProductModal from '../Button/FloatingButton/AddProductModal';

const modalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.70)',
    width: '100%',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    borderRadius: '16px',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    overflow: 'auto',
    border: '0px',
  },
};

if (typeof window !== 'undefined') {
  Modal.setAppElement(document.body);
}
type ModalComponents = {
  [key: string]: FunctionComponent<any>;
};

const MODAL_COMPONENTS: ModalComponents = {
  // test: TestModal, 이런식으로 추가
  followee: FolloweesModal,
  follower: FollowersModal,
  profileEdit: ProfileEditModal,
  compare: CompareModal,
  addProduct: AddProductModal,
  createReview: CreateReviewModal,
  editProduct: EditProductModal,
};

export default function ModalContainer(props: any) {
  const { modalState } = props;
  const { setModalState } = props;

  if (!modalState.type) {
    return null;
  }

  const Contents = MODAL_COMPONENTS[modalState.type];

  return (
    <Modal
      className=" bg-bgblack"
      isOpen={modalState.isOpen}
      style={modalStyles}
      onRequestClose={() => {
        setModalState(false);
      }}
    >
      <Contents />
    </Modal>
  );
}
