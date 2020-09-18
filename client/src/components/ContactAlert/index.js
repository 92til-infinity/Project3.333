import React from 'react';
import { toast, ToastContainer, MDBContainer, MDBBtn } from 'mdbreact';

const ContactAlert = () => {
  const notify = (type) => {
    return () => {
      switch (type) {
        case 'info':
          toast.info('Info message', {
            closeButton: false,
          });
          break;
        case 'success':
          toast.success('Success message', {
            closeButton: false,
          });
          break;
        case 'warning':
          toast.warn('Warning message', {
            closeButton: false,
          });
          break;
        case 'error':
          toast.error('Error message', {
            closeButton: false,
          });
          break;
        default:
          toast.error('Error message', {
            closeButton: false,
          });
      }
    };
  };
  notify('success');
  return (
    <MDBContainer>
      <ToastContainer
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={5000}
      />
    </MDBContainer>
  );
};

export default ContactAlert;
