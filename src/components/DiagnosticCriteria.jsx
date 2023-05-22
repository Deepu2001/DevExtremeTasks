import React, { useRef, useState } from "react";
import DataGrid, {
  Column,
  Button,
  Editing,
  Pager,
  Paging,
  FilterRow,
  Lookup,
} from "devextreme-react/data-grid";
import { actionSheetItems } from "./data-dummy";  
import ActionSheet from "devextreme-react/action-sheet";
import { data, Notetype } from "./data-dummy";
import notify from "devextreme/ui/notify";
import products from "./data-dummy";
import "devextreme/dist/css/dx.light.css";
import ModalPopup from "./ModalPopup";
import "./dg.scss";

const DiagnosticCriteria = () => {
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
  const [actionSheetTarget, setActionSheetTarget] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedGuideLine, setSelectedGuidLine] = useState(products[0]);
  const [selectedCriteria, setSelectedCriteria] = useState();
  const [, setGuideLine] = useState(selectedGuideLine);
  const [criteria, setCriteria] = useState(selectedCriteria);
  const [myData, setMyData] = useState(data);
  const [rowIndex, setRowIndex] = useState();
  const [, setCriteriaData] = useState(products[0].data);
  const popupRef = useRef();
  const handlePopupOpen = () => {
    setPopupOpen(true);
  };
  const handlePopupClose = () => {
    setPopupOpen(false);
  };
  const handleClearCriteria = () => {
    setCriteria();
    setSelectedCriteria();
    setSelectedGuidLine(products[0]);
    setGuideLine(products[0]);
    setCriteriaData(products[0].data);
  };
  const handleDelete = (data) => {
    const row_index = data.row.loadIndex;
    setRowIndex(row_index);
    setIsActionSheetVisible(true);
    setActionSheetTarget(data.event.currentTarget);
  };
  function onActionSheetItemClick(data) {
    setIsActionSheetVisible(false);
    setMyData((prevData) => {
      const newData = [...prevData];
      newData.splice(rowIndex, 1);
      return newData;
    });
    notify({
      message: "Deleted.",
      width: 230,
      type: "success",
      position: {
        at: "top right",
        my: "top right",
        of: "#container",
      },
    });
  }
  function onVisibleChange(isVisible) {
    if (isVisible !== isActionSheetVisible) {
      setIsActionSheetVisible(isVisible);
    }
  }

  const renderContent = () => (
    <div className="dg-criteria">
      <div className="header">
        <h2 className="dg-criteria-heading">
          Notes
          <div
            className="close-button"
            name="close"
            onClick={handlePopupClose}
            data-testid="close-button"
          >
            &times;
          </div>
        </h2>
        <div className="note_div">Notes</div>
      </div>
      <div className="criteria">
        <DataGrid
          id="gridContainer"
          dataSource={myData}
          showBorders={true}
          showRowLines={true}
          data-testid="data-grid"
        >
          <Editing
            mode="row"
            useIcons={true}
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
          />
          <FilterRow visible={true} applyFilter="auto" />
          <Paging defaultPageSize={6} />
          <Pager visible={true} showNavigationButtons={true} />
          <Column dataField="note" width={250} />
          <Column
            dataField="NotetypeID"
            caption="Notetype"
            width={120}
            allowFiltering={false}
          >
            <Lookup
              dataSource={Notetype}
              valueExpr="ID"
              displayExpr="Name"
            />
          </Column>
          <Column
            dataField="createdOn"
            dataType="datetime"
            format="MMM dd, yyyy | h:mm a"
            width={180}
          />
          <Column
            dataField="modifiedOn"
            dataType="datetime"
            format="MMM dd, yyyy | h:mm a"
            width={180}
          />
          <Column dataField="createdBy" width={100} />
          <Column caption="Action" type="buttons" width={100}>
            <Button name="edit" />
            <Button name="delete" onClick={handleDelete} className="delete-button" data-testid="delete-button"/>
          </Column>
        </DataGrid>
        <ActionSheet
          title="Choose action"
          showTitle={true}
          usePopover={true}
          visible={isActionSheetVisible}
          target={actionSheetTarget}
          items={actionSheetItems}
          onItemClick={onActionSheetItemClick}
          onVisibleChange={onVisibleChange}
        />
      </div>
    </div>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 10,
          background: "#222",
          color: "#eee",
        }}
        className="diagnostic-criteria"
        aria-labelledby="diagnostic criteria"
      >
        <div className="select-criteria">
          <p onClick={handlePopupOpen} data-testid="select-criteria-button">
            {criteria?.label || "Select Criteria"}
          </p>
          {criteria && (
            <i
              role="img"
              className="dx-icon-remove"
              onClick={handleClearCriteria}
              data-testid="clear-button"
            ></i>
          )}
          <i
            onClick={handlePopupOpen}
            role="img"
            className="dx-icon-chevronright open-diagnostic-criteria-popup"
          ></i>
        </div>
      </div>
      <ModalPopup
        ref={popupRef}
        popupVisible={popupOpen}
        handlePopupClose={handlePopupClose}
        renderContent={renderContent}
      />
    </>
  );
};

export default DiagnosticCriteria;
