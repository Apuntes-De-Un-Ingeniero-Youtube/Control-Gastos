import { DatePicker, Form, Input, Modal } from "antd";
import moment from "moment";
import React from "react";

const CreateModal = ({
  modalVisible,
  setModalVisible,
  handleAdd,
  newExpense,
  setNewExpense,
  editingRecord,
  setEditingRecord,
  confirmUpdateRecord,
}) => {
  return (
    <Modal
      title={editingRecord ? "Editar Gasto" : "Agregar Gasto"}
      visible={modalVisible}
      onOk={editingRecord ? confirmUpdateRecord : handleAdd}
      onCancel={() => {
        setModalVisible(false);
        setEditingRecord(null);
      }}
    >
      <Form>
        <Form.Item label="Fecha">
          <DatePicker
            value={editingRecord ? moment(editingRecord.date) : newExpense.date}
            onChange={(date) =>
              setEditingRecord
                ? setEditingRecord({ ...editingRecord, date })
                : setNewExpense({ ...newExpense, date })
            }
          />
        </Form.Item>
        <Form.Item label="Concepto">
          <Input
            value={editingRecord ? editingRecord.concept : newExpense.concept}
            onChange={(e) =>
              editingRecord
                ? setEditingRecord({
                    ...editingRecord,
                    concept: e.target.value,
                  })
                : setNewExpense({ ...newExpense, concept: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Monto">
          <Input
            type="number"
            value={editingRecord ? editingRecord.amount : newExpense.amount}
            onChange={(e) =>
              editingRecord
                ? setEditingRecord({
                    ...editingRecord,
                    amount: e.target.value,
                  })
                : setNewExpense({ ...newExpense, amount: e.target.value })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
