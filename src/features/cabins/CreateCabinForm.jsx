import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, close }) {
  const { id: editId } = cabinToEdit;
  const isEditMode = Boolean(editId);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditMode ? cabinToEdit : {},
  });
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  function onSubmit(data) {
    // override image to use first image
    const image = typeof data.image == "string" ? data.image : data.image[0];
    isEditMode
      ? editCabin(
          { cabin: { ...data, image }, editId },
          {
            onSettled: () => close?.(),
          },
        )
      : createCabin(
          { ...data, image },
          {
            onSettled: () => close?.(),
          },
        );

    if (close) close();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={close ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          {...register("name", { required: "This field is required" })}
          type="text"
          id="name"
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should at least be 1" },
          })}
          type="number"
          id="maxCapacity"
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          {...register("regularPrice", {
            required: "This field is required",
          })}
          type="number"
          id="regularPrice"
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value < Number(getValues().regularPrice) ||
              "Disound should be less that regular price",
          })}
          type="number"
          id="discount"
          defaultValue={0}
        />
      </FormRow>

      <FormRow label="Description for website">
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditMode ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => close?.()}>
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing}>
          {" "}
          {isEditMode ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
