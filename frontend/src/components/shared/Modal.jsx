import PropTypes from "prop-types";

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 mt-20">
      <div className="bg-white rounded-lg p-6 w-3/4 lg:w-1/2 relative">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          Close
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
