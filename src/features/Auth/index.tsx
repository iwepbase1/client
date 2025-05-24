import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  Typography,
  Stack,
  Card as MuiCard,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik } from "formik";
import * as yup from "yup";
import useAsyncRequest from "../../core/networking/useAsyncRequest";
import { userLogin, userRegister } from "../../store/Auth/services";
import Loader from "../../core/components/Loader";
import TextInput from "../../core/components/TextInput";
import { FontWeight, TextFieldType } from "../../core/types";
import TextInputDropDown from "../../core/components/TextDropDown";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { ONBOARDING } from "../../router/config";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

// Yup schema
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  fullName: yup.string(),
  dob: yup.date().nullable(),
  city: yup.string(),
  country: yup.string(),
  phone: yup.string(),
  role: yup.string(),
});

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newUser, setNewUser] = React.useState(false);
  const { execute, loading } = useAsyncRequest(userLogin);
  const { execute : registration, loading : registrationLoading } = useAsyncRequest(userRegister);

  const initialValues = {
    email: "",
    fullName: "",
    dob: "",
    city: "",
    country: "",
    phone: "",
    role: "",
  };

  const handleResponse = (response: any) => {
    if (response.status === 200) {
      const { data } = response;
      if (data?.isNewUser) {
        setNewUser(true);
      }else{
        dispatch(signIn(data));
        navigate(ONBOARDING);
      }
    } else {
      console.error("Login failed:", response.data);
    }
  };

  const handleResponseRegistration = (response: any) => {
    const { status, data } = response;
    if (status === 200) {
      dispatch(signIn(data));
      navigate(ONBOARDING);
    } else {
      console.error("Registration failed:", response.data);
  }
}

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form Data:", newUser, values);
    if (newUser) {
     registration(values, handleResponseRegistration);
    }else {
    const payload = { email: values.email };
    execute(payload, handleResponse);
    }
  };

  return (
    <Box>
      <CssBaseline enableColorScheme />
      <Loader open={loading || registrationLoading} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            variant="h1"
            sx={{ width: "100%", fontSize: 18, fontWeight: FontWeight.BOLD }}
          >
            IWEP
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
              >
                <FormControl>
                  <TextInput
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    textFieldHeigt={10}
                    type={TextFieldType.TEXT}
                    disabled={newUser}
                    label="Email"
                  />
                </FormControl>

                {newUser && (
                  <>
                    <FormControl>
                      <TextInput
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(touched.fullName && errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                        textFieldHeigt={10}
                        type={TextFieldType.TEXT}
                        label="Full Name"
                      />
                    </FormControl>
                    <FormControl>
                      <TextInput
                        label="Date of Birth"
                        name="dob"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(touched.dob && errors.dob)}
                        helperText={touched.dob && errors.dob}
                        textFieldHeigt={10}
                        type={TextFieldType.DATE}
                      />
                    </FormControl>
                    <FormControl>
                      <TextInputDropDown
                        select
                        name="role"
                        label="I am a"
                        value={values.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(touched.role && errors.role)}
                        helperText={touched.role && errors.role}
                        textFieldHeigt={10}
                        type={TextFieldType.TEXT}
                      >
                        {[
                          "Student",
                          "Home Maker",
                          "Business Woman",
                          "Employed",
                          "Other",
                        ].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextInputDropDown>
                    </FormControl>

                    <FormControl>
                      <TextInput
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(touched.city && errors.city)}
                        helperText={touched.city && errors.city}
                        textFieldHeigt={10}
                        type={TextFieldType.TEXT}
                        label="City"
                      />
                    </FormControl>
                    <FormControl>
                      <TextInput
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(touched.country && errors.country)}
                        helperText={touched.country && errors.country}
                        textFieldHeigt={5}
                        type={TextFieldType.TEXT}
                        label="Country"
                      />
                    </FormControl>
                    <FormControl>
                      <TextInput
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                        textFieldHeigt={10}
                        type={TextFieldType.TEXT}
                        label="Phone"
                      />
                    </FormControl>
                  </>
                )}

                <Button sx={{mt : 5}} type="submit" fullWidth variant="contained">
                  Continue
                </Button>
              </Box>
            )}
          </Formik>
        </Card>
      </SignUpContainer>
    </Box>
  );
};

export default Auth;
