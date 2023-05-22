import React, { useState } from 'react';
import { List } from 'devextreme-react/list';
import { Button } from 'devextreme-react/button';
import "./Sidebar.scss";
import darkLogo from '../assets/imgs/dark-logo.png';


function Sidebar() {
  const sidebarItems = [
    { id: 1, text: "Short stay", data: "This is the data for Item 1", icon: "home" },
    { id: 2, text: "Inpatient", data: "This is the data for Item 2", icon: "user" },
    { id: 3, text: "Discharged", data: "This is the data for Item 3", icon: "folder" },
    { id: 4, text: "My accounts", data: "This is the data for Item 4", icon: "user" }
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [selectedItemKeys, setSelectedItemKeys] = useState([]);

  function onButtonClick() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function onItemClick(e) {
    const selectedItem = sidebarItems.find(item => item.id === e.itemData.id);
    setSelectedItemData(selectedItem.data);
    setSelectedItemKeys([selectedItem.id]);
  }
  const sidebarClassName = isSidebarOpen ? 'open' : 'close';

  return (
    <div className={`side-navbar ${sidebarClassName}`} data-testid="sidebar" >
      <Button
        icon={isSidebarOpen ? 'chevronleft' : 'chevronright'}
        onClick={onButtonClick}
        className="side-navbar-toggle"
        data-testid="sidebar-toggle"
      />
      <div className="main">
        <div className='imageLogo1'>
          <img src={darkLogo} alt='logo' className='imageLogo' />
        </div>
        <List
          dataSource={sidebarItems}
          onItemClick={onItemClick}
          selectedItems={selectedItemKeys}
          keyExpr="id"
          visible={isSidebarOpen}
          height={300}
          width={200}
          itemRender={(item) => (<>
            {console.log(item)}
            <div
              className={`list-item-container ${selectedItemKeys.includes(item.id) ? 'selected' : ''}`}
              data-testid={`sidebar-item-${item.id}`}
              key={`sidebar-item-${item.id}`}
            >
              <i className={`dx-icon-${item.icon} item-icon`} />
              <span className="item-text">{item.text}</span>
            </div></>
          )}
        />
      </div>
      <div className="sidebar-right-content">
        {selectedItemData && <h3>{selectedItemData}</h3>}
      </div>
    </div>
  );
}

export default Sidebar;
