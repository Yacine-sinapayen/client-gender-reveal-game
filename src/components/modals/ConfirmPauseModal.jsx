import Modal from '../ui/Modal';
import Card from '../ui/Card';
import Button from '../ui/Button';
import PropTypes from 'prop-types';

const ConfirmPauseModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-md mx-4">
      <Card className="relative z-10">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">⏸️</div>
          <p className="text-sm text-gray-600 mb-6">
            Petite pause pipi ? Ou pause café ? 
            On reprend quand vous voulez ! ☕
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button
            size="lg"
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
          >
            ❌ Non
          </Button>
          <Button
            size="lg"
            onClick={onConfirm}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            ⏸️ Oui, pause !
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

ConfirmPauseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmPauseModal;
