import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import useAsyncRequest from '../../core/networking/useAsyncRequest';
import { userLogin } from '../../store/Auth/services';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Loader from '../../core/components/Loader';


// Styled components
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

// Yup schema
const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  fullName: yup.string(),
  dob: yup.date().nullable(),
  city: yup.string(),
  country: yup.string(),
  phone: yup.string(),
}).required();

const Auth = () => {

  const [newUser, setNewUser] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

   const { execute, loading } = useAsyncRequest(userLogin);

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    const payload = {
      email: data.email,
    }
    execute(payload, handleResponse);
  };

  const handleResponse = (response: any) => {
    if (response.status === 200) {
      const { data } = response;
      // Save token and user data to local storage or context
      if(data?.isNewUser) {
        setNewUser(true);
        // Handle new user flow
      }

      console.log('Login successful:', response.data);
      // Handle successful login
    } else {
      console.error('Login failed:', response.data);
      // Handle login failure
    }
  }

  return (
    <Box>
      <CssBaseline enableColorScheme />
      <Loader open={loading} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            IWEP
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                disabled={newUser}
                placeholder="your@email.com"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </FormControl>
            {newUser && (
              <>
              <FormControl>
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="name"
                  placeholder="Full Name"
                  {...register('fullName')}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="dob">DOB</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="dob"
                  placeholder="Date of Birth"
                  type='date'
                  {...register('dob')}
                  error={!!errors.dob}
                  helperText={errors.dob?.message}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="city">City</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="city"
                  placeholder="City"
                  {...register('city')}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="country">Country</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="country"
                  placeholder="Country"
                  {...register('country')}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="country">Phone</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  placeholder="Phone"
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </FormControl>
              </>
            )}
            <Button type="submit" fullWidth variant="contained">
              Continue
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </Box>
  );
};

export default Auth;
