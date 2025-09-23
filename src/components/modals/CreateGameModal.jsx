import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../ui/Modal';
import Card from '../ui/Card';
import Title from '../ui/Title';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { X, Plus, Mail, Users } from 'lucide-react';
import PropTypes from 'prop-types';

const CreateGameModal = ({ isOpen, onClose, onCreateGame }) => {
  const [gameName, setGameName] = useState('');
  const [participantEmails, setParticipantEmails] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (index, value) => {
    const newEmails = [...participantEmails];
    newEmails[index] = value;
    setParticipantEmails(newEmails);
  };

  const addEmailField = () => {
    setParticipantEmails([...participantEmails, '']);
  };

  const removeEmailField = (index) => {
    if (participantEmails.length > 1) {
      const newEmails = participantEmails.filter((_, i) => i !== index);
      setParticipantEmails(newEmails);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!gameName.trim()) {
      alert('Veuillez saisir un nom pour la partie');
      return;
    }

    const validEmails = participantEmails.filter(email => email.trim() !== '');
    
    setIsLoading(true);
    try {
      await onCreateGame({
        gameName: gameName.trim(),
        participantEmails: validEmails
      });
      
      // Reset form
      setGameName('');
      setParticipantEmails(['']);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la création de la partie:', error);
      alert('Erreur lors de la création de la partie. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setGameName('');
      setParticipantEmails(['']);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl mx-4"
      >
        <Card className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <Title level={2} className="text-2xl font-bold text-marron-chaud">
                Créer une partie
              </Title>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Game Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de la partie *
              </label>
              <Input
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder="Ex: Baby Shower de Marie"
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            {/* Participants */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Inviter des participants
              </label>
              <div className="space-y-3">
                {participantEmails.map((email, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => handleEmailChange(index, e.target.value)}
                        placeholder="email@exemple.com"
                        disabled={isLoading}
                        className="w-full"
                      />
                    </div>
                    {participantEmails.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEmailField(index)}
                        disabled={isLoading}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addEmailField}
                  disabled={isLoading}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter un participant
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 font-medium mb-1">
                    Invitation par email
                  </p>
                  <p className="text-sm text-blue-700">
                    Les participants recevront un email avec le code de la partie pour la rejoindre.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !gameName.trim()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isLoading ? 'Création...' : 'Créer la partie'}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </Modal>
  );
};

CreateGameModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreateGame: PropTypes.func.isRequired,
};

export default CreateGameModal;
