import React, {useState} from 'react';
import {Avatar, Box, Button, CircularProgress, Container, Grid, TextField, Typography} from "@mui/material";
import {RegisterMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {register} from "@/features/users/usersThunks";
import {useRouter} from "next/router";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from "next/link";
import {selectRegisterError, selectRegisterLoading} from "@/features/users/usersSlice";

const Register = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const error = useAppSelector(selectRegisterError);
    const registrating = useAppSelector(selectRegisterLoading);
    const [state, setState] = useState<RegisterMutation>({
        email: "",
        firstName: "",
        lastName: "",
        country: "",
        phoneNumber: "",
        password: ""
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState((prevState => ({...prevState, [name]: value})));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await dispatch(register(state)).unwrap();
            await router.push('/');
        } catch (e) {
            throw new Error();
        }
    }

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
      <Container component="main" maxWidth="xs">
          <Box
            style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
          >
              <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                  <LockOutlinedIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                  Sign up
              </Typography>
              <Box component="form" noValidate sx={{mt: 3}} onSubmit={submitFormHandler}>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                          <TextField
                            name="email"
                            label="E-mail"
                            fullWidth
                            value={state.email}
                            onChange={inputChangeHandler}
                            error={Boolean(getFieldError('email'))}
                            helperText={getFieldError('email')}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                            name="firstName"
                            label="First Name"
                            fullWidth
                            value={state.firstName}
                            onChange={inputChangeHandler}
                            error={Boolean(getFieldError('firstName'))}
                            helperText={getFieldError('firstName')}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                            name="lastName"
                            label="Last name"
                            fullWidth
                            value={state.lastName}
                            onChange={inputChangeHandler}
                            error={Boolean(getFieldError('lastName'))}
                            helperText={getFieldError('lastName')}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                            name="country"
                            label="Country"
                            fullWidth
                            value={state.country}
                            onChange={inputChangeHandler}
                            error={Boolean(getFieldError('country'))}
                            helperText={getFieldError('country')}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                            name="password"
                            label="Password"
                            fullWidth
                            value={state.password}
                            onChange={inputChangeHandler}
                            error={Boolean(getFieldError('password'))}
                            helperText={getFieldError('password')}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                            name="phoneNumber"
                            label="Phone number"
                            fullWidth
                            value={state.phoneNumber}
                            onChange={inputChangeHandler}
                            error={Boolean(getFieldError('phoneNumber'))}
                            helperText={getFieldError('phoneNumber')}
                          />
                      </Grid>
                      <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                      >
                          {registrating ?
                            (<Box sx={{display: 'flex'}}>
                                <CircularProgress/>
                            </Box>) :
                            "Sign Up" }
                      </Button>
                      </Grid>
                      <Grid container justifyContent="flex-end">
                          <Grid item>
                              <Link href="/login">
                                  Already have an account? Sign in
                              </Link>
                          </Grid>
                      </Grid>
                  </Grid>
              </Box>
          </Box>
      </Container>
    );
};

export default Register;