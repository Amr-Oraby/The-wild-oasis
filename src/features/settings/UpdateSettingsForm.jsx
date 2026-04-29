import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSettings from "./useUpdateSettings";
import { useEffect } from "react";
function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const { update, isUpdating } = useUpdateSettings();
  const { register, reset } = useForm({
    defaultValues: settings,
  });

  useEffect(() => {
    if (settings) reset(settings);
  }, [settings, reset]);

  function handleBlur(e, field) {
    const value = e.target.value;
    if (!value) return;
    update({ [field]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          {...register("minBookingLength")}
          disabled={isUpdating}
          onBlur={(e) => handleBlur(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          {...register("maxBookingLength")}
          disabled={isUpdating}
          onBlur={(e) => handleBlur(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          {...register("maxGuestsPerBooking")}
          disabled={isUpdating}
          onBlur={(e) => handleBlur(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          {...register("breakfastPrice")}
          disabled={isUpdating}
          onBlur={(e) => handleBlur(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
