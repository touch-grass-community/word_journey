import { useState } from "react";

import {
  Container,
  Box,
  Button,
  CssBaseline,
  FormLabel,
  FormControl,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import MuiCard from "@mui/material/Card";

import { styled } from "@mui/material/styles";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
  height: "calc(100vh - var(--navbar-height))",
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

export default function RegisterPage() {
  const serverUrl = import.meta.env.VITE_SERVER_FULL_URL;

  const initialValuesNewUserForm = {
    username: "",
    email: "",
    password: "",
  };

  const [newUserForm, setNewUserForm] = useState(initialValuesNewUserForm);

  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewUserForm({
      ...newUserForm,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (usernameError || emailError || passwordError) {
      return;
    }

    console.log("Submit", newUserForm);

    fetch(`${serverUrl}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserForm),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const validateInputs = () => {
    const username = newUserForm.username;
    const email = newUserForm.email;
    const password = newUserForm.password;

    let isValid = true;

    if (!username || username.length < 4) {
      setUsernameError(true);
      setUsernameErrorMessage("Username must be at least 4 characters long.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    /*  
      test@example.com	✅	Correct format
      user.name@domain.co.uk	✅	Multiple dots allowed in domain
      test@domain	❌	No TLD (.com, .net, etc.)
      @domain.com	❌	No username before @
      test@.com	❌	No domain name before the dot
      test@domain..com	❌	Double dot not allowed
      test@domain.c	❌	TLD must be at least 2 characters
    */
    if (
      !email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    /* 
      password123	❌	No uppercase, no special char
      Password123	❌	No special character
      Password!	❌	No number
      P@ssword123	✅	Strong password
      Short1!	❌	Less than 8 characters
      SuperStrongPass!123	✅	Valid password
    */
    if (
      !password ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character (@$!%*?&)."
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    console.log("isValid", isValid);
    return isValid;
  };

  return (
    <main>
      <Container maxWidth="xl">
        <CssBaseline enableColorScheme />
        <RegisterContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Registra un nuovo account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              {/* Username Field */}
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <TextField
                  error={usernameError}
                  helperText={usernameErrorMessage}
                  id="username"
                  type="text"
                  name="username"
                  value={newUserForm.username}
                  onChange={handleChange}
                  placeholder="Pippo Baudo"
                  autoComplete="username"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? "error" : "primary"}
                />
              </FormControl>

              {/* Email Field */}
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  value={newUserForm.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? "error" : "primary"}
                />
              </FormControl>

              {/* Password Field */}
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  id="password"
                  type="password"
                  value={newUserForm.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Registrati
              </Button>
            </Box>
          </Card>
        </RegisterContainer>
      </Container>
    </main>
  );
}
