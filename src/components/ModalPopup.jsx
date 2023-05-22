/* eslint-disable react/prop-types */
import React from 'react';
import Popup from 'devextreme-react/popup';

// eslint-disable-next-line react/prop-types
const ModalPopup = React.forwardRef(({
  //   showTitle,
  //   title,
  popupVisible,
  renderContent,
  handlePopupClose,
}, ref) => {
  return (
    <Popup
      ref={ref}
      width={1000}
      height={540}
      showTitle={false}
      dragEnabled={false}
      hideOnOutsideClick={true}
      visible={popupVisible}
      onHiding={handlePopupClose}
      contentRender={renderContent}

      
    />
  );
});

export default ModalPopup;
