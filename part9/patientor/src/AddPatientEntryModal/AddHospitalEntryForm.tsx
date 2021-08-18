import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "./FormFieldEntry";
import { NewHospitalEntry } from "../types";
import { useStateValue } from "../state";

/*
 * use type NewEntry, is Entry omitting id,
 * because it's irrelevant for new entry object.
 */

interface Props {
  onSubmit: (values: NewHospitalEntry) => void;
  onCancel: () => void;
  show: boolean;
}

export const AddHospitalEntryForm = ({ onSubmit, onCancel, show } : Props ) => {
  const [{ diagnoses }, ] = useStateValue();
  
  if (!show) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: ""
        }
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
        if (!values.discharge.date) {
          errors.discharge = requiredError;
        }
        if (!values.discharge.criteria) {
          errors.discharge = requiredError;
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
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Discharge Date"
              placeholder="Date of discharge"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Criteria of discharge"
              name="discharge.criteria"
              component={TextField}
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

export default AddHospitalEntryForm;
