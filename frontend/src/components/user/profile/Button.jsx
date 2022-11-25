import { Button } from "antd"

const AppButton = ({ editMode, setEditMode, handleSaveChanges }) => {
  return (
    <div>
      {!editMode ? (
        <Button
          style={{ color: "black", backgroundColor: "pink" }}
          onClick={() => setEditMode(true)}
        >
          Edit
        </Button>
      ) : (
        <>
          <Button
            style={{ color: "black", backgroundColor: "pink" }}
            onClick={() => setEditMode(false)}
          >
            Cancel
          </Button>
          <Button
            style={{ color: "black", backgroundColor: "pink" }}
            onClick={handleSaveChanges}
          >
            Save
          </Button>
        </>
      )}
    </div>
  )
}

export default AppButton
