import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectFieldHealthCheckRating, HealthCheckRatingOption, DiagnosisSelection } from "./FormFieldEntry";
import { HealthCheckRating, NewHealthCheckEntry } from "../types";
import { useStateValue } from "../state";

/*
 * use type NewEntry, is Entry omitting id,
 * because it's irrelevant for new entry object.
 */

interface Props {
  onSubmit: (values: NewHealthCheckEntry) => void;
  onCancel: () => void;
  show: boolean;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" }
];

export const AddPatientEntryForm = ({ onSubmit, onCancel, show } : Props ) => {
  const [{ diagnoses }, ] = useStateValue();
  
  if (!show) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <SelectFieldHealthCheckRating
              label="Health Rating"
              name="healthCheckRating"
              options={healthCheckRatingOptions}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
             />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientEntryForm;
