import ActionButton from "./ActionButton";
import DynamicIcon from "./DynamicIcon";

const EditorResourcesTools = ({
  resourceIsActive,
  resourceIsEditing,
  toggleVisibilityFunction,
  editFunction,
  deleteFunction,
  cancelFunction,
  saveFunction,
}: {
  resourceIsActive: boolean;
  resourceIsEditing: boolean;
  toggleVisibilityFunction: () => void;
  editFunction: () => void;
  deleteFunction: () => void;
  cancelFunction: () => void;
  saveFunction: () => void;
}) => {
  return (
    <>
      {resourceIsEditing ? (
        <div className="w-fit flex items-center justify-center gap-3 mb-3 font-normal">
          <ActionButton
            color="primary"
            text="Salvar"
            icon={<DynamicIcon name="save" />}
            action={saveFunction}
          />
          <ActionButton
            outline
            text="Cancelar"
            icon={<DynamicIcon name="x" />}
            type="submit"
            action={cancelFunction}
          />
        </div>
      ) : (
        <div className="w-fit flex items-center justify-end gap-3 mb-3 font-normal">
          {resourceIsActive ? (
            <ActionButton
              color="success"
              outline
              size="xs"
              icon={<DynamicIcon name="eye" />}
              action={toggleVisibilityFunction}
              tooltip="Ocultar"
            />
          ) : (
            <ActionButton
              color="ghost"
              outline
              size="xs"
              icon={<DynamicIcon name="eye-off" />}
              action={toggleVisibilityFunction}
              tooltip="Tornar visível"
            />
          )}
          <ActionButton
            color="warning"
            outline
            size="xs"
            icon={<DynamicIcon name="edit" />}
            action={editFunction}
            tooltip="Editar"
          />
          <ActionButton
            color="error"
            outline
            size="xs"
            icon={<DynamicIcon name="trash" />}
            action={deleteFunction}
            tooltip="Excluir"
          />
        </div>
      )}
    </>
  );
};

export default EditorResourcesTools;
